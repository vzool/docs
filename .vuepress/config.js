module.exports = {
  base: '/',
  title: 'Directus Docs',
  description: 'The All-New Directus 7.\nFuture-Proof Headless CMS.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'App', items: [
        { text: 'User Guide', link: '/app/user-guide' },
        { text: 'Admin Guide', link: '/app/admin-guide/' },
        { text: 'Contributor Guide', link: '/app/contributor-guide/' }
      ]},
      { text: 'API', items: [
        { text: 'API Reference', link: '/api/reference' },
        { text: 'Admin Guide', link: '/api/admin-guide/' },
        { text: 'Contributor Guide', link: '/api/contributor-guide/' }
      ]}
    ],
    repo: 'directus/docs-v7',
    docsDir: 'docs',
    editLinks: true,
  }
};
