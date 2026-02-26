import type { GeoItem } from '../../../mock/api';

export const getTypeIcon = (type: GeoItem['type']) => {
  if (type === 'hotel') return '🏨';
  if (type === 'city') return '📍';
  return '';
};