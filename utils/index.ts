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

export const changeGiscusTheme = (theme: string) => {
  const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme,
        },
      },
    },
    'https://giscus.app'
  );
};

export const makeCamelCase = (str: string) =>
  str
    .split(' ')
    .map((e, i) => (i ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : e.toLowerCase()))
    .join('');
