export type PostFrontmatter = {
  title: string;
  date: string;
  desc?: string;
  image?: string;
};

export type CoverImage = {
  width: number;
  height: number;
  base64: string;
  src: string;
};

export type PostItem = {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime?: string;
  content?: string;
  coverImage?: CoverImage;
};

export type Posts = PostItem[];

export type MatterItem = keyof Omit<PostItem, 'content'>;

export type Matters = MatterItem[];
