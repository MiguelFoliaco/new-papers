import type { Metadata, Viewport } from "next";
import '@fontsource/im-fell-double-pica-sc';
import '@fontsource/kaisei-decol';
// Supports weights 100-900
import '@fontsource-variable/montserrat';
import "./globals.css";
import { Toast } from "@/module/common/components/toast";
import { LayoutClient } from "./layoutClient";
import { getUserConfig } from "@/module/profile/actions/get-user-config";

export const metadata: Metadata = {
  title: "New Papers",
  description: "Noticias, publicaciones y artículos de todos los temas.",
  openGraph: {
    title: 'Publica tu contenido en - New Papers -',
    description: 'Noticias, publicaciones y artículos de todos los temas.',
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#D1B65E" },
    { media: "(prefers-color-scheme: light)", color: "#D1B65E" }
  ],
  colorScheme: "light"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // const user = await client.auth.getUser()
  const userConfig = await getUserConfig()

  return (
    <html lang="en">

      <body
        className="bg-base-100"
        data-theme="caramellatte"
      >
        <LayoutClient
          user={userConfig.user!}
          userConfig={userConfig.data!}
        >
          <Toast />
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
