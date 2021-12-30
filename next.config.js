/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/require-await */
module.exports = {
  images: {
    domains: ['i.imgur.com', 'res.cloudinary.com']
  },
  env: {
    firebasedb_link: 'https://sound-insight-default-rtdb.firebaseio.com/PAGE_DATA.json',
    google_analytics: 'UA-148182336-1'
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      },
      {
        key: 'Server',
        value: 'Apache'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'X-Frame-Options',
        value: 'sameorigin'
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'Referrer-Policy',
        value: 'same-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'geolocation=*'
      }
      ]
    }];
  }
};
