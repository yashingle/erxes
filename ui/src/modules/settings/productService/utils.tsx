import { PRODUCT_TYPE_CHOISES } from './constants';

export { generateCategoryOptions } from 'erxes-ui-utils'

export const productTypeChoises = __ => {
  const options: Array<{ value: string; label: string }> = [];

  for (const key of Object.keys(PRODUCT_TYPE_CHOISES)) {
    options.push({
      value: key,
      label: __(PRODUCT_TYPE_CHOISES[key])
    });
  }

  return options;
};
