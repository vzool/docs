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
          '/i18n',
          '/supporting-directus',
          '/feature-requests',
          '/docs-structure',
          '/glossary'
        ]
      },
      {
        title: 'API',
        collapsable: true,
        children: [
          ['/api/reference', 'API Reference'],
          ['/', '┄┄┄┄┄┄┄┄┄┄'],
          ['/api/admin-guide/', 'Admin Guide'],
          ['/api/admin-guide/install', 'Installing'],
          ['/api/admin-guide/update', 'Updating'],
          ['/api/admin-guide/configure', 'Configuring'],
          ['/api/admin-guide/thumbnailer', 'Thumbnailer'],
          ['/api/admin-guide/field-types', 'Field Types'],
          ['/api/admin-guide/permissions', 'Permissions'],
          ['/api/admin-guide/global-settings', 'Global Settings'],
          ['/', '┄┄┄┄┄┄┄┄┄┄'],
          ['/api/contributor-guide/', 'Contributor Guide'],
          ['/api/contributor-guide/install-dev', 'Development Environment'],
          ['/api/contributor-guide/resources', 'Resources'],
          ['/api/contributor-guide/troubleshooting', 'Troubleshooting']
        ]
      },
      {
        title: 'Application',
        collapsable: true,
        children: [
          ['/app/user-guide', 'User Guide'],
          ['/', '┄┄┄┄┄┄┄┄┄┄'],
          ['/app/admin-guide/', 'Admin Guide'],
          ['/app/admin-guide/install', 'Installing'],
          ['/app/admin-guide/update', 'Updating'],
          ['/app/admin-guide/troubleshooting', 'Troubleshooting'],
          ['/app/admin-guide/collections', 'Collections'],
          ['/app/admin-guide/fields', 'Fields'],
          ['/app/admin-guide/relationships', 'Relationships'],
          ['/app/admin-guide/roles', 'Roles'],
          ['/app/admin-guide/permissions', 'Permissions'],
          ['/', '┄┄┄┄┄┄┄┄┄┄'],
          ['/app/contributor-guide/', 'Contributor Guide'],
          ['/app/contributor-guide/install-dev', 'Development Environment'],
          ['/app/contributor-guide/resources', 'Resources'],
          ['/app/contributor-guide/github', 'GitHub'],
          ['/app/contributor-guide/troubleshooting', 'Troubleshooting']
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
