/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

import { MetaProps } from '../types/layout';
import { DarkModeToggle } from './DarkModeToggle';
import Head from './Head';

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

const Layout = ({ children, customMeta }: LayoutProps) => {
  return (
    <>
      <Head customMeta={customMeta} />
      <div className="max-w-3xl px-8 mx-auto bg-white dark:bg-black">
        <header className="sticky top-0 bg-white dark:bg-black z-10">
          <div className="relative flex items-center justify-between py-5">
            <h1 className="m-0 mr-auto font-bold text-2xl">
              <Link href="/">
                <span className="text-black cursor-pointer dark:text-white">
                  {process.env.NEXT_PUBLIC_AUTHOR}'S BlOG
                </span>
              </Link>
            </h1>
            <DarkModeToggle />
          </div>
        </header>
        <main>{children}</main>
        <footer className="py-8">
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank" rel="noreferrer">
            CC BY-NC-SA 4.0
          </a>{' '}
          <span>Author </span>
          <a href={process.env.NEXT_PUBLIC_GITHUB} target="_blank" rel="noreferrer">
            {process.env.NEXT_PUBLIC_AUTHOR}
          </a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
