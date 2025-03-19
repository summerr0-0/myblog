import "../styles/globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import "../styles/markdown.css";

export const metadata = {
    title: "Irin's life",
    description: "Portfolio site of Jeong Irin",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <ConditionalHeader />
        <main>{children}</main>
        </body>
        </html>
    );
}
