import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import CustomSideBarMenu from './CustomSideBarMenu';
import { AppStackNavigator } from './AppStackNavigator';

import ViewExpenses from '../screens/ViewExpenses';
import SettingsScreen from '../screens/SettingsScreen';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppStackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name={'home'} type={'ionicons'} />,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: <Icon name={'settings'} type={'feather'} />,
      },
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: 'Home',
  }
);
