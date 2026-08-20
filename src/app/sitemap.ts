import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { areas } from '@/data/areas';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${site.url}${p}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: url('/services/'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/areas/'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/gallery/'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/about/'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/contact/'), lastModified: now, changeFrequency: 'yearly', priority: 0.9 },
    { url: url('/privacy-policy/'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/terms/'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/services/${s.slug}/`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const areaRoutes: MetadataRoute.Sitemap = areas.map((a) => ({
    url: url(`/areas/${a.slug}/`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
