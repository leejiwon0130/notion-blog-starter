/* ============================================================
   ⭐ 수강생이 고치는 곳은 여기 하나입니다.
   본인 정보로 바꾸면 사이트 전체 + 검색/AI 노출 정보가 같이 바뀝니다.
   ⚠️ 구글 비즈니스 프로필에 등록한 것과 "글자 하나까지 똑같이" 적으세요.
      AI는 프로필과 사이트를 대조해서 업체를 확정합니다.
   ============================================================ */
export const site = {
  name: "엘제이뷰",
  nameEn: "LJ VIEW",
  // 한 줄 소개 — 검색 결과에 그대로 나옵니다
  tagline: "창원 블로그·SNS 마케팅 강사",
  description:
    "창원·경남 소상공인을 위한 블로그·SNS 마케팅 강의. 1:1 과외, 기업 특강, 기관 출강.",

  url: "https://example.com",       // 도메인 연결 후 실제 주소로
  ogImage: "/og.png",               // public/og.png (1200x630 권장)

  author: {
    name: "이지원",
    jobTitle: "블로그·SNS 마케팅 강사",
  },

  /* 지역 업체 정보 — AI가 "창원 마케팅 강사"를 찾을 때 쓰는 근거 */
  business: {
    city: "창원시",
    region: "경상남도",
    country: "KR",
    streetAddress: "",              // 공개 원치 않으면 빈칸으로 두세요
    postalCode: "",
    telephone: "010-0000-0000",
    priceRange: "₩₩",
    areaServed: ["창원", "김해", "진주", "양산", "통영", "거제", "부산", "경남 전 지역"],
    sameAs: [                       // 운영 중인 것만 남기세요
      "https://blog.naver.com/아이디",
      "https://www.instagram.com/아이디",
    ],
  },

  /* 강의 분야 — 홈에 카드로 나옵니다 */
  services: [
    { title: "소상공인 마케팅", desc: "블로그·플레이스·SNS를 직접 운영할 수 있게" },
    { title: "1:1 과외", desc: "내 업종에 맞춰 옆에서 같이 만들어 드립니다" },
    { title: "기업·기관 특강", desc: "실습 중심으로 결과물을 만들고 끝내는 강의" },
  ],

  cta: {
    label: "강의 문의하기",
    href: "https://open.kakao.com/o/여기에_본인_링크",
  },
};
