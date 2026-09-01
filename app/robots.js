import { site } from "@/lib/site";

/* 모든 검색엔진 + AI 크롤러 허용 */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
