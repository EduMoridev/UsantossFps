/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evita que o Next compile o barrel inteiro dessas libs (centenas de
  // componentes não usados) a cada rota nova em dev — importa só o
  // submódulo realmente usado. Reduz bastante o tempo de compilação
  // sob demanda no `next dev` e o tamanho do bundle em produção.
  experimental: {
    optimizePackageImports: [
      "@heroui/react",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "motion",
      "fuse.js",
      "cmdk",
    ],
  },
  // `STATIC_EXPORT=1 npm run build` gera um site estático em ./out
  ...(process.env.STATIC_EXPORT ? { output: "export", trailingSlash: true, images: { unoptimized: true } } : {}),
};

export default nextConfig;
