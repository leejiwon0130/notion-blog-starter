import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, getPosts } from "@/lib/notion";
import { site } from "@/lib/site";

export const revalidate = 3600;

/* 빌드 시점에 글 주소를 미리 만들어 둡니다 → 봇이 완성된 HTML을 받습니다 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

/* 글마다 제목·설명·대표이미지를 <head>에 자동 삽입 */
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "글을 찾을 수 없습니다" };
  const img = post.cover || site.ogImage;
  return {
    title: post.title,
    description: post.description || site.description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description || site.description,
      url: `${site.url}/blog/${post.slug}`,
      images: [img],
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", images: [img] },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: post.cover || undefined,
    author: { "@type": "Person", name: site.author.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <header className="post-head">
        {post.category && <span className="tag">{post.category}</span>}
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        {post.description && <p className="lead">{post.description}</p>}
      </header>

      {post.cover && (
        /* 노션 "업로드" 이미지는 주소가 만료되므로 external URL만 들어옵니다 */
        <img className="post-cover" src={post.cover} alt="" loading="lazy" />
      )}

      <div className="post-body">
        <Markdown remarkPlugins={[remarkGfm]}>{post.markdown}</Markdown>
      </div>

      <footer className="post-foot">
        <a className="cta" href={site.cta.href} target="_blank" rel="noopener">
          {site.cta.label} →
        </a>
        <a href="/blog" className="back">← 목록으로</a>
      </footer>
    </article>
  );
}
