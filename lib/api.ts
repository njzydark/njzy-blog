import fs from 'fs-extra';
import glob from 'glob';
import matter from 'gray-matter';
import path from 'path';
import { join } from 'path';
import readingTime from 'reading-time';

import { processImage } from '../plugins/rehypeNextImage';
import { PostFrontmatter, PostItem } from '../types/post';

export const POSTS_PATH = path.join(process.cwd(), process.env.NEXT_PUBLIC_POSTS_PATH);

export async function getAllPosts() {
  copyImages();
  const filePaths = glob.sync('**/*.{md,mdx}', { cwd: POSTS_PATH });
  const promises = filePaths.map(async filePath => {
    const post = await getPostByFilePath(filePath);
    post.content = undefined;
    return post;
  });
  const posts = await Promise.all(promises);
  return posts.sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));
}

export async function getPostBySlug(slug: string) {
  const { filePath } = slugToFilePath(slug);
  return await getPostByFilePath(filePath, slug);
}

function filePathToSlug(filePath: string) {
  return filePath.replace(/(\/index)?\.mdx?$/, '').replace(/\//g, '__');
}

export function slugToFilePath(slug: string) {
  const filePaths = glob.sync('**/*.{md,mdx}', { cwd: POSTS_PATH });
  const slugWithSlash = slug.replace(/__/g, '/');
  const filePath = filePaths.find(item => item.includes(slugWithSlash));
  return {
    filePath,
    baseDir: filePath.includes('/') ? slugWithSlash : '',
  };
}

async function getPostByFilePath(filePath: string, curSlug?: string) {
  const slug = curSlug || filePathToSlug(filePath);
  const fileRealPath = join(POSTS_PATH, filePath);
  const { mtime } = fs.statSync(fileRealPath);
  const fileContents = fs.readFileSync(fileRealPath, 'utf8');
  const { data, content } = matter(fileContents);

  const { text } = readingTime(content);

  const post: PostItem = {
    frontmatter: data as PostFrontmatter,
    slug,
    content,
    readingTime: text,
    mtime,
  };

  if (post.frontmatter.image) {
    const { baseDir } = slugToFilePath(slug);
    const coverImage = await processImage(
      post.frontmatter.image,
      `public/${process.env.NEXT_PUBLIC_POST_IMAGES_PATH}/${baseDir}`
    );
    post.coverImage = coverImage;
  }

  return post;
}

export function copyImages() {
  const images = glob.sync('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: POSTS_PATH });
  images.forEach(image => {
    const imagePath = path.join(process.cwd(), 'public', process.env.NEXT_PUBLIC_POST_IMAGES_PATH, image);
    fs.copy(join(POSTS_PATH, image), imagePath);
  });
}
