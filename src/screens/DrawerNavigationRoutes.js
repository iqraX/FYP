
import React, { Component } from 'react';
// import all basic components as follows
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
import Screen1 from './home';
import Screen2 from './trips';
import Screen3 from './edit';
import Screen4 from './help';
import Screen5 from './contact';
import Screen6 from './setting';
import Screen7 from './book';
console.disableYellowBox = true;

 
//Import Custom Sidebar component
import CustomMenuSidebar from './CustomMenuSidebar';

global.backgroundColor = '#9CC3D5FF';
 
 
//Navigation Drawer button Structure for all screen
class NavigationDrawerButton extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View>
      <StatusBar backgroundColor='#1562b0' barStyle='light-content' /> 
      <View style={{ flexDirection: 'row' }}>
       
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./image/bar.png')}
            style={{ width: 25, height: 25, marginLeft: 15 }}
          />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
 
//First Option of Navigation Drawer
const FirstOption_StackNavigator = createStackNavigator({
  
  First: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerLeft: <NavigationDrawerButton navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#9CC3D5FF'
      },
      headerTintColor: '#9CC3D5FF',
    }),
  },

});
 
//Second Option of Navigation Drawer
const Second_StackNavigator = createStackNavigator({
 
  Second: {
    screen: Screen2,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Trips',
      headerLeft: <NavigationDrawerButton navigationProps={navigation} />,
 
      headerStyle: {
        backgroundColor: '#9CC3D5FF',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Third Option of Navigation Drawer
const Third_StackNavigator = createStackNavigator({
 
  Second: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Account',
      headerLeft: <NavigationDrawerButton navigationProps={navigation} />,
 
      headerStyle: {
        backgroundColor: '#9CC3D5FF',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Fourth_StackNavigator = createStackNavigator({
  
  First: {
    screen: Screen4,
    navigationOptions: ({ navigation }) => ({
      title: 'Help',
      headerLeft: <NavigationDrawerButton navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#9CC3D5FF',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Fifth_StackNavigator = createStackNavigator({
  
  First: {
    screen: Screen5,
    navigationOptions: ({ navigation }) => ({
      title: 'Contact Us',
      headerLeft: <NavigationDrawerButton navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#9CC3D5FF',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Sixth_StackNavigator = createStackNavigator({
  
  First: {
    screen: Screen6,
    navigationOptions: ({ navigation }) => ({
      title: 'Setting',
      headerLeft: <NavigationDrawerButton navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#9CC3D5FF',
      },
      headerTintColor: '#fff',
    }),
  },
});




 
//----------------------------------Define screens using createDrawerNavigator------------------------
//Drawer Navigator Which will provide the structure of our App
const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    homeScreen: {
      screen: FirstOption_StackNavigator,
     
    },

   
    tripScreen:{
      screen: Second_StackNavigator
    },
    editScreen: {
      screen: Third_StackNavigator,
     
    },
    helpScreen: {
      screen: Fourth_StackNavigator,
     
    }
    ,
    contactScreen: {
      screen: Fifth_StackNavigator,
     
    },
    settingScreen: {
      screen: Sixth_StackNavigator,
     
    },

   
   
  },
  {
    //Custom sidebar menu we have to provide our CustomMenuSidebar
    contentComponent: CustomMenuSidebar,
    //Set sidebar width 
    drawerWidth: Dimensions.get('window').width - 130,
  }
);
export default createAppContainer(DrawerNavigator);