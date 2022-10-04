import NextHead from 'next/head';
import { useRouter } from 'next/router';

import { MetaProps } from '../types/layout';

const Head = ({ customMeta }: { customMeta?: MetaProps }) => {
  const router = useRouter();
  const meta: MetaProps = {
    title: `${process.env.NEXT_PUBLIC_AUTHOR} - Website`,
    desc: 'Sleep Deprived Father. Senior Web Developer. Lover of all things Ramen and Kpop.',
    type: 'website',
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.desc} name="description" />
      {meta.date && <meta property="article:published_time" content={meta.date} />}
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${router.asPath}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:type" content={meta.type} />
      {meta.image && <meta property="og:image" content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${meta.image}`} />}
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${router.asPath}`} />
      <meta property="og:description" content={meta.desc} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={process.env.NEXT_PUBLIC_TWITTER_HANDLE} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.desc} />
      {meta.image && <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${meta.image}`} />}
    </NextHead>
  );
};

export default Head;
