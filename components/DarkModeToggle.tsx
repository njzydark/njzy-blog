import cs from 'classnames';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Moon, Sun } from 'react-feather';

export const DarkModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      setTheme('system');
    });
  }, [setTheme]);

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={cs('px-2 hover:cursor-pointer hover:dark:text-white')} onClick={handleToggle}>
      {resolvedTheme === 'dark' ? <Moon /> : <Sun />}
    </div>
  );
};
