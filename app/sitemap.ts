import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://timegpt-forecaster-next.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://timegpt-forecaster-next.vercel.app/run-forecast",
      lastModified: new Date(),
    },
  ];
}
