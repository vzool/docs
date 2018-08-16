module.exports = {
  base: '/docs/',
  title: 'Directus Docs',
  description: 'A headless CMS that manages your content, not your workflow.',
  themeConfig: {
    nav: [
      { text: 'Home', link: 'https://docs.directus.io' },
      { text: 'API Reference', link: '/api' }
    ],
    repo: 'directus/docs/v7',
    docsDir: 'docs',
    editLinks: true,
  }
};
