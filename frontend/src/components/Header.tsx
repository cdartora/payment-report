import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/utils';
import Logo from '../images/logo.png';
import { SignOut } from 'phosphor-react';

export default function Header() {
  const user = getUser();
  const navigate = useNavigate();

  function logout() {
    localStorage.setItem('user', JSON.stringify({}));
    navigate('/login')
  }

  return (
    <header className='border px-6 bg-white py-3 flex justify-between items-center shadow-md fixed top-0 w-full z-10'>
      <div className='flex items-center'>
        <div>
          <img
            className='w-10'
            src={Logo}
            alt="Logomarca de um dente emvolto por um círculo"
          />
        </div>
        <div className='ml-5 font-bold text-zinc-700'>
          Olá, {user.name}
        </div>
      </div>
      <button type='button' onClick={logout} className='text-text'>
        <SignOut weight='bold' width={28} height={28} />
      </button>
    </header>
  )
}
