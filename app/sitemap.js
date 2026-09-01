import { getPosts } from "@/lib/notion";
import { site } from "@/lib/site";

/* 노션에 글이 추가되면 sitemap.xml 이 자동으로 갱신됩니다 */
export default async function sitemap() {
  const posts = await getPosts();
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/blog`, lastModified: now, priority: 0.8 },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      priority: 0.7,
    })),
  ];
}
