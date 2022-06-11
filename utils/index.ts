const absolutePathRegex = /^(?:[a-z]+:)?\/\//;

export const getSlugByHref = (href?: string) => {
  if (!href || absolutePathRegex.test(href)) {
    return;
  }
  return href
    .replace(/^(\.*\/)*/g, '')
    .replace(/(\/index)?\.mdx?$/, '')
    .replace(/\//g, '__');
};
