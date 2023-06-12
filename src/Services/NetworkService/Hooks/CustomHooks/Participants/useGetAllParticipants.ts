import {propOr} from 'ramda';
import {useCallback, useState} from 'react';

import {TShowLoading, TStandardObject, TUser} from 'Types';
import {useAppInfiniteQuery} from '../../GenericHooks';
import {API_HELPERS} from 'Services';

const getSearchNameParams = (search: string) => {
  const searchKeys = search.split(' ');

  switch (searchKeys.length) {
    case 1:
      return {first_name: searchKeys[0]};
    case 2:
      return {first_name: searchKeys[0], last_name: searchKeys[1]};
    default:
      return {first_name: searchKeys[0]};
  }
};

const select = (data: TUser[]): TStandardObject[] => {
  return data.map(user => ({
    label: `${propOr('', 'first_name', user)} ${propOr('', 'last_name', user)}`,
    value: propOr(0, 'id', user) as number,
  }));
};

export const useGetAllParticipants = ({showLoading = false}: TShowLoading) => {
  const [search, setSearch] = useState('');

  const onSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const query = useAppInfiniteQuery({
    queryFn: async ({pageParam = 1}) =>
      await API_HELPERS.getAllUsers({
        params: {page: pageParam, ...(search && getSearchNameParams(search))},
      }),
    queryKey: ['ALL_USERS', search],
    showLoading,
    select,
  });
  return {...query, onSearch};
};
