"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'
import './login.scss';

const Login = ({ loginType }: { loginType: string | null }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length !== 4) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const validatePassword = (password: string) => {
    if (/^\d{0,4}$/.test(password)) {
      setPassword(password);
    }
    setError('');
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length !== 4) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-form">
      {loginType === 'login' ? (
        <form onSubmit={handleLogin}>
          <input
            type="username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)}
            placeholder="PIN"
            maxLength="4"
            required
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)}
            placeholder="PIN"
            maxLength="4"
            required
          />
          <button type="submit">Register</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
