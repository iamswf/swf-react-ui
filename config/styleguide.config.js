module.exports = {
    webpackConfig: require('./webpack.config.js'),
    components: '../components/**/index.{ts,tsx}',
    sections: [
        {
            name: 'Introduction',
            content: '../docs/introduction.md'
        },
        {
            name: 'UI Components',
            content: '../docs/ui.md',
            components: '../components/**/index.{ts,tsx}',
            exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
            usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        }
    ],
    ignore: ['../components/**/style/*.{ts,tsx}']
};
