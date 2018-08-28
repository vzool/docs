module.exports = {
  base: '/',
  title: 'Directus Docs',
  description: 'The All-New Directus 7: Future-Proof Headless CMS for Managing Custom SQL Database Content.',
  themeConfig: {
    lastUpdated: 'Last Updated',
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
    docsDir: '',
    editLinks: true,
    ga: 'UA-24637628-7',
  }
};
