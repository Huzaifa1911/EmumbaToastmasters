import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {VectorIconType} from 'Types';

type TSpecificIcon = Omit<VectorIconType, 'name' | 'iconType'>;

const VectorIcon = (props: VectorIconType) => {
  const {iconType, ...rest} = props;

  switch (iconType) {
    case 'AntDesign':
      return <AntDesign {...rest} />;
    case 'Entypo':
      return <Entypo {...rest} />;
    case 'Feather':
      return <Feather {...rest} />;
    case 'FontAwesome':
      return <FontAwesome {...rest} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...rest} />;
    case 'Foundation':
      return <Foundation {...rest} />;
    case 'Ionicons':
      return <Ionicons {...rest} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...rest} />;
    case 'MaterialIcons':
      return <MaterialIcons {...rest} />;
    case 'Octicons':
      return <Octicons {...rest} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons {...rest} />;
    default:
      return <></>;
  }
};

export default VectorIcon;

export const HomeIcon = (props: TSpecificIcon) => (
  <VectorIcon iconType="Entypo" name="home" {...props} />
);

export const CloseIcon = (props: TSpecificIcon) => (
  <VectorIcon iconType="AntDesign" name="close" {...props} />
);
