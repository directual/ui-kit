export const getSvgCollection = () => {
  const getInlineSvg: any = require.context('../../../assets/svg', true, /\.svg$/);

  return getInlineSvg
    .keys()
    .reduce((images: any, path: string) => {
      const name = path.replace('./', '').replace('.svg', '');
      // eslint-disable-next-line no-param-reassign
      images[name] = getInlineSvg(path);

      return images;
    }, {});
};

export const getIconsList = (): any[] => {
  const getInlineSvg: any = require.context('../../../assets/svg', true, /\.svg$/);

  return getInlineSvg
    .keys()
    .map((image: any) => {
      const name = image.replace('./', '').replace('.svg', '');
      return name;
    });
};

export const getRandomIconName = (): string => {
  const iconsList = getIconsList();
  const iconIndex = Math.floor(Math.random() * iconsList.length);
  return iconsList[iconIndex];
};
