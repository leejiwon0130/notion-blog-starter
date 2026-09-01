export default function PostCard({ post }) {
  return (
    <a className="card post-card" href={`/blog/${post.slug}`}>
      {post.cover && <img src={post.cover} alt="" loading="lazy" />}
      {post.category && <span className="tag">{post.category}</span>}
      <h3>{post.title}</h3>
      {post.description && <p>{post.description}</p>}
      <time dateTime={post.date}>{post.date}</time>
    </a>
  );
}
