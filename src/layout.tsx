import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lifeforge.",
  description: "An all in one platform for managing your life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="relative flex-col flex h-[100dvh] w-full overflow-hidden bg-zinc-200/50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
          {children}
        </main>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
