import { site } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/* AI·검색엔진이 "이 사람이 어디의 무슨 강사인지" 확정하게 해주는 정보.
   구글 비즈니스 프로필과 대조되는 근거가 됩니다. */
function LocalBusinessSchema() {
  const b = site.business;
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    name: site.name,
    alternateName: site.nameEn,
    description: site.description,
    url: site.url,
    telephone: b.telephone || undefined,
    priceRange: b.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress || undefined,
      addressLocality: b.city,
      addressRegion: b.region,
      postalCode: b.postalCode || undefined,
      addressCountry: b.country,
    },
    areaServed: b.areaServed.map((n) => ({ "@type": "Place", name: n })),
    sameAs: b.sameAs.filter(Boolean),
    founder: { "@type": "Person", name: site.author.name, jobTitle: site.author.jobTitle },
    knowsAbout: ["블로그 마케팅", "SNS 마케팅", "네이버 플레이스", "소상공인 마케팅 교육"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <LocalBusinessSchema />
        <header className="site-header">
          <a href="/" className="logo">{site.name}</a>
          <nav>
            <a href="/">홈</a>
            <a href="/blog">블로그</a>
            <a href={site.cta.href} target="_blank" rel="noopener" className="cta-sm">
              {site.cta.label}
            </a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>{site.name} · {site.business.region} {site.business.city}</p>
          <p className="dim">{site.description}</p>
        </footer>
      </body>
    </html>
  );
}
