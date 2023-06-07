/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {FlatList, StyleProp, ViewStyle} from 'react-native';
import {propOr} from 'ramda';

import {ToastmasterAttendedSessionCard, Spacer, AppActivityIndicator} from 'Components';
import {TAttendedEvent} from 'Types';
import AttendedSessionListHeader from './Components/AttendedSessionListHeader';
import {useGetAllAttendedEvents} from 'Services';
import {CardSkeletonList} from 'Skeletons';

interface IAttendedToastmasterSessions {
  contentContainerStyle?: StyleProp<ViewStyle>;
  showLatestSessions?: boolean;
}

const AttendedToastmasterSessions = (props: IAttendedToastmasterSessions) => {
  const {contentContainerStyle, showLatestSessions = false} = props;

  const {data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading} = useGetAllAttendedEvents({showLoading: false});

  const sessions: TAttendedEvent[] = propOr([], 'pages', data);
  const latestSessions = showLatestSessions ? sessions.slice(0, 5) : sessions;

  const onLoadMoreData = () => {
    if (hasNextPage && !showLatestSessions) {
      fetchNextPage();
    }
  };

  const renderItem = ({item}: {item: TAttendedEvent}) => {
    return <ToastmasterAttendedSessionCard session={item} />;
  };

  return (
    <>
      <FlatList
        data={latestSessions}
        contentContainerStyle={contentContainerStyle}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer top={10} />}
        onEndReached={onLoadMoreData}
        ListHeaderComponent={<AttendedSessionListHeader showViewAllComponent={sessions.length > 5} />}
        ListFooterComponent={<AppActivityIndicator isLoading={isFetchingNextPage} spacerProps={{top: 10}} />}
      />
      <CardSkeletonList isLoading={isLoading} length={5} spacerProps={{top: 5}} />
    </>
  );
};

export default AttendedToastmasterSessions;
