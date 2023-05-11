import {HomeScreen, LeaderBoardScreen, ProfileScreen} from 'Screens';
import {TBottomTabConfig} from 'Types';
import {SCREENS} from 'Utils';

export const BOTTOM_TABS: TBottomTabConfig[] = [
  {
    title: 'Home',
    name: SCREENS.HOME_SCREEN,
    component: HomeScreen,
    icon: {type: 'Entypo', name: 'home'},
  },
  {
    title: 'Leaderboard',
    name: SCREENS.LEADER_BOARD_SCREEN,
    component: LeaderBoardScreen,
    icon: {type: 'MaterialIcons', name: 'leaderboard'},
  },
  {
    title: 'Profile',
    name: SCREENS.PROFILE_SCREEN,
    component: ProfileScreen,
    icon: {type: 'MaterialIcons', name: 'person'},
  },
];
