// lib/markdown.ts (서버 전용 모듈)

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Markdown 메타데이터 타입 정의
export interface MarkdownData {
    title?: string;
    description?: string;
    date?: string;
    category?: string[];
    [key: string]: unknown; // 기타 메타데이터
}

// About 페이지용 함수
const contentDirectory = path.join(process.cwd(), "src/content");
export async function getMarkdownContent(fileName: string) {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // 메타데이터와 본문 분리
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        data: data as MarkdownData, // 타입 적용
        contentHtml,
    };
}

// 블로그 포스트 타입 정의
export interface Post {
    slug: string;
    title: string;
    date: string;
    category?: string[]; // 카테고리 필드는 선택적(optional)
}

// 블로그 페이지용 함수
const blogDirectory = path.join(process.cwd(), "src/content/blog");
export function getAllBlogPosts(): Post[] {
    const fileNames = fs.readdirSync(blogDirectory);

    return fileNames.map((fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            slug: fileName.replace(/\.md$/, ""), // 파일 이름을 슬러그로 사용
            title: data.title || "No Title",
            date: data.date || "No Date",
            category: data.category || [], // 메타데이터에 category 추가
        };
    });
}
