import { css } from 'styled-components';
import { fontSize, lineHeight, fontWeight, FontWeightKey } from '@/styles/tokens/typography';

const getWeight = (type: FontWeightKey = 'regular') => fontWeight[type];

export const title01 = (type: FontWeightKey = 'bold') => css`
  font-size: ${fontSize.title01};
  line-height: ${lineHeight.title01};
  font-weight: ${getWeight(type)};
`;

export const title02 = (type: FontWeightKey = 'bold') => css`
  font-size: ${fontSize.title02};
  line-height: ${lineHeight.title02};
  font-weight: ${getWeight(type)};
`;

export const title03 = (type: FontWeightKey = 'semibold') => css`
  font-size: ${fontSize.title03};
  line-height: ${lineHeight.title03};
  font-weight: ${getWeight(type)};
`;

export const body01 = (type: FontWeightKey = 'medium') => css`
  font-size: ${fontSize.body01};
  line-height: ${lineHeight.body01};
  font-weight: ${getWeight(type)};
`;

export const body02 = (type: FontWeightKey = 'medium') => css`
  font-size: ${fontSize.body02};
  line-height: ${lineHeight.body02};
  font-weight: ${getWeight(type)};
`;

export const body03 = (type: FontWeightKey = 'regular') => css`
  font-size: ${fontSize.body03};
  line-height: ${lineHeight.body03};
  font-weight: ${getWeight(type)};
`;

export const body04 = (type: FontWeightKey = 'regular') => css`
  font-size: ${fontSize.body04};
  line-height: ${lineHeight.body04};
  font-weight: ${getWeight(type)};
`;

export const caption01 = (type: FontWeightKey = 'medium') => css`
  font-size: ${fontSize.caption01};
  line-height: ${lineHeight.caption01};
  font-weight: ${getWeight(type)};
`;

export const caption02 = (type: FontWeightKey = 'regular') => css`
  font-size: ${fontSize.caption02};
  line-height: ${lineHeight.caption02};
  font-weight: ${getWeight(type)};
`;
