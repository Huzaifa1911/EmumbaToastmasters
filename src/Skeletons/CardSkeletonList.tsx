import {ViewStyle, StyleProp, ScrollView} from 'react-native';
import React from 'react';
import {When} from 'react-if';

import {Spacer} from 'Components';
import CardSkeleton, {ICardSkeletonProps} from './CardSkeletons';
import {ISpacerProps} from '../Components/Commons/Spacer';

interface ICardSkeletonListProps extends ICardSkeletonProps {
  length?: number;
  isLoading?: boolean;
  horizontal?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  spacerProps?: ISpacerProps;
}

const CardSkeletonList = (props: ICardSkeletonListProps) => {
  const {length = 3, isLoading, horizontal = false, contentContainerStyle, spacerProps, ...cardSkeletonProps} = props;

  const topSpace = horizontal ? 0 : 15; // top space will be applicable only when list is vertical
  const rightSpace = horizontal ? 15 : 0; // right space will  be applicable only when list is horizonta.

  return (
    <When condition={isLoading}>
      <Spacer {...spacerProps}>
        <ScrollView horizontal={horizontal} showsHorizontalScrollIndicator={false} contentContainerStyle={contentContainerStyle}>
          {[...Array(length)].map((_, index) => {
            const right = index === length - 1 ? 0 : rightSpace; // add right space to all items except last
            const top = index === 0 ? 0 : topSpace; // add top space to all items except first

            return (
              <Spacer right={right} top={top} key={index}>
                <CardSkeleton height={102} {...cardSkeletonProps} />
              </Spacer>
            );
          })}
        </ScrollView>
      </Spacer>
    </When>
  );
};

export default CardSkeletonList;
