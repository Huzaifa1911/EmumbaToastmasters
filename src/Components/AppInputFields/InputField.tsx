import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {When} from 'react-if';
import {TextInputProps} from 'react-native-paper';

import {Content, PaperTextInput} from './styles';
import {AppText, Spacer} from 'Components';
import {useAppTheme} from 'Assets';

interface IAppInputField extends TextInputProps {
  flex?: number;
  width?: number | string;
  hint?: string;
}

const InputField = (props: IAppInputField) => {
  const {
    flex,
    label,
    width,
    hint,
    mode = 'outlined',
    onFocus,
    onBlur,
    ...rest
  } = props;
  const {colors} = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const isFlat = mode === 'flat';

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (isFlat) setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (isFlat) setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={{flex, width}}>
      <When condition={isFlat}>
        <Content>
          <AppText
            variant="medium"
            size={14}
            textTransform="uppercase"
            color={colors.onBackground}>
            {label}
          </AppText>
          <Spacer left={8}>
            <AppText variant="italic" size={12} color={colors.outline}>
              {hint}
            </AppText>
          </Spacer>
        </Content>
        <Spacer bottom={8} />
      </When>

      <PaperTextInput
        {...rest}
        isFlat={isFlat}
        isFocused={isFocused}
        label={!isFlat ? label : ''}
        mode={mode}
        outlineColor={colors.outline}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        selectionColor={colors.outline}
        textColor={colors.onBackground}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default InputField;
