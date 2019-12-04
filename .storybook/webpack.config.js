module.exports = async ({config, mode}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  const index = config.module.rules.findIndex(rule => {
    return rule.test.toString().indexOf('svg') !== -1;
  });

  const imagesTest = config.module.rules[index].test;

  config.module.rules[index].test = new RegExp(imagesTest.toString().replace('svg|', '').replace('/', '').replace('/', ''));

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-inline-loader',
        options: {
          removingTagAttrs: ["fill", "fill-rule", "style"]
        },
      }
    ]
  });

  return config;
};
