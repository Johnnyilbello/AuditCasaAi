/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? "/AuditCasaAi" : "",
  assetPrefix: isGithubPages ? "/AuditCasaAi/" : ""
};

export default nextConfig;
