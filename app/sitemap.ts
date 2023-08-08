import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://timeseries.nixtla.io",
      lastModified: new Date(),
    },
    {
      url: "https://timeseries.nixtla.io/generate",
      lastModified: new Date(),
    },
  ];
}
