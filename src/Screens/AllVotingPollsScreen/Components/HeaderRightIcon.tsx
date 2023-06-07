import React from 'react';
import {Appbar} from 'react-native-paper';
import {expandBottomSheet} from '..';

const HeaderRightIcon = () => {
  return <Appbar.Action icon="plus-circle-outline" onPress={expandBottomSheet} />;
};

export default HeaderRightIcon;
