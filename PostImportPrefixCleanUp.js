/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const pluginClassCreator = ClassConstructor => class PostImportPrefixCleanUp extends ClassConstructor {
  constructor(options) {
    super(options);
    this.options = options;
    this.options.wrappers = options.wrappers || [];
    this.less = options.less;
  }

  process(css) {
    // Check if css is wrapped with any one of the marks
    const antDesignTemplateMark = this.options.wrappers.reduce((mark, wrapper) => (css.indexOf(wrapper) >= 0 ? wrapper : mark), '');
    if (!antDesignTemplateMark) {
      return css;
    }

    // Escape the mark to be RegExp friendly
    const escapedMark = antDesignTemplateMark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Split, map, remove all, add one, clean double spaces
    const lines = css.split('\n').map((line) => {
      if (line.indexOf(antDesignTemplateMark) === -1) {
        return line;
      }
      const finder = new RegExp(escapedMark, 'g');
      const replacedLine = `${antDesignTemplateMark} ${line.replace(finder, '')}`;
      return replacedLine.replace(/( {2})/g, ' ');
    });

    return lines.join('\n');
  }
};

module.exports = class LessPlugin {
  constructor(options) {
    this.options = options;
    this.install = this.install.bind(this);
    this.PostImportPrefixCleanUp = null;
    this.minVersion = [0, 0, 1];

    this.setOptions = (theOptions) => {
      this.options = theOptions;
    };
  }

  install(less, pluginManager) {
    this.PostImportPrefixCleanUp = pluginClassCreator(less.FileManager);
    pluginManager.addPostProcessor(new this.PostImportPrefixCleanUp({
      ...this.options,
      less
    }));
  }
};
