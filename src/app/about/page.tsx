// app/about/page.tsx

import { getMarkdownContent } from "@/lib/markdown";

export const metadata = {
    title: "About Me",
    description: "",
};

export default async function About() {
    const { data, contentHtml } = await getMarkdownContent("about.md");

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <main className="py-12 px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
                {/*<h2 className="text-2xl font-semibold mb-4">{data.description}</h2>*/}
                <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </main>
        </div>
    );
}
