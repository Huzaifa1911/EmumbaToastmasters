import React from 'react';
import {AppText, Spacer} from 'Components';

const Header = () => {
  return (
    <Spacer top={30} horizontal={16} bottom={13}>
      <AppText size={20} variant="bold">
        Voting Polls
      </AppText>
    </Spacer>
  );
};

export default Header;
