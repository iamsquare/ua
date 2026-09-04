import { isNonNullish } from 'remeda';

export const isBrowser = () => isNonNullish(window) && isNonNullish(document);
