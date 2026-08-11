/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sound-insight.com',
  generateRobotsTxt: true,
  // Small site — keep one flat sitemap.xml instead of an index + shards.
  generateIndexSitemap: false
};
