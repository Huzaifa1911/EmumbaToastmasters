import React from 'react';
import {Case, Default, Switch} from 'react-if';
import {Checkbox, CheckboxProps} from 'react-native-paper';

import AppText, {IAppTextProps} from '../AppText';
import {Row} from 'Styles';

interface IAppCheckboxProps extends CheckboxProps {
  label?: string;
  labelProps?: IAppTextProps;
  mode?: 'android' | 'ios';
}

const AppCheckbox = (props: IAppCheckboxProps) => {
  const {mode = 'android', label, labelProps, ...rest} = props;

  return (
    <Row>
      <Switch>
        <Case condition={mode === 'ios'}>
          <Checkbox.IOS {...rest} />
        </Case>
        <Case condition={mode === 'android'}>
          <Checkbox.Android {...rest} />
        </Case>
        <Default>
          <Checkbox {...rest} />
        </Default>
      </Switch>
      <AppText size={14} color="outline" {...labelProps}>
        {label}
      </AppText>
    </Row>
  );
};

export default AppCheckbox;
