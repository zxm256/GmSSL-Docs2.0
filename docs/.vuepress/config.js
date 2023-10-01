module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    base: "/gmssl-docs2.0/",
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' },
        ],
        smoothScroll: true
    }
}