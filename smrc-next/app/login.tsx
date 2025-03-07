"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import './login.scss';

const Login = ({ loginType }: { loginType: string | null}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length !== 4) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    try {
      const response = await axios.post(
        'https://smrc-be-fec2hkfsghffe6e6.eastus2-01.azurewebsites.net/api/auth/login',
        { username, password }
      );
      localStorage.setItem('token', response.data.token);
      //router.push('/home');
    } catch (err: any) {
      setError(err.response.data.message);
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
      await axios.post(
        'https://smrc-be-fec2hkfsghffe6e6.eastus2-01.azurewebsites.net/api/auth/register',
        { username, password }
      );
      //router.push('/');
    } catch (err: any) {
      setError(err.response.data.message);
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
