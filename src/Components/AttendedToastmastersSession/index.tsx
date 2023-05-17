/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {FlatList, StyleProp, ViewStyle} from 'react-native';

import {ToastmasterAttendedSessionCard, Spacer} from 'Components';
import {ToastmasterAttendedSessionType} from 'Types';
import AttendedSessionListHeader from './Components/AttendedSessionListHeader';

const SESSION: ToastmasterAttendedSessionType[] = [
  {
    performedRole: 'Timer',
    theme: 'The Power of Small Acts',
    timestamp: 1684084694348,
  },
  {
    performedRole: 'Timer',
    theme: 'The Power of Small Acts',
    timestamp: 1684084694348,
  },
  {
    performedRole: 'Timer',
    theme: 'The Power of Small Acts',
    timestamp: 1684084694348,
  },
];

interface IAttendedToastmasterSessions {
  showViewAllComponent?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const AttendedToastmasterSessions = (props: IAttendedToastmasterSessions) => {
  const {showViewAllComponent = false, contentContainerStyle} = props;

  const renderItem = ({item}: {item: ToastmasterAttendedSessionType}) => {
    return <ToastmasterAttendedSessionCard session={item} />;
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <AttendedSessionListHeader
            showViewAllComponent={showViewAllComponent}
          />
        }
        data={SESSION}
        contentContainerStyle={contentContainerStyle}
        keyExtractor={(item, index) => item.theme + index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer top={14} />}
      />
    </>
  );
};

export default AttendedToastmasterSessions;
