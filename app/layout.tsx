import { createClient } from "@/utils/supabase/server";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Writer's Prompt",
  description:
    "Got a an idea but can't find the words? Got the words but can't find an idea? Try Writer's Prompt!",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <Navbar user={user} />
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>
              {/**<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <ThemeSwitcher />
              </footer>*/}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
