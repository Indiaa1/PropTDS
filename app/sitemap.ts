export const dynamic = 'force-static';

export interface SitemapItem {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export default function sitemap(): SitemapItem[] {
  const baseUrl = 'https://proptds.fsite.workers.dev';
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2026-10-12'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides/joint-buyers-form-26qb`,
      lastModified: new Date('2026-10-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/section-234e-late-fee-calculation`,
      lastModified: new Date('2026-10-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/disclaimer`,
      lastModified: new Date('2026-10-12'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacy-policy`,
      lastModified: new Date('2026-10-12'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date('2026-10-12'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
