import Router from 'next/router'

export async function authenticate(path) {
    const pageType = path.split('/')[1];
    let token = localStorage.getItem('token');
    const userType = JSON.parse(localStorage.getItem('userType'));
    const username = localStorage.getItem('username');

    if (!token || !userType || !username || userType.length === 0) {
        clearLocalStorage()
        Router.push('/login');
        return;
    }

    if (!userType.includes(pageType)) {
        Router.push(`/${userType[0]}/home`);
        return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/authenticate/${token}`)
    .then(res => res.ok || (clearLocalStorage() || Router.push('/login')));
}

export function clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
}
