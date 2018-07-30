# mp-svg-loader

A Webpack loader which processing SVG image by URI search params.

```javascript
// will add fill="red" to svg element
import mySvg from './my.svg?fill=red';
```

# Why

In [WeChat Mini Program](https://mp.weixin.qq.com/cgi-bin/wx) development there are much lack of SVG image support. For example:

* Don't support use [inline SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg).

* Don't support changing fill / stroke color by CSS.

* Don't support SVG without `xmlns` within `<image>`'s `src` attribute. ( This is not only a Mini Program issue but also other browsers. )

This Webpack loader is designed for solving there problems if you are developing WeChat Mini Program with Webpack, e.g. [mina-webpack](https://github.com/tinajs/mina-webpack) or [wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin) , or any Webpack project.

# Setup

Install package to your project:

```bash
npm i mp-svg-loader --save-dev
```

Add `mp-svg-loader` to your Webpack config file.

In most case you also use other loader like `file-loader`, `url-loader` or `svg-inline-loader`. Here is an example works with `file-loader`:

```javascript
{
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:6].[ext]',
            },
          },
          {
            loader: 'mp-svg-loader',
          },
        ],
      },
    ],
  },
};
```

Other examples can be found in [fixtures](./fixtures).

> Please not that the order of Webpack loaders is important. See [Loader Features - Webpack](https://webpack.js.org/concepts/loaders/#loader-features)

# Usage

Add URI search params when `import` your SVG images.

Webpack loader use `loader-utils`' [parseQuery](https://github.com/webpack/loader-utils#parsequery) for parse URI search params which is different with the [WHATWG URL](https://url.spec.whatwg.org/).


All rules here:

| key    | type    | description                                                     | example                                                                                                                |
| ------ | ------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| fill   | String  | Add `fill` attribute for `svg` element                          | `my.svg?fill=red` <br /> `my.svg/fill=#008489` <br /> `my.svg?fill=rgb(127%2C%20127%2C%200)` <br />( became `fill="rgb(127, 127, 0)"`) |
| stroke | String  | Add `stroke` attribute for `svg` element                        | Same as `fill`                                                                                                         |
| xmlns  | Boolean | Add / remove `xmlns` attribute<br />( for inline / standalone image ) | `my.svg?+xmlns` <br /> `my.svg?-xmlns`                                                                                      |

> If the rule you want to use is not listed above please create a [issue](https://github.com/malash/mp-svg-loader/issues) / [pull-request](https://github.com/malash/mp-svg-loader/pulls).

# License

[MIT](./LICENSE)
