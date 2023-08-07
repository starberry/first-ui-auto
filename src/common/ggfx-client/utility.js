'use strict';
import {some, isEmpty, reject} from 'lodash';

export const isBrowser = () => {
  return (typeof window !== 'undefined');
}

export const hasEmptyPropsInObj = objParam => {
  return some(objParam, isEmpty);
}

export const removeEmptyPropsInObjs = arrayParam => {
  return reject(arrayParam, isEmpty);
}

export const parseOriginalImg = (img) => {
  return img ? img.replace(/File /, '').replace(/["]/g, '') : '';
}
