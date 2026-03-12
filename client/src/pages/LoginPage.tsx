import type { FC } from 'react';
import AuthForm from '../components/AuthForm';

const LoginPage: FC = () => {
  return <AuthForm mode="login" />;
};

export default LoginPage;
