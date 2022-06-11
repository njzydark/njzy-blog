import { format, parseISO } from 'date-fns';
import mdxPrism from 'mdx-prism';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useMemo } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';

import Layout from '../../components/Layout';
import { getAllPosts, getPostBySlug, slugToFilePath } from '../../lib/api';
import { rehypeNextImage } from '../../plugins/rehypeNextImage';
import { MetaProps } from '../../types/layout';
import { CoverImage, PostFrontmatter } from '../../types/post';
import { getSlugByHref } from '../../utils';

const components = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontmatter: PostFrontmatter;
  coverImage: CoverImage;
  baseDir: string;
};

const PostPage = ({ source, frontmatter, coverImage, baseDir }: PostPageProps) => {
  const customMeta: MetaProps = {
    title: frontmatter.title,
    desc: frontmatter.desc || '',
    image: coverImage?.src,
    date: frontmatter.date,
    type: 'article',
  };

  const wrappedComponents = useMemo(() => {
    return {
      ...components,
      img: props => {
        if (props.width && props.height) {
          return <Image {...props} />;
        } else {
          return <img {...props} />;
        }
      },
      a: props => {
        const slugPath = getSlugByHref(props.href);
        return slugPath ? (
          <Link {...props} href={`/posts/${slugPath}`} />
        ) : (
          <a {...props} target="_blank" style={{ wordBreak: 'break-word' }} />
        );
      },
    };
  }, []);

  return (
    <Layout customMeta={customMeta}>
      <article className="prose max-w-none dark:prose-dark">
        <h1 className="mb-3 text-gray-900 dark:text-white">{frontmatter.title}</h1>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
          {format(parseISO(frontmatter.date), 'MMMM dd, yyyy')}
        </p>
        <MDXRemote {...source} components={wrappedComponents} />
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, frontmatter, coverImage } = await getPostBySlug(params.slug as string);
  const { baseDir } = slugToFilePath(params.slug as string);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      // remarkPlugins: [require('remark-code-titles')],
      rehypePlugins: [
        rehypeCodeTitles,
        mdxPrism,
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypeNextImage, { dir: `public/${process.env.NEXT_PUBLIC_POST_IMAGES_PATH}/${baseDir}` }],
      ],
    },
  });

  return {
    props: {
      source: mdxSource,
      frontmatter: JSON.parse(JSON.stringify(frontmatter)),
      coverImage: JSON.parse(JSON.stringify(coverImage || {})),
      baseDir,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default PostPage;
