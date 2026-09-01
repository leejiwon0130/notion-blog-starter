import { site } from "@/lib/site";
import { getPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";

/* 1시간마다 노션 내용을 다시 확인합니다. (ISR)
   봇이 방문하면 이미 완성된 HTML을 받습니다. */
export const revalidate = 3600;

export default async function Home() {
  const posts = (await getPosts()).slice(0, 4);
  return (
    <>
      <section className="hero">
        <p className="eyebrow">{site.business.region} {site.business.city}</p>
        <h1>{site.tagline}</h1>
        <p className="lead">{site.description}</p>
        <a className="cta" href={site.cta.href} target="_blank" rel="noopener">
          {site.cta.label} →
        </a>
      </section>

      <section className="block">
        <h2>강의 분야</h2>
        <div className="cards">
          {site.services.map((s) => (
            <article className="card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="block-head">
          <h2>최근 글</h2>
          <a href="/blog">전체 보기 →</a>
        </div>
        {posts.length === 0 ? (
          <p className="dim">아직 발행된 글이 없습니다. 노션에서 「발행」을 체크해 보세요.</p>
        ) : (
          <div className="cards">
            {posts.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
