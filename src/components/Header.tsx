import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b py-6 px-8">
            <p className="text-4xl font-bold inline-block"><Link href="/">Jeong Irin</Link></p>
            <nav className="float-right space-x-6 text-lg">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
                <a href="/irin.pdf" download className="hover:underline">Resume</a>
            </nav>
        </header>
    );
}
