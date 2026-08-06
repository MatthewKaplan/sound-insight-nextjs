const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=*'
  }
];

module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.imgur.com' }
    ]
  },
  env: {
    firebasedb_link: 'https://sound-insight-default-rtdb.firebaseio.com/PAGE_DATA.json'
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: securityHeaders
    }];
  },
  async redirects() {
    return [
      {
        source: '/services/phoneSystems',
        destination: '/services/phone-systems',
        permanent: true
      },
      {
        source: '/brands',
        destination: '/products#brands',
        permanent: true
      },
      {
        source: '/careers',
        destination: '/about#careers',
        permanent: true
      }
    ];
  }
};
