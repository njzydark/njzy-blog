import cs from 'classnames';
import { useTheme } from 'next-themes';
import { CSSProperties, MouseEventHandler, useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'react-feather';

const themes = ['light', 'dark', 'system'];

export const DarkModeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isSystemTheme = theme === 'system';

  const curTheme = isSystemTheme ? 'system' : resolvedTheme === 'dark' ? 'dark' : 'light';

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [dropMenuStyle, setDropMenuStyle] = useState<CSSProperties>({
    position: 'absolute',
    top: -999,
    opacity: 0,
    width: 80,
  });

  useEffect(() => {
    if (dropMenuStyle.opacity === 0) {
      return;
    }

    const handleClose = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('#darkModeToggleWrapper') === null) {
        setDropMenuStyle(pre => ({
          ...pre,
          top: -999,
          opacity: 0,
        }));
      }
    };

    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [dropMenuStyle.opacity]);

  const handleClick: MouseEventHandler<HTMLDivElement> = event => {
    const target = event.currentTarget as HTMLDivElement;
    const { bottom, right } = target.getBoundingClientRect();
    setDropMenuStyle(pre => ({
      ...pre,
      opacity: 1,
      left: right - (dropMenuStyle.width as number),
      top: bottom + 10,
    }));
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div id="darkModeToggleWrapper">
      <div
        className={cs(
          'hover:bg-gray-100 p-2 hover:dark:text-white box-border hover:dark:bg-gray-600',
          dropMenuStyle.opacity === 1 && 'bg-gray-100 dark:bg-gray-600'
        )}
        onClick={handleClick}
      >
        {isSystemTheme ? <Monitor /> : curTheme === 'dark' ? <Moon /> : <Sun />}
      </div>
      <div className="drop-shadow-lg bg-white dark:bg-gray-600 z-10 transition-opacity" style={dropMenuStyle}>
        {themes.map(theme => (
          <div
            key={theme}
            className={cs(
              'px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer',
              theme === curTheme && ' text-blue-500'
            )}
            onClick={() => {
              setTheme(theme);
              setDropMenuStyle(pre => ({
                ...pre,
                opacity: 0,
                top: -999,
              }));
            }}
          >
            {theme[0].toUpperCase() + theme.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
};
