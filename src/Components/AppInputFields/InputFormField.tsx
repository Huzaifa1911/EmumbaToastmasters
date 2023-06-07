import React from 'react';

import {Controller, useFormContext} from 'react-hook-form';

import {ErrorText} from 'Components';
import InputField, {IAppInputFieldProps} from './InputField';

interface IAppInputFormFieldProps
  extends Omit<IAppInputFieldProps, 'onChangeText' | 'value'> {
  name: string;
}

const InputFormField = (props: IAppInputFormFieldProps) => {
  const {name, ...rest} = props;
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const message = errors[name]?.message as string;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}}) => (
          <InputField onChangeText={onChange} value={value} {...rest} />
        )}
      />
      <ErrorText message={message} spacerProps={{top: 5, left: 2}} />
    </>
  );
};

export default InputFormField;
