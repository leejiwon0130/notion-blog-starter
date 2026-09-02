/* ============================================================
   노션 블로그 표(데이터베이스)를 자동으로 만들어 줍니다.
   수강생이 직접 속성을 만들 필요가 없습니다.

   실행:  node scripts/setup-notion.mjs
   준비물: .env.local 에 아래 두 줄
     NOTION_TOKEN=ntn_...
     NOTION_PARENT_PAGE_ID=노션에서_만든_빈_페이지_주소의_32자리
   ============================================================ */
import { Client } from "@notionhq/client";
import fs from "node:fs";
import path from "node:path";

/* .env.local 직접 읽기 (별도 패키지 없이) */
function loadEnv() {
  const p = path.resolve(".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const i = line.indexOf("=");
    if (i > 0 && !line.trim().startsWith("#")) {
      const k = line.slice(0, i).trim();
      if (!process.env[k]) process.env[k] = line.slice(i + 1).trim();
    }
  }
}
loadEnv();

const token = process.env.NOTION_TOKEN;
const parentRaw = process.env.NOTION_PARENT_PAGE_ID;

function die(msg) {
  console.error("\n❌ " + msg + "\n");
  process.exit(1);
}

if (!token) die(".env.local 에 NOTION_TOKEN 이 없습니다.\n   notion.so/my-integrations 에서 통합을 만들고 시크릿 키(ntn_...)를 넣어주세요.");
if (!parentRaw) die(".env.local 에 NOTION_PARENT_PAGE_ID 가 없습니다.\n   노션에서 빈 페이지를 하나 만들고, 그 페이지 주소의 32자리를 넣어주세요.");

/* 주소를 통째로 붙여넣어도 32자리만 뽑아낸다 */
function toId(v) {
  const m = String(v).replace(/-/g, "").match(/[0-9a-f]{32}/i);
  return m ? m[0] : null;
}
const parent = toId(parentRaw);
if (!parent) die("NOTION_PARENT_PAGE_ID 에서 32자리 ID를 찾지 못했습니다.\n   노션 페이지 주소를 그대로 붙여넣어도 됩니다.");

const notion = new Client({ auth: token });

const run = async () => {
  console.log("\n📋 노션 블로그 표를 만드는 중...\n");

  let db;
  try {
    db = await notion.databases.create({
      parent: { type: "page_id", page_id: parent },
      title: [{ type: "text", text: { content: "블로그 글" } }],
      description: [{ type: "text", text: { content: "여기에 글을 쓰면 홈페이지 블로그에 올라갑니다. '발행'을 체크해야 보입니다." } }],
      properties: {
        "제목":     { title: {} },
        "슬러그":   { rich_text: {} },
        "요약":     { rich_text: {} },
        "카테고리": {
          select: {
            options: [
              { name: "마케팅", color: "green" },
              { name: "블로그", color: "blue" },
              { name: "SNS", color: "purple" },
              { name: "공지", color: "gray" },
            ],
          },
        },
        "발행일":   { date: {} },
        "발행":     { checkbox: {} },
      },
    });
  } catch (e) {
    if (String(e.message).includes("Could not find page")) {
      die("그 페이지에 통합이 연결되어 있지 않습니다.\n   노션에서 해당 페이지 → 우측 상단 ··· → 연결 → 만든 통합을 선택해 주세요.");
    }
    die("표 만들기 실패: " + e.message);
  }

  /* 바로 확인할 수 있게 샘플 글 하나 */
  const today = new Date().toISOString().slice(0, 10);
  try {
    await notion.pages.create({
      parent: { database_id: db.id },
      properties: {
        "제목":     { title: [{ text: { content: "첫 글입니다" } }] },
        "슬러그":   { rich_text: [{ text: { content: "hello" } }] },
        "요약":     { rich_text: [{ text: { content: "노션에서 쓴 글이 홈페이지에 그대로 올라갑니다." } }] },
        "카테고리": { select: { name: "공지" } },
        "발행일":   { date: { start: today } },
        "발행":     { checkbox: true },
      },
      children: [
        { object: "block", type: "paragraph",
          paragraph: { rich_text: [{ type: "text", text: { content: "이 글이 홈페이지 블로그에 보이면 연결이 잘 된 것입니다." } }] } },
        { object: "block", type: "heading_2",
          heading_2: { rich_text: [{ type: "text", text: { content: "글 쓰는 방법" } }] } },
        { object: "block", type: "bulleted_list_item",
          bulleted_list_item: { rich_text: [{ type: "text", text: { content: "표에서 새 행을 만들고 글을 씁니다." } }] } },
        { object: "block", type: "bulleted_list_item",
          bulleted_list_item: { rich_text: [{ type: "text", text: { content: "'발행'을 체크해야 홈페이지에 보입니다." } }] } },
        { object: "block", type: "bulleted_list_item",
          bulleted_list_item: { rich_text: [{ type: "text", text: { content: "이미지는 업로드하지 말고 이미지 주소(URL)를 붙여넣으세요. 업로드한 이미지는 1시간 뒤 깨집니다." } }] } },
      ],
    });
  } catch (e) {
    console.log("⚠️  샘플 글은 못 만들었지만 표는 생성됐습니다. (" + e.message + ")");
  }

  const id = db.id.replace(/-/g, "");
  console.log("✅ 완료!\n");
  console.log("   표 주소: " + db.url);
  console.log("   DB ID  : " + id + "\n");
  console.log("👉 .env.local 에 아래 줄을 추가하세요.\n");
  console.log("   NOTION_DATABASE_ID=" + id + "\n");
};

run();
