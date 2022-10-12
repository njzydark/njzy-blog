import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { makeCamelCase } from '../utils';

type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  strict?: boolean;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  inputPosition: string;
  theme: string;
  lang: string;
  loading?: string;
};

type Props = {
  id: string;
  config?: GiscusConfig;
};

const defaultConfig: GiscusConfig = {
  repo: 'njzydark/njzy-blog',
  repoId: 'R_kgDOHdUsdg',
  category: 'Announcements',
  categoryId: 'DIC_kwDOHdUsds4CR8CY',
  mapping: 'title',
  strict: false,
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'top',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy',
};

export const Guscus = ({ id, config }: Props) => {
  const { theme, resolvedTheme } = useTheme();

  const guscusClientId = `guscs-${id}`;

  useEffect(() => {
    const scriptEl = document.createElement('script');

    scriptEl.id = guscusClientId;
    scriptEl.src = 'https://giscus.app/client.js';
    scriptEl.crossOrigin = 'anonymous';
    scriptEl.async = true;

    const finalTheme = theme === 'system' ? 'preferred_color_scheme' : resolvedTheme;
    const finalConfig: GiscusConfig = { ...defaultConfig, theme: finalTheme, ...config };
    Object.keys(finalConfig).forEach(key => {
      const value = finalConfig[key];
      const name = `data-${makeCamelCase(key)}`;
      scriptEl.setAttribute(name, typeof value === 'boolean' ? String(Number(value)) : value);
    });

    document.body.appendChild(scriptEl);

    return () => {
      const giscusClient = document.getElementById(guscusClientId) as HTMLScriptElement;
      if (giscusClient) {
        giscusClient.remove();
      }
      const giscusEl = document.getElementsByClassName('giscus')?.[0] as HTMLDivElement;
      if (giscusEl) {
        giscusEl.remove();
      }
    };
  }, [guscusClientId]);

  return null;
};
