module.exports = {
  plugins: [
    require('postcss-modules-values'),
    require('postcss-nested'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    require('postcss-calc')({ mediaQueries: true }),
    require('cssnano')({ preset: 'default' }),
  ],
};
