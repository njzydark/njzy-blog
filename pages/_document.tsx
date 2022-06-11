import { Head, Html, Main, NextScript } from 'next/document';

export const MyDocument = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
