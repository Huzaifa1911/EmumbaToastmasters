import React from 'react';
import {View, ViewProps} from 'react-native';
import styled from 'styled-components/native';

const Layout = (props: ViewProps) => {
  const {children, ...rest} = props;
  return <LayoutContainer {...rest}>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled(View)(({theme}: AppTheme.ThemeType) => ({
  backgroundColor: theme?.colors.surface,
}));
