import type { Metadata } from "next";
import "./styles/globals.css";
import { Providers } from "@/components/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl!),
  title: { default: "ThinkBuilt Solutions", template: "" },
  description: "Build faster with confidence.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.thinkbuiltsol.com",
    title: "ThinkBuilt Solutions",
    description: "Build faster with confidence.",
    images: ["/images/Group.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/Group.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const handleChange = () => {
                  if (mediaQuery.matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                };
                handleChange();
                mediaQuery.addEventListener('change', handleChange);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body cz-shortcut-listen="true">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
