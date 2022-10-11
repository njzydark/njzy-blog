import { writeFileSync } from 'fs-extra';
import glob from 'glob';
import path from 'path';

const NEXT_PUBLIC_WEBSITE_URL = 'https://blog.njzydark.com';

const EXTERNAL_DATA_URL = `${NEXT_PUBLIC_WEBSITE_URL}/posts`;

function generateSiteMap(slugs: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${NEXT_PUBLIC_WEBSITE_URL}</loc>
     </url>
     ${slugs
       .map(slug => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function generate() {
  const filePaths = glob.sync('**/*.{md,mdx}', { cwd: path.resolve(__dirname, '../posts') });
  const slugs = filePaths.map(filePath => {
    return filePath.replace(/(\/index)?\.mdx?$/, '').replace(/\//g, '__');
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(slugs);
  writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemap);
}

generate();
