import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900">
            {/* 타이틀 섹션 */}
            <div className="text-center mb-12">
                <p className="text-4xl md:text-5xl font-bold">I am Jeong Irin</p>
            </div>

            {/* 메인 콘텐츠 섹션 */}
            <div className="flex items-center justify-center w-full max-w-4xl">
                {/* 왼쪽 섹션 */}
                <div className="flex-1 flex justify-end text-xl md:text-left text-gray-700">
                    <div className="text-right">
                        <p>JAVA</p>
                        <p>KOTLIN</p>
                        <p>TYPE SCRIPT</p>
                    </div>
                </div>

                {/* 세로 구분선 */}
                <div className="h-40 w-px bg-gray-500 mx-8"></div>

                {/* 오른쪽 네비게이션 */}
                <div className="flex-1 flex justify-start text-xl">
                    <nav className="space-y-2">
                        <Link href="/about" className="block hover:underline">About</Link>
                        <Link href="/blog" className="block hover:underline">Blog</Link>
                        <Link href="/resume" className="block hover:underline">Resume</Link>
                    </nav>
                </div>
            </div>
        </main>
    );
}
