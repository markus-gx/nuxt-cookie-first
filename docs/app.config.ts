export default defineAppConfig({
  docus: {
    title: 'Nuxt CookieFirst',
    description: 'Nuxt Cookie First is a powerful and easy-to-use Nuxt.js module that seamlessly integrates CookieFirst, a GDPR and CCPA compliant cookie consent solution, into your Nuxt.js application. This module enables developers to manage cookies and user consent with minimal effort while providing an optimal user experience.',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      twitter: '',
      github: 'https://github.com/markus-gx/nuxt-cookie-first',
      nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com'
      }
    },
    github: {
      dir: '',
      branch: 'main',
      repo: 'nuxt-cookie-first',
      owner: 'markus-gx',
      edit: true
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    }
  }
})