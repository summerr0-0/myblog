// components/BlogList.tsx (클라이언트 컴포넌트)
"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/markdown";

interface BlogListProps {
    posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // 모든 카테고리 추출
    const allCategories = Array.from(
        new Set(posts.flatMap((post) => post.category || []))
    );

    // // 카테고리 필터링
    const filteredPosts = selectedCategory
        ? posts.filter((post) => post.category?.includes(selectedCategory))
        : posts;

    const sortedPosts = [...filteredPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );


    return (
        <div>
            {/* 카테고리 필터 */}
            <div className="mb-4">
                <span className="font-semibold">Categories: </span>
                {allCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() =>
                            setSelectedCategory(selectedCategory === category ? null : category)
                        }
                        className={`ml-2 hover:underline ${
                            selectedCategory === category ? "fonts-bold" : ""
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 블로그 포스트 리스트 */}
            {sortedPosts.map((post) => (

                <div key={post.slug} className="mb-8">
                    <h2 className="text-2xl font-bold">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-gray-500">{post.date}</p>
                </div>
            ))}

            {/* 포스트가 없을 때 */}
            {sortedPosts.length === 0 && (
                <p className="text-gray-500">No posts found for this category.</p>
            )}
        </div>
    );
}
