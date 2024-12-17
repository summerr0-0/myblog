import "../styles/globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";

export const metadata = {
    title: "My Portfolio",
    description: "Portfolio site of Rohit Jain",
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
