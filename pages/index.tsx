import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../components/Layout';
import { PersonProfile } from '../components/PersonProfile';
import { getAllPosts } from '../lib/api';
import { Posts } from '../types/post';

type IndexProps = {
  posts: Posts;
};

export const Index = ({ posts }: IndexProps) => {
  return (
    <Layout>
      <PersonProfile />
      {posts.map(post => {
        const { frontmatter, slug, coverImage } = post;
        return (
          <article key={slug} className="mt-12">
            {coverImage?.src && (
              <div className="mb-1">
                <Image
                  width={coverImage.width}
                  height={coverImage.height}
                  src={coverImage.src}
                  blurDataURL={coverImage.base64}
                  placeholder="blur"
                />
              </div>
            )}
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {format(parseISO(frontmatter.date), 'MMMM dd, yyyy')}
            </p>
            <h1 className="mb-2 text-xl">
              <Link as={`/posts/${slug}`} href={`/posts/[slug]`}>
                <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">{frontmatter.title}</a>
              </Link>
            </h1>
            <p>{frontmatter.desc}</p>
            {/* <p className="mt-3">
              <Link as={`/posts/${slug}`} href={`/posts/[slug]`}>
                <a>继续阅读</a>
              </Link>
            </p> */}
          </article>
        );
      })}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
};

export default Index;
