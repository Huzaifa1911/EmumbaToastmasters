import React from 'react';
import {When} from 'react-if';

import {TStandardObject} from 'Types';
import {AppText, Spacer} from 'Components';
import {ListItemView} from '../styles';
import {CheckCircleIcon} from 'Icons';
import {useAppTheme} from 'Assets';

interface IListItemProps {
  item: TStandardObject;
  isSelected: boolean;
  onPress?: () => void;
}
const ListItem = ({item, isSelected, onPress}: IListItemProps) => {
  const {label} = item;

  const {colors} = useAppTheme();

  return (
    <Spacer horizontal={0}>
      <ListItemView activeOpacity={0.6} onPress={onPress}>
        <AppText>{label}</AppText>
        <When condition={isSelected}>
          <CheckCircleIcon size={15} color={colors.accentGreen} />
        </When>
      </ListItemView>
    </Spacer>
  );
};

export default ListItem;
