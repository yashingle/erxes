import { core } from 'erxes-ui-utils'
import { getEnv } from 'apolloClient';
import T from 'i18n-react';
import { IUserDoc } from 'modules/auth/types';
import Alert from './Alert';
import confirm from './confirmation/confirm';
import router from './router';
import toggleCheckBoxes from './toggleCheckBoxes';
import uploadHandler from './uploadHandler';
import urlParser from './urlParser';

export const renderFullName = core.renderFullName;
export const renderUserFullName = core.renderUserFullName;
export const setTitle = core.setTitle;
export const setBadge = core.setBadge;
export const reorder = core.reorder;
export const generateRandomColorCode = core.generateRandomColorCode;
export const isNumeric = core.isNumeric;
export const isTimeStamp = core.isTimeStamp;

// Create an array with "stop" numbers, starting from "start"
export const range = core.range;

// Return the list of values that are the intersection of two arrays
export const intersection = core.intersection;

// Computes the union of the passed-in arrays: the list of unique items
export const union = core.union;

// Similar to without, but returns the values from array that are not present in the other arrays.
export const difference = core.difference;

export { Alert, uploadHandler, router, confirm, toggleCheckBoxes, urlParser };

export const can = core.can;

export const __ = (key: string, options?: any) => {
  const translation = T.translate(key, options);

  if (!translation) {
    return '';
  }

  return translation.toString();
};

/**
 * Request to get file's URL for view and download
 * @param {String} - value
 * @return {String} - URL
 */
export const readFile = (value: string): string => {
  const { REACT_APP_API_URL } = getEnv();
  return core.readFile(value, REACT_APP_API_URL);
};

export const getUserAvatar = (user: IUserDoc) => {
  if (!user) {
    return '';
  }

  const { details = {} } = user;

  if (!details.avatar) {
    return '/images/avatar-colored.svg';
  }

  return readFile(details.avatar);
};

export const withProps = core.withProps;
export const renderWithProps = core.renderWithProps;
export const isValidDate = core.isValidDate;
export const extractAttachment = core.extractAttachment;
export const setCookie = core.setCookie;
export const getCookie = core.getCookie;
export const generateRandomString = core.generateRandomString;

/**
 * Generate random int number between 0 and max
 */
export const getRandomNumber = core.getRandomNumber;

/**
 * Send desktop notification
 */
export const sendDesktopNotification = core.sendDesktopNotification;
export const roundToTwo = core.roundToTwo;
export const  formatValue = core.formatValue;
export const isEmptyContent = core.isEmptyContent;
export const isValidUsername = core.isValidUsername;
export const storeConstantToStore = core.storeConstantToStore;
export const getConstantFromStore = core.getConstantFromStore;

// Most basic frontend solution for click-jack defense
export const bustIframe = core.bustIframe;
