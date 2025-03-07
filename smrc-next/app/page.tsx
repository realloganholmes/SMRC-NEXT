"use client";
import { useEffect, useState } from 'react';
import Login from './login';
import './page.scss';

const Home = () => {
  const [loginType, setLoginType] = useState<'login' | 'register' | null>(null);

  /*useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/home');
    }
  }, [router]);*/

  useEffect(() => {
    const handleResize = () => {
      const rotationDiv = document.getElementById('rotationDiv') as HTMLElement;
      const newRotationSize = (Math.min(window.innerWidth, window.innerHeight) * 0.75) + 'px';
      rotationDiv.style.width = newRotationSize;
      rotationDiv.style.height = newRotationSize;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showLoginDiv = (newLoginType: 'login' | 'register') => {
    const loginDiv = document.getElementById('loginDiv') as HTMLElement;
    loginDiv.style.opacity = '1';
    loginDiv.style.visibility = 'visible';
    loginDiv.style.width = 'fit-content';
    loginDiv.style.height = 'fit-content';
    setLoginType(newLoginType);
  };

  return (
    <div className="home-container">
      <div className="full-login-wrapper">
        <div id="loginDiv">
          <Login loginType={loginType}/>
        </div>
        <div className="login-buttons">
          <div className={loginType === "login" ? 'button-selected' : ''} onClick={() => showLoginDiv("login")}>Login</div>
          <div className={loginType === "register" ? 'button-selected' : ''} onClick={() => showLoginDiv("register")}>Register</div>
        </div>
      </div>
      <img id="rotationDiv" src="./Assets/smrc-ring.png" alt="SMRC spinning logo"/>
    </div>
  );
};

export default Home;
