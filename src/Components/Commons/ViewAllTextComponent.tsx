import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

import AppText, {IAppTextProps} from '../AppText';

interface IViewAllTextComponentProps {
  label: string;
  labelProps?: IAppTextProps;
  onViewAllPress?: () => void;
}

const ViewAllTextComponent = (props: IViewAllTextComponentProps) => {
  const {label, labelProps, onViewAllPress} = props;
  return (
    <Content>
      <AppText size={18} variant="bold" {...labelProps}>
        {label}
      </AppText>
      <AppText
        size={14}
        variant="medium"
        onPress={onViewAllPress}
        color="primary">
        View All
      </AppText>
    </Content>
  );
};

export default ViewAllTextComponent;

const Content = styled(View)(() => ({
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'space-between',
}));
