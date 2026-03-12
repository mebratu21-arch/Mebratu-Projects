import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/connection';
import { config } from '../config';
import { User, UserResponse, CreateUserDto, LoginUserDto } from '../models/user.model';
import { ApiError } from '../utils/ApiError';

const SALT_ROUNDS = 12;

export class AuthService {
  /**
   * Register a new user
   */
  async register(dto: CreateUserDto): Promise<{ user: UserResponse; token: string }> {
    // Check if user already exists
    const existingUser = await db('users').where({ email: dto.email }).first();
    if (existingUser) {
      throw ApiError.conflict('An account with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    // Create user
    const id = uuidv4();
    const [user] = await db('users')
      .insert({
        id,
        email: dto.email,
        password_hash: passwordHash,
      })
      .returning(['id', 'email', 'created_at']);

    // Generate JWT
    const token = this.generateToken(user.id);

    return {
      user: { id: user.id, email: user.email, created_at: user.created_at },
      token,
    };
  }

  /**
   * Login an existing user
   */
  async login(dto: LoginUserDto): Promise<{ user: UserResponse; token: string }> {
    // Find user by email
    const user = await db('users').where({ email: dto.email }).first<User>();
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password_hash);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Generate JWT
    const token = this.generateToken(user.id);

    return {
      user: { id: user.id, email: user.email, created_at: user.created_at },
      token,
    };
  }

  /**
   * Get current user profile
   */
  async getMe(userId: string): Promise<UserResponse> {
    const user = await db('users')
      .select('id', 'email', 'created_at')
      .where({ id: userId })
      .first<UserResponse>();

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user;
  }

  /**
   * Generate a JWT token for a user
   */
  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);
  }
}

export const authService = new AuthService();
