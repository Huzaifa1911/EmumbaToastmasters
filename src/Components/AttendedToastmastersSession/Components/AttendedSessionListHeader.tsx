import React from 'react';
import {Else, If, Then} from 'react-if';

import {ViewAllTextComponent, AppText, Spacer} from 'Components';
import {SCREENS} from 'Utils';
import {NavigationService} from 'Services';

const goToViewAllSessionScreen = () => NavigationService.navigate(SCREENS.VIEW_ALL_ATTENDED_SESSIONS_SCREEN);

const AttendedSessionListHeader = ({showViewAllComponent}: {showViewAllComponent: boolean}) => {
  return (
    <Spacer top={30} bottom={10}>
      <If condition={showViewAllComponent}>
        <Then>
          <ViewAllTextComponent label="Attended Sessions" onViewAllPress={goToViewAllSessionScreen} />
        </Then>
        <Else>
          <AppText size={18} variant="bold">
            Attended Sessions
          </AppText>
        </Else>
      </If>
    </Spacer>
  );
};

export default AttendedSessionListHeader;
