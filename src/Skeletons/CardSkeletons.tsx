import React from 'react';
import {useTheme} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export interface ICardSkeletonProps {
  height?: string | number;
  width?: string | number;
  borderRadius?: number;
}

const CardSkeleton = (props: ICardSkeletonProps) => {
  const {height = 100, width = '100%', borderRadius = 8} = props;
  const {colors} = useTheme();

  return (
    <SkeletonPlaceholder
      borderRadius={borderRadius}
      backgroundColor={colors.surfaceVariant}>
      <SkeletonPlaceholder.Item width={width} height={height} />
    </SkeletonPlaceholder>
  );
};

export default CardSkeleton;
