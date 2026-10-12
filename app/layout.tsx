import React from 'react';

export const metadata = {
  title: 'PropTDS – Property TDS & Form 26QB Split Calculator (Section 194-IA)',
  description:
    'Calculate Section 194-IA (Form 26QB) property TDS for joint buyers and sellers. Instant multi-party splits, circle rate evaluation, and Section 234E late fees.',
  applicationName: 'PropTDS',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    siteName: 'PropTDS',
    title: 'PropTDS – Property TDS & Form 26QB Split Calculator',
    description:
      'Zero-math Section 194-IA property TDS calculator for Indian real estate buyers. Accurate co-owner splits, circle rate vs agreement valuation, and statutory late fees.',
    url: 'https://proptds.fsite.workers.dev/',
    images: [{ url: 'https://proptds.fsite.workers.dev/icon.png', width: 512, height: 512, alt: 'PropTDS Logo' }],
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
        <meta name="google-site-verification" content="O-cwM9ZbFyQTKNhBrz5rAwGtTt0IfJTbesgGLxEwL6U" />
        <link rel="canonical" href="https://proptds.fsite.workers.dev/" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta property="og:site_name" content="PropTDS" />

        {/* Google Search Site Name (WebSite Structured Data) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'PropTDS',
              alternateName: 'PropTDS - Property TDS Calculator',
              url: 'https://proptds.fsite.workers.dev',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
