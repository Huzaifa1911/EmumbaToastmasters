import {View} from 'react-native';
import React, {useState} from 'react';
import {Searchbar, SearchbarProps} from 'react-native-paper';
import {When} from 'react-if';

import AppText, {IAppTextProps} from '../AppText';
import {useDebounce} from 'Utils';
import {Spacer} from 'Components';

interface IAppSearchbarProps
  extends Omit<SearchbarProps, 'onChangeText' | 'value' | 'theme'> {
  label?: string;
  labelProps?: IAppTextProps;
  flex?: number;

  onSearch: (text: string) => void;
}

const AppSearchbar = (props: IAppSearchbarProps) => {
  const {label, labelProps, flex, onSearch, ...searchBarProps} = props;

  const [search, setSearch] = useState('');

  const debounceSearch = useDebounce(onSearch);

  const onChangeText = (text: string) => {
    setSearch(text);
    debounceSearch(text);
  };

  return (
    <View style={{flex}}>
      <When condition={label}>
        <AppText size={14} variant="medium" {...labelProps}>
          {label}
        </AppText>
      </When>

      <Spacer bottom={8} />
      <Searchbar
        value={search}
        onChangeText={onChangeText}
        {...searchBarProps}
      />
    </View>
  );
};

export default AppSearchbar;
