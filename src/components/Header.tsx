import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b py-6 px-8">
            <h1 className="text-4xl font-bold inline-block">Jeong Irin</h1>
            <nav className="float-right space-x-6 text-lg">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
                <Link href="/resume" className="hover:underline">Resume</Link>
            </nav>
        </header>
    );
}
