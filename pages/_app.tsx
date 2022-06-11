import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
