/* eslint-disable global-require */
const themesStyles = {
  // Each key is a marker that needs to be
  // added to your webpack.config to become
  // available.
  default: require('./styles/default.less'),
  'dark-orange': require('./styles/darkOrange.less'),
  'light-green': require('./styles/lightGreen.less'),
  'blue-jeans': require('./styles/blueJeans.less')
};

export default function getThemes(theme) {
  return themesStyles[theme];
}

/* eslint-enable global-require */
