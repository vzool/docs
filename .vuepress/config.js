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
    nav: [
      { text: 'Website', link: 'https://directus.io' },
      { text: 'Cloud', link: 'https://directus.cloud' },
      { text: 'Demo', link: 'https://directus.app' }
    ],
    sidebarDepth: 1,
    sidebar: [
      {
        title: 'Introduction',
        collapsable: true,
        children: [
          '/what-is-directus',
          '/install',
          '/supporting-directus',
          '/feature-requests',
          '/docs-structure',
          '/glossary'
        ]
      },
      {
        title: 'API Reference',
        collapsable: true,
        children: [
          ['/api/reference', 'View Reference']
        ]
      },
      {
        title: 'API Admin Guide',
        collapsable: true,
        children: [
          ['/api/admin-guide/', 'Introduction'],
          ['/api/admin-guide/install', 'Installing'],
          ['/api/admin-guide/update', 'Updating'],
          ['/api/admin-guide/configure', 'Configuring'],
          '/api/admin-guide/thumbnailer',
          '/api/admin-guide/field-types',
          '/api/admin-guide/permissions',
          '/api/admin-guide/global-settings'
        ]
      },
      {
        title: 'API Contributor Guide',
        collapsable: true,
        children: [
          ['/api/contributor-guide/', 'Introduction'],
          ['/api/contributor-guide/install-dev', 'Development Environment'],
          '/api/contributor-guide/resources',
          '/api/contributor-guide/troubleshooting'
        ]
      },
      {
        title: 'App User Guide',
        collapsable: true,
        children: [
          ['/app/user-guide', 'View Guide']
        ]
      },
      {
        title: 'App Admin Guide',
        collapsable: true,
        children: [
          ['/app/admin-guide/', 'Introduction'],
          ['/app/admin-guide/install', 'Installing'],
          ['/app/admin-guide/update', 'Updating'],
          ['/app/admin-guide/troubleshooting', 'Troubleshooting'],
          '/app/admin-guide/collections',
          '/app/admin-guide/fields',
          '/app/admin-guide/relationships',
          '/app/admin-guide/roles',
          '/app/admin-guide/permissions'
        ]
      },
      {
        title: 'App Contributor Guide',
        collapsable: true,
        children: [
          ['/app/contributor-guide/', 'Introduction'],
          ['/app/contributor-guide/install-dev', 'Development Environment'],
          '/app/contributor-guide/resources',
          '/app/contributor-guide/github',
          '/app/contributor-guide/troubleshooting'
        ]
      },
      {
        title: 'Extending Directus',
        collapsable: true,
        children: [
          ['/extensions/', 'Introduction'],
          '/extensions/architecture',
          '/extensions/interfaces',
          '/extensions/layouts',
          '/extensions/pages',
          '/extensions/hooks',
          '/extensions/custom-endpoints',
          '/extensions/storage-adapters',
          '/extensions/auth-providers'
        ]
      }
    ],
    lastUpdated: 'Last Updated',
    repo: 'directus/docs-v7',
    docsDir: '',
    editLinks: true,
    ga: 'UA-24637628-7',
  }
};
