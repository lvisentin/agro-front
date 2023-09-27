'use client';

import { PageRoutes } from '@/shared/enums/PageRoutes';
import {
  faArrowRightFromBracket,
  faBoxesStacked,
  faChartSimple,
  faFolder,
  faReceipt,
  faTractor,
  faWheatAwn,
  IconLookup
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import styles from './Sidebar.module.scss';
export interface MenuItem {
  icon: IconLookup;
  text: string;
  route: string;
}

const menuItems: MenuItem[] = [
  {
    icon: faChartSimple,
    text: 'Dashboard',
    route: '/internal/dashboard',
  },
  {
    icon: faTractor,
    text: 'Propriedades',
    route: '/internal/properties',
  },
  {
    icon: faWheatAwn,
    text: 'Talhões',
    route: '/internal/plots',
  },
  {
    icon: faBoxesStacked,
    text: 'Estoque',
    route: '/internal/supply',
  },
  // {
  //   icon: faShoppingCart,
  //   text: 'Compras',
  //   route: '/internal/purchases',
  // },
  // {
  //   icon: faDollarSign,
  //   text: 'Vendas',
  //   route: '/internal/sales',
  // },
  {
    icon: faReceipt,
    text: 'Operações',
    route: '/internal/operations',
  },
  {
    icon: faFolder,
    text: 'Documentos',
    route: '/internal/documents',
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  function logout() {
    localStorage.removeItem('authorization');
    router.push(PageRoutes.Login);
  }

  return (
    <nav
      className={
        'bg-base-100 min-w-sidebar w-sidebar flex flex-col h-screen justify-between shadow-sm'
      }
    >
      <Link href="/internal/dashboard">
        <Image
          src="/GesruralLogo.svg"
          alt="GesRural Logo"
          width={100}
          height={100}
          className={'w-full pt-4 px-8'}
        />
      </Link>

      <ul className="menu menu-sm lg:menu-md px-4 py-4 mb-auto">
        {menuItems.map((menuItem, key) => (
          <li key={key}>
            <Link
              href={menuItem.route}
              data-sveltekit-preload-data="hover"
              className={
                pathname.includes(menuItem.route)
                  ? `${styles.activeItem} active h-full text-white p-4`
                  : `h-full p-4`
              }
            >
              <FontAwesomeIcon icon={menuItem.icon} className={`h-5 w-5`} />
              <span className="hidden md:block undefined">{menuItem.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="footer w-full">
        <ul className="menu menu-sm lg:menu-md px-4 py-4 w-full">
          <div className={'flex align-items-center px-4'}>
            <div className={'hidden md:block'}>
              <p className={'truncate font-mono'}>Lucas</p>
              <p className={'truncate font-mono'}>Lucas@lucas.com</p>
            </div>
          </div>
          <li className="w-full">
            <button
              onClick={logout}
              data-sveltekit-preload-data="hover"
              className={'h-full p-4'}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={'h-5 w-5'}
              />
              <span className="hidden md:block undefined">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
