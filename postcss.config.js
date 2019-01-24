module.exports = {
  plugins: [
    require('postcss-modules-values'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    require('cssnano')({ preset: 'default' }),
  ],
};
