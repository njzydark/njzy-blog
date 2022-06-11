import { PostFrontmatter } from './post';

export interface MetaProps extends Partial<PostFrontmatter> {
  /**
   * For the meta tag `og:type`
   */
  type?: string;
  image?: string;
}
