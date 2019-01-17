# antd-theming-engine
Sort of a theme engine for Ant Design

# Usage

## Webpack Less Plugin
Import PostImportPrefixCleanUp in your webpack.config
```javascript
const PostImportPrefixCleanUp = require('./PostImportPrefixCleanUp.js');
```

Add it to your `less-loader` plugin with all prefixes in a array. Each prefix is a "mark" for a theme.

```javascript
{
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,
    plugins: [
      new PostImportPrefixCleanUp({
        wrappers: [
          '[data-antd-theme="blue-jeans"]',
          '[data-antd-theme="dark-orange"]',
          '[data-antd-theme="default"]',
          '[data-antd-theme="light-green"]'
        ]
      })
    ]
  }
}
```

## Styles & React Component
* Inside the folder `themes/styles` create a style file as desired.

* Add a key/value reference to each one of the themes in the `themes/getTheme.js`.

* Import component `<ThemeProvider />` and use to wrap components you want to get a specific theme applied to.

The react component has two behaviors:
1. `useHtmlRoot` set to false. This will wrap all components in a div. This is useful to use multiple themes at the same time
2. `useHtmlRoot` set to true. This will apply the mark to the `html` element so the entire application uses the same theme, therefore only one theme at a time.

## Example
```HTML
<ThemeProvider theme="light-green" useHtmlRoot>
  <div> My Ant.Design application </div>
</ThemeProvider
```
