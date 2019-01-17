import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import getTheme from './getTheme';

export default class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.string,
    useHtmlRoot: PropTypes.bool,
    children: PropTypes.any
  };

  static defaultProps= {
    theme: 'light-green',
    useHtmlRoot: false,
    children: null
  };

  getThemeSheet = () => {
    const { theme } = this.props;

    console.log(getTheme(theme));
  }

  updateDocument = () => {
    const { useHtmlRoot, theme } = this.props;
    if (useHtmlRoot) {
      document.querySelector('html').setAttribute('data-antd-theme', theme);
    }
  }

  componentDidMount() {
    this.getThemeSheet();
    this.updateDocument();
  }

  componentDidUpdate(prevProps) {
    this.getThemeSheet();
    if (prevProps.theme !== this.props.theme || this.props.useHtmlRoot) {
      this.updateDocument();
    }
  }

  render() {
    const { children, theme, useHtmlRoot } = this.props;
    if (useHtmlRoot) {
      return (
        <Fragment>
          {children}
        </Fragment>
      );
    }

    return (
      <div data-antd-theme={theme}>
        {children}
      </div>
    );
  }
}
