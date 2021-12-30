import headers from './helper/headers';

module.exports = {
  images: {
    domains: ['i.imgur.com', 'res.cloudinary.com']
  },
  env: {
    firebasedb_link: 'https://sound-insight-default-rtdb.firebaseio.com/PAGE_DATA.json',
    google_analytics: 'UA-148182336-1'
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers
      }
    ];
  }
};
