module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-modules-values'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-calc')({ mediaQueries: true }),
    require('cssnano')({ preset: 'default' }),
  ],
};
