/* eslint-disable react/no-unstable-nested-components */

import React, {useState} from 'react';
import {includes, propOr} from 'ramda';
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
import {showToast} from 'Utils';

const MAX_CONTESTANT_COUNT = 25;

interface ISelectContestantsSheet {
  onActivatePolling: (contestants: TStandardObject[]) => void;
}

const SelectContestantsSheet = (props: ISelectContestantsSheet) => {
  const {onActivatePolling} = props;

  const [selectedContestants, setSelectedContestants] = useState<
    TStandardObject[]
  >([]);

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

  const onUserItemPress = (user: TStandardObject) => {
    if (includes(user, selectedContestants)) {
      setSelectedContestants([
        ...selectedContestants.filter(
          contestant => contestant.value !== user.value,
        ),
      ]);
    } else {
      if (selectedContestants.length < MAX_CONTESTANT_COUNT)
        setSelectedContestants([...selectedContestants, user]);
      else
        showToast(
          `You can only select at max ${MAX_CONTESTANT_COUNT} Contestants`,
          'Error',
          'error',
        );
    }
  };

  const onLoadMoreData = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = ({item}: {item: TStandardObject}) => {
    return (
      <ListItem
        item={item}
        onPress={() => onUserItemPress(item)}
        isSelected={includes(item, selectedContestants)}
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
      <When condition={!isLoading && selectedContestants.length > 1}>
        <Spacer horizontal={16} bottom={40}>
          <AppButton
            mode="contained"
            onPress={() => onActivatePolling(selectedContestants)}>
            Activate Polling
          </AppButton>
        </Spacer>
      </When>
    </Flex>
  );
};

export default SelectContestantsSheet;
