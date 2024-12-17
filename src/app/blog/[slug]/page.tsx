// app/blog/[slug]/page.tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "@/lib/markdown";

interface Params {
    slug: string;
}

export async function generateStaticParams() {
    const blogDirectory = path.join(process.cwd(), "src/content/blog");
    const fileNames = fs.readdirSync(blogDirectory);

    return fileNames.map((fileName) => ({
        slug: fileName.replace(/\.md$/, ""),
    }));
}

export default async function BlogPost({ params }: { params: Params }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), `src/content/blog/${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            <p className="text-gray-500 mb-6">{data.date}</p>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    );
}
