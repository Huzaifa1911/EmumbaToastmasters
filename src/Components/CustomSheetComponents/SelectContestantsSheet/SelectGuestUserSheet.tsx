/* eslint-disable react/no-unstable-nested-components */

import React, {useState} from 'react';
import {equals, propOr} from 'ramda';
import {When} from 'react-if';

import {
  AppActivityIndicator,
  AppButton,
  AppSearchbar,
  BlankState,
  Spacer,
} from 'Components';
import {UsersList} from './styles';
import {TStandardObject} from 'Types';
import ListItem from './Components/ListItem';
import {useGetAllParticipants} from 'Services';
import {Flex} from 'Styles';
import {isEmptyOrNill} from 'Utils';

const INITIAL_STATE: TStandardObject = {
  label: '',
  value: 0,
};

interface ISelectGuestUserSheet {
  onSelectGuestUser: (user: TStandardObject) => void;
}

const SelectGuestUserSheet = (props: ISelectGuestUserSheet) => {
  const {onSelectGuestUser} = props;

  const [guestUser, setGuestUser] = useState<TStandardObject>(INITIAL_STATE);

  const {
    data,
    isLoading,
    onSearch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetAllParticipants({
    showLoading: false,
  });
  const users: TStandardObject[] = propOr([], 'pages', data);

  const onLoadMoreData = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = ({item}: {item: TStandardObject}) => {
    return (
      <ListItem
        item={item}
        onPress={() => setGuestUser(item)}
        isSelected={equals(item, guestUser)}
      />
    );
  };

  return (
    <Flex>
      <Spacer horizontal={16}>
        <AppSearchbar onSearch={onSearch} />
      </Spacer>

      <UsersList
        data={users}
        keyExtractor={(item, index) => item.label + index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer top={5} />}
        onEndReached={onLoadMoreData}
        ListHeaderComponent={
          <AppActivityIndicator isLoading={isLoading} spacerProps={{top: 5}} />
        }
        ListFooterComponent={
          <AppActivityIndicator
            isLoading={isFetchingNextPage}
            spacerProps={{top: 15}}
          />
        }
        ListEmptyComponent={
          !(isLoading || isFetchingNextPage) ? (
            <BlankState
              label="No Users Found"
              infoText="There are no users available."
            />
          ) : null
        }
      />
      <When condition={!isLoading && !isEmptyOrNill(guestUser.label)}>
        <Spacer horizontal={16} bottom={40}>
          <AppButton
            mode="contained"
            onPress={() => onSelectGuestUser(guestUser)}>
            Next
          </AppButton>
        </Spacer>
      </When>
    </Flex>
  );
};

export default SelectGuestUserSheet;
