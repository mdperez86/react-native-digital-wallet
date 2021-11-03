import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#24c16b',
  secondary: '#0c381f',

  green: '#66d59a',
  lightGreen: '#e6fef0',

  lime: '#00ba63',
  emerald: '#2bc978',

  red: '#ff4134',
  lightRed: '#fff1f0',

  purple: '#6b3ce9',
  lightPurple: '#f3efff',

  yellow: '#ffc664',
  lightYellow: '#fff9ec',

  black: '#1e1f20',
  white: '#ffffff',

  transparent: 'transparent',

  lightGray: '#fcfbfc',
  gray: '#c1c3c5',
  darkGray: '#898c95',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 50,
  },
  h1: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  h4: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

export const THEME = {
  COLORS,
  SIZES,
  FONTS,
};

export default THEME;
