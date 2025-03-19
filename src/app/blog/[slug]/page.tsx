import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";
import {Metadata} from "next";

// 페이지 매개변수 타입
type PageParams = {
    slug: string;
}

// generateStaticParams 함수
export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const blogDirectory = path.join(process.cwd(), "src/content/blog");
    const fileNames = fs.readdirSync(blogDirectory);

    return fileNames.map((fileName) => ({
        slug: fileName.replace(/\.md$/, ""),
    }));
}

// 페이지 컴포넌트
async function BlogPost({
                            params,
                        }: {
    params: Promise<PageParams>;
}) {
    const {slug} = await params;

    const filePath = path.join(process.cwd(), `src/content/blog/${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const {data, content} = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
        <div className="max-w-4xl mx-auto p-8">
            <p className="text-3xl font-bold mb-4">{data.title}</p>
            <p className="text-gray-500 mb-6">{data.date}</p>
            {Array.isArray(data.category) && (
                <div className="mb-4">
                    <span className="font-semibold mr-2">Category:</span>
                    {data.category.map((cat: string, index: number) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded mr-2">
                            {cat}
                        </span>

                    ))}
                </div>
            )}
            <div className="markdown-content" dangerouslySetInnerHTML={{__html: contentHtml}}/>
        </div>
    );
}

export default BlogPost;