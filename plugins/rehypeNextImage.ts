import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import sharp from 'sharp';
import { visit } from 'unist-util-visit';

/**
 * Handles:
 * "//"
 * "http://"
 * "https://"
 * "ftp://"
 */
const absolutePathRegex = /^(?:[a-z]+:)?\/\//;

export async function processImage(src, dir) {
  try {
    if (absolutePathRegex.exec(src)) {
      return;
    }

    // Treat `/` as a relative path, according to the server
    const shouldJoin = !path.isAbsolute(src) || src.startsWith('/');

    let filePath = src;

    if (dir && shouldJoin) {
      src = path.join(dir, src);
      filePath = path.resolve(src);
    }

    const finalSrc = src.replace(/^public/, '');

    const metadata = await sharp(filePath).metadata();
    const { base64 } = await getPlaiceholder(finalSrc);

    return {
      width: metadata.width,
      height: metadata.height,
      base64,
      src: finalSrc,
    };
  } catch (err) {
    console.error(err);
  }
}

export function rehypeNextImage(options) {
  const opts = options || {};
  const dir = opts.dir;

  async function transformer(tree) {
    const matchers = [];

    visit(tree, 'element', node => {
      if (node.tagName === 'img') {
        matchers.push(node);
      }
    });

    const promises = matchers.map(async node => {
      const src = decodeURIComponent(node.properties.src);
      const res = await processImage(src, dir);
      if (res) {
        node.properties.width = res.width;
        node.properties.height = res.height;
        node.properties.blurDataURL = res.base64;
        node.properties.placeholder = res.base64 ? 'blur' : 'empty';
        node.properties.src = res.src;
      }
    });
    await Promise.all(promises);

    return tree;
  }

  return transformer;
}
