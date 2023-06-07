import {ScrollView} from 'react-native';
import React from 'react';
import {Else, If, Then} from 'react-if';

import Spacer from './Spacer';

interface IMap<T> {
  data: T[];
  horizontal?: boolean;
  gap?: number;
  listEmptyComponent?: React.ReactElement;
  children: (item: T, index: number) => React.ReactElement;
}

function Map<T>({children, data = [], horizontal = false, gap = 5, listEmptyComponent}: IMap<T>) {
  const topSpace = horizontal ? 0 : gap; // top space will be applicable only when list is vertical
  const rightSpace = horizontal ? gap : 0; // right space will  be applicable only when list is horizontal.

  return (
    <If condition={data.length === 0}>
      <Then>{listEmptyComponent}</Then>
      <Else>
        <ScrollView horizontal={horizontal} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {data.map((item, index) => {
            const right = index === data.length - 1 ? 0 : rightSpace; // add right space to all items except last
            const top = index === 0 ? 0 : topSpace; // add top space to all items except first

            return (
              <Spacer flex={1} top={top} right={right} key={index}>
                <If condition={typeof item === 'string' || typeof item === 'number'}>
                  <Then>{children(item, index)}</Then>
                  <Else>{children({...item}, index)}</Else>
                </If>
              </Spacer>
            );
          })}
        </ScrollView>
      </Else>
    </If>
  );
}
export default Map;
