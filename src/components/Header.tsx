export default function Header() {
    return (
        <header className="border-b py-6 px-8">
            <h1 className="text-4xl font-bold inline-block">Jeong Irin</h1>
            <nav className="float-right space-x-6 text-lg">
                <a href="/" className="hover:underline">Home</a>
                <a href="/about" className="hover:underline">About</a>
                <a href="/blog" className="hover:underline">Blog</a>
                <a href="/resume" className="hover:underline">Resume</a>
            </nav>
        </header>
    );
}
