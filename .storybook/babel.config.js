module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    env: {
      test: {
        plugins: ['transform-es2015-modules-commonjs']
      }
    },
    plugins: ['transform-es2015-modules-commonjs']
  };
};
