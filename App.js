
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  StatusBar
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import DrawerNavigationRoutes from './src/screens/DrawerNavigationRoutes';
import signup2 from './src/screens/signup2';
import login from './src/screens/login';
import main from './src/screens/main';
import user_type from './src/screens/user_type';
import signup3 from './src/screens/signup3';
import success_verification from './src/screens/success_verification';
import edit from './src/screens/edit';
import details from './src/screens/details';
import car_details from './src/screens/car_details';
import splash from './src/screens/splash';
import edit_name from './src/screens/edit_name';
import DriverDrawerNavigationRoutes from './src/screens/DrawerNavigationRoutesDriver';
import book from './src/screens/book';
import direction from './src/screens/direction';
import waitforRider from './src/screens/waitforRider';
import trackDriver from './src/screens/trackDriver';
import hospitalRide from './src/screens/hospitalRide';
import startRide from './src/screens/startRide';



const LoginStack = createStackNavigator({

   splash:{
    screen: splash,
    navigationOptions: {
    
      
    },
  },

  main:{
    screen: main,
    navigationOptions: {
    
      
    },
  },

  user_type:{
    screen: user_type,
    navigationOptions: {
      headerTitle: 'Settings List',
    },
  },

  signup2: {
    screen: signup2,
    navigationOptions: {
      headerTitle: 'Settings List',
    },
  },
  signup3: {
    screen: signup3,
    navigationOptions: {
      headerTitle: 'Settings List',
    },
  },
  success_verification:{
    screen: success_verification,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Settings List',
    },
  },

  login: {
    screen: login,
    navigationOptions: {
      headerTitle: 'Profile',

    },
  },

  direction: {
    screen: direction,
    navigationOptions: {
      headerTitle: 'Direction',

    },
  },

   startRide: {
    
    screen: startRide,
    navigationOptions: {
      headerTitle: 'Direction',

    },
  },


  trackDriver: {

    screen: trackDriver,
    navigationOptions: {
      headerTitle: 'Direction',

    },
  },

  hospitalRide: {

    screen: hospitalRide,
    navigationOptions: {
      headerTitle: 'Direction',

    },
  },

  waitforRider: {
    screen: waitforRider,
    navigationOptions: {
      headerTitle: 'Direction',

    },
  },

  details: {
    screen: details,
    navigationOptions: {
      headerTitle: 'Profile',

    },
  },

   car_details: {
    screen: car_details,
    navigationOptions: {
      headerTitle: 'Profile',

    },
  },


   book: {
    screen: book,
    navigationOptions: {
      
      headerTitle: 'Settings List',
    },
  },

  home:{
    screen: DrawerNavigationRoutes,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Settings List',
    },
  },

    driver_home:{
    screen: DriverDrawerNavigationRoutes,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Settings List',
    },
  },

  edit_name:{
    screen:edit_name,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Settings List',
    },
  }


},{
    defaultNavigationOptions: {
      header: null,
    },
  }
  );

  const AppNavigator = createAppContainer(LoginStack);

  const App = () => {

    

  return (
    <AppNavigator/>
    );
}
  



export default App;



