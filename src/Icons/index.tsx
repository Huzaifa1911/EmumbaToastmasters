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
import {useAppTheme} from 'Assets';

type TSpecificIcon = Omit<VectorIconType, 'name' | 'iconType'>;

const VectorIcon = (props: VectorIconType) => {
  const {iconType, ...rest} = props;
  const {
    colors: {onBackground},
  } = useAppTheme();

  switch (iconType) {
    case 'AntDesign':
      return <AntDesign color={onBackground} {...rest} />;
    case 'Entypo':
      return <Entypo color={onBackground} {...rest} />;
    case 'Feather':
      return <Feather color={onBackground} {...rest} />;
    case 'FontAwesome':
      return <FontAwesome color={onBackground} {...rest} />;
    case 'FontAwesome5':
      return <FontAwesome5 color={onBackground} {...rest} />;
    case 'Foundation':
      return <Foundation color={onBackground} {...rest} />;
    case 'Ionicons':
      return <Ionicons color={onBackground} {...rest} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons color={onBackground} {...rest} />;
    case 'MaterialIcons':
      return <MaterialIcons color={onBackground} {...rest} />;
    case 'Octicons':
      return <Octicons color={onBackground} {...rest} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons color={onBackground} {...rest} />;
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

export const DrawerIcon = (props: TSpecificIcon) => (
  <VectorIcon iconType="Feather" name="align-center" {...props} />
);

export const AngleRightIcon = (props: TSpecificIcon) => (
  <VectorIcon iconType="FontAwesome" name="angle-right" {...props} />
);

export const AddCircleIcon = (props: TSpecificIcon) => (
  <VectorIcon iconType="Ionicons" name="add-circle-outline" {...props} />
);
