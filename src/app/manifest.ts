import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GlowUp — English for Beauty Professionals',
    short_name: 'GlowUp',
    description: 'Aprende inglés para recepción de clínicas de belleza',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf8f5',
    theme_color: '#c4956a',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
