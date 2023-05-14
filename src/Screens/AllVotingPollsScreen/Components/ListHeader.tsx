import React from 'react';
import {AppText, Spacer} from 'Components';

const ListHeader = () => {
  return (
    <Spacer bottom={13}>
      <AppText size={20} variant="bold">
        Active Voting Poll
      </AppText>
    </Spacer>
  );
};

export default ListHeader;
