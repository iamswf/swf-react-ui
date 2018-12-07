module.exports = {
    webpackConfig: require('./webpack.config.js'),
    components: '../components/**/*.{ts,tsx}',
    sections: [
        {
            name: 'Introduction',
            content: '../docs/introduction.md'
        },
        {
            name: 'UI Components',
            content: '../docs/ui.md',
            components: '../components/**/*.{ts,tsx}',
            exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
            usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        }
    ]
};
