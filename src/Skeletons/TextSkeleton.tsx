import React from 'react';
import {useTheme} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {ISkeletonProps} from 'Types';

const TextSkeleton = (props: ISkeletonProps) => {
  const {borderRadius = 3, height = 25, width} = props;

  const {colors} = useTheme();

  return (
    <SkeletonPlaceholder
      borderRadius={borderRadius}
      backgroundColor={colors.surfaceVariant}>
      <SkeletonPlaceholder.Item width={width} height={height} />
    </SkeletonPlaceholder>
  );
};

export default TextSkeleton;
