import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ViewExpenses from '../screens/ViewExpenses';
import AddExpenses from '../screens/AddExpenses';
import ExpenseDetails from '../screens/ExpenseDetails';

export const AppStackNavigator = createStackNavigator(
  {
    ViewExpenses: {
      screen: ViewExpenses,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddExpenses: {
      screen: AddExpenses,
      navigationOptions: {
        headerShown: false,
      },
    },
    ExpenseDetails: {
      screen: ExpenseDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ViewExpenses',
  }
);
