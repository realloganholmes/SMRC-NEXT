"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Switch } from '@mui/material';
import { IoMdHome } from 'react-icons/io';
import { FaNewspaper, FaPersonRunning, FaMedal } from "react-icons/fa6";
import { PiTreasureChestFill } from 'react-icons/pi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useUser } from './userContext';
import './nav-layout.scss';

export default function NavLayout({ children, elName }: { children: React.ReactNode, elName: string }) {
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div className="private-route-container">
      <div className="navbar">
        <div className={elName === 'dashboard' ? 'selected' : ''} onMouseDown={() => handleNav('/home')}><IoMdHome /></div>
        <div className={elName === 'recaps' ? 'selected' : ''} onMouseDown={() => handleNav('/recaps')}><FaNewspaper /></div>
        <div className={elName === 'rfg' ? 'selected' : ''} onMouseDown={() => handleNav('/rfg')}><FaMedal /></div>
        <div className={elName === 'races' ? 'selected' : ''} onMouseDown={() => handleNav('/races')}><FaPersonRunning /></div>
        <div className={elName === 'coolers' ? 'selected' : ''} onMouseDown={() => handleNav('/coolers')}><PiTreasureChestFill /></div>
        {user && user.admin && (
          <div className={elName === 'admin' ? 'selected' : ''} onMouseDown={() => handleNav('/admin')}>
            <MdAdminPanelSettings />
          </div>
        )}
        {user && (user.admin || user.coolerAdmin || user.raceAdmin || user.RFGAdmin || user.recapAdmin || user.dashboardAdmin) && (
          <Switch checked={isToggled} onChange={() => setIsToggled(!isToggled)} />
        )}
      </div>

      <div className="background">
        <div>{children}</div>
      </div>
    </div>
  );
}
