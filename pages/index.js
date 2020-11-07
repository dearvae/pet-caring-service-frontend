import { useEffect } from 'react';

import Router from 'next/router';

import { clearLocalStorage } from '../src/auth';

const reroute = () => {
  let token = localStorage.getItem('token');
  const userType = JSON.parse(localStorage.getItem('userType'));
  const username = localStorage.getItem('username');

  if (!token || !userType || !username || userType.length === 0) {
      clearLocalStorage()
      Router.push('/login');
      return;
  }

  fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/authenticate/${token}`)
  .then(res => {
    if (res.ok) {
      Router.push(`/${userType[0]}/home`);
    }
    clearLocalStorage();
    Router.push('/login');
  });
}

export default function Home() {
  useEffect(reroute, []);

  return (
    <div>
      Redirecting to main site...
    </div>
  )
}
