import Svgo from 'svgo';
import loaderUtils from 'loader-utils';

export default function MpSvgLoader(source) {
  const callback = this.async();

  const options = {
    plugins: [],
  };

  if (!this.resourceQuery.length) {
    return callback(null, source);
  }

  const { fill, stroke, xmlns } = loaderUtils.parseQuery(this.resourceQuery);
  const attributes = [];
  if (fill) {
    attributes.push({
      fill,
    });
  }
  if (stroke) {
    attributes.push({
      stroke,
    });
  }
  if (xmlns === true) {
    attributes.push({
      xmlns: 'http://www.w3.org/2000/svg',
    });
  } else if (xmlns === false) {
    options.plugins.push({
      removeXMLNS: true,
    });
  }
  if (Object.keys(attributes).length > 0) {
    options.plugins.push({
      addAttributesToSVGElement: {
        attributes,
      },
    });
  }
  const svgo = new Svgo(options);
  svgo
    .optimize(source, { path: this.resourcePath })
    .then(result => callback(null, result.data))
    .catch(error => callback(error instanceof Error ? error : new Error(error)));
}
