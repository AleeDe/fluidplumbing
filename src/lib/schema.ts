import { site } from '@/data/site';
import { areas } from '@/data/areas';
import { services } from '@/data/services';
import { faqs } from '@/data/content';

const abs = (path = '') => `${site.url}${path}`;

/** Plumber / LocalBusiness — homepage only. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': abs('/#business'),
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    image: abs('/brand/og.png'),
    logo: abs('/brand/logo.svg'),
    priceRange: site.priceRange,
    founder: { '@type': 'Person', name: site.owner },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: areas.map((a) => ({
      '@type': 'City',
      name: a.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: a.county },
    })),
    openingHoursSpecification: site.hours.spec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Plumbing services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, url: abs(`/services/${s.slug}/`) },
      })),
    },
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

/** Service schema for an individual service page. */
export function serviceSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': abs(`/services/${s.slug}/#service`),
    name: s.title,
    description: s.metaDescription,
    url: abs(`/services/${s.slug}/`),
    serviceType: s.title,
    provider: { '@id': abs('/#business') },
    areaServed: areas.map((a) => ({ '@type': 'City', name: a.name })),
  };
}

/** Service scoped to a town, for area pages. */
export function areaServiceSchema(slug: string) {
  const a = areas.find((x) => x.slug === slug);
  if (!a) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': abs(`/areas/${a.slug}/#service`),
    name: `Plumbing services in ${a.name}`,
    description: a.metaDescription,
    url: abs(`/areas/${a.slug}/`),
    provider: { '@id': abs('/#business') },
    areaServed: {
      '@type': 'City',
      name: a.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: a.county },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: a.geo.latitude,
        longitude: a.geo.longitude,
      },
    },
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.href),
    })),
  };
}

export function imageObjectSchema(
  images: { src: string; alt: string; caption: string; width: number; height: number }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${site.name} completed work`,
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: abs(img.src),
      caption: img.caption,
      description: img.alt,
      width: img.width,
      height: img.height,
    })),
  };
}
