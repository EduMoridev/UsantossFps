import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "@fontsource-variable/inter";
import "./globals.css";
import { ChromeGate } from "@/components/ChromeGate";
import { SiteBackground } from "@/components/background/SiteBackground";
import { MotionBudgetProvider } from "@/lib/motion/budget";
import { BRAND } from "@/lib/site";

/* Fonte de destaque (h1/h2, nomes e preços de plano, badges, CTAs,
   números grandes de métrica/FPS — ver `--font-display` em
   globals.css). Ponto único de troca: se o cliente decidir comprar a
   Gilroy depois, troca-se só este `next/font/google` por
   `next/font/local` apontando para os .woff2 em src/app/fonts/,
   mantendo `variable: "--font-display"` — nenhum componente muda. */
const fontDisplay = Poppins({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Otimização remota de PC para jogos: mais FPS e menos input lag, com medição antes e depois. Sem trocar hardware.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: BRAND.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  robots:
    process.env.VERCEL_ENV === "production"
      ? undefined
      : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" className={fontDisplay.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <MotionBudgetProvider>
          <SiteBackground />
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#052e16]"
          >
            Pular para o conteúdo
          </a>
          <ChromeGate>{children}</ChromeGate>
        </MotionBudgetProvider>
      </body>
    </html>
  );
}
