import webpack from '@cypress/webpack-preprocessor';
import webpackConfig from '../../webpack.config.js'; // Adjust the path if needed

export default (on) => {
  const options = {
    webpackOptions: webpackConfig,
    watchOptions: {},
  };

  on('file:preprocessor', webpack(options));
};
