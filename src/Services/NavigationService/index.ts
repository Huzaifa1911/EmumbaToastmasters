import {
  CommonActions,
  createNavigationContainerRef,
  DrawerActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 * Navigation Function to navigate between screens
 * @param {string} route | route name for screen
 * @param {Record<string, unknown>} params | params to send to screens
 */
const navigate = (route: string, params?: Record<string, unknown>) => {
  try {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.navigate({
          name: route,
          params,
        }),
      );
    }
  } catch (error) {}
};

/**
 * Navigation Function to go back
 */

const goBack = () => {
  try {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    } else {
    }
  } catch (error) {}
};

/**
 * Helper Function to Open Drawer
 */
const openDrawer = () => {
  try {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.openDrawer());
    }
  } catch (error) {}
};

/**
 * Helper Function to Close Drawer
 */
const closeDrawer = () => {
  try {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.closeDrawer());
    }
  } catch (error) {}
};

export default {navigate, goBack, navigationRef, openDrawer, closeDrawer};
