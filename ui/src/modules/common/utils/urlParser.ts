import { urlParser } from 'erxes-ui-utils'

export const isValidURL = urlParser.isValidURL;

const extractHostname = urlParser.extractHostname;
const extractRootDomain = urlParser.extractRootDomain;

export default {
  isValidURL,
  extractHostname,
  extractRootDomain
};
