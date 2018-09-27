module.exports = {
  base: '/',
  title: 'Directus Docs',
  description: 'The All-New Directus 7. Future-Proof Headless CMS for Managing Custom Database Content.',
  head: [
    ['link', { rel: "manifest",  href: "/site.webmanifest" }],
    ['link', { rel: "mask-icon",  href: "/safari-pinned-tab.svg", color: "#5bbad5" }],
    ['link', { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" }],
    ['link', { rel: "apple-touch-icon", type: "image/x-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ['meta', { name: "application-name", content: "Directus Docs" }],
    ['meta', { name: "theme-color", content: "#263238" }],
    ['meta', { name: "apple-mobile-web-app-title", content: "Directus Docs" }],
    ['meta', { name: "msapplication-TileColor", content: "#263238" }],
    ['meta', { name: "msapplication-config", content: "/browserconfig.xml" }]
  ],
  themeConfig: {
    sidebar: 'auto',
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
