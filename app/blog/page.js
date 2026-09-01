import { getPosts } from "@/lib/notion";
import PostCard from "@/components/PostCard";

export const revalidate = 3600;

export const metadata = {
  title: "블로그",
  description: "마케팅 노하우와 현장 기록을 정리합니다.",
};

export default async function BlogList() {
  const posts = await getPosts();
  return (
    <section className="block">
      <h1>블로그</h1>
      <p className="lead">마케팅 노하우와 현장 기록을 정리합니다.</p>
      {posts.length === 0 ? (
        <p className="dim">아직 발행된 글이 없습니다.</p>
      ) : (
        <div className="cards">
          {posts.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      )}
    </section>
  );
}
