export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  created_at: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
