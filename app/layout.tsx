import React from 'react';

export const metadata = {
  title: 'Form 26QB Calculator & Filing Guide (TDS on Property & 234E Calculator) | PropTDS',
  description:
    'Free online Form 26QB TDS on property calculator. Learn how to fill and file Form 26QB, check 26QB due date, calculate Section 194-IA joint buyer splits, and estimate Section 234E late fee penalty instantly.',
  keywords:
    'form 26qb, 26qb, 26qb tds, tds form 26qb, form 26qb filing, how to file form 26qb, how to fill form 26qb, 26qb due date, tds on property calculator, how to calculate tds on property, 234e calculator, tds 234e calculator',
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
    title: 'Form 26QB Calculator & Filing Guide (TDS on Property & 234E Calculator) | PropTDS',
    description:
      'Free online Form 26QB TDS on property calculator. Learn how to fill and file Form 26QB, check 26QB due date, calculate Section 194-IA joint buyer splits, and estimate Section 234E late fee penalty instantly.',
    url: 'https://proptds.fsite.workers.dev/',
    images: [{ url: 'https://proptds.fsite.workers.dev/icon.png', width: 512, height: 512, alt: 'PropTDS Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form 26QB Calculator & Filing Guide (TDS on Property & 234E Calculator) | PropTDS',
    description:
      'Free online Form 26QB TDS on property calculator. Learn how to fill and file Form 26QB, check 26QB due date, calculate Section 194-IA joint buyer splits, and estimate Section 234E late fee penalty instantly.',
    images: ['https://proptds.fsite.workers.dev/icon.png'],
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

        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is the statutory 26QB due date for property TDS deposit?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Under Section 194-IA, the 26QB due date is 30 calendar days from the end of the month in which tax was deducted. For example, if payment is made on 15th July, Form 26QB must be filed and deposited by 30th August.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How does the Section 234E calculator compute late filing fees?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The Section 234E fee is a mandatory penalty of ₹200 per day for every day of delay past the statutory 26QB due date. The maximum fee payable is capped at the total TDS amount for that transaction.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How to calculate TDS on property with multiple co-owners?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "When there are joint buyers or co-sellers, TDS (1%) is calculated on each co-owner's proportionate share of the higher of Agreement Value or Circle Rate. A separate Form 26QB must be filed for every unique buyer-seller combination.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
