import { format, parseISO } from 'date-fns';

import { getAllPosts } from '../lib/api';
import { PostItem } from '../types/post';

const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/posts`;

function generateSiteMap(posts: PostItem[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${process.env.NEXT_PUBLIC_WEBSITE_URL}</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     ${posts
       .map(({ slug, mtime }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
           <lastmod>${format(parseISO(mtime.toISOString()), 'yyyy-MM-dd HH:MM')}</lastmod>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPosts();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
