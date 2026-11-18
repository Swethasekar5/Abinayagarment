import products from './products.json';
import { url } from '../lib/url';

/**
 * Business details used across the site.
 * Contact details come from the original website.
 * ⚠️ `stats` are SAMPLE figures for the design — replace with real numbers before launch.
 */
export const site = {
  name: 'Abinaya Garment Shop',
  short: 'Abinaya',
  tagline: 'Tiruppur · Knitwear',
  address: {
    line1: '8/76, Angeripalayam Road',
    city: 'Tiruppur',
    state: 'Tamil Nadu',
    country: 'India',
  },
  mapUrl: 'https://maps.google.com/?q=8/76+Angeripalayam+Road,+Tiruppur,+Tamil+Nadu',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  // Every WhatsApp button, form and quote list opens a chat with this number (via waLink below).
  // ⚠️ Interim number; the Tel number above is still a sample value.
  whatsapp: '919597541703', // digits only, with country code
  whatsappDisplay: '+91 95975 41703',
  email: 'contact@abinayagarments.com',
  hours: 'Mon – Sat · 9 AM – 7 PM IST',
  replyTime: 'We reply within 24 hours',
  stats: [
    { value: 30, decimals: 0, suffix: '', label: 'Years in Tiruppur', note: 'Family-run knitwear house' },
    { value: 2.5, decimals: 1, suffix: 'L', label: 'Pieces / month', note: 'Knitting, dyeing & stitching capacity' },
    { value: 420, decimals: 0, suffix: '+', label: 'Retail partners', note: 'Boutiques, distributors & brands' },
    { value: 22, decimals: 0, suffix: '', label: 'States served', note: 'Pan-India dispatch' },
  ],
} as const;

export const DEFAULT_WA_MESSAGE =
  'Hello Abinaya Garment Shop, I am interested in your cotton apparel wholesale collections. Please share your product details and wholesale pricing.';

export const waLink = (text: string = DEFAULT_WA_MESSAGE) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Unique product categories, in catalogue order (used for inquiry dropdowns). */
export const categories = [...new Set(products.map((p) => p.category))];

export const nav = [
  { href: url('/products'), label: 'Products' },
  { href: url('/#process'), label: 'Process' },
  { href: url('/gallery'), label: 'Gallery' },
  { href: url('/about-us'), label: 'About' },
  { href: url('/contact-us'), label: 'Contact' },
];
