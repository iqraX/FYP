import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
console.disableYellowBox = true;
 
// Define a variable for selected screen index
global.selectedScreenIndex = 0;
 
export default class CustomMenuSidebar extends Component {

  state = {
      
        
        msg:''
      };


  constructor() {

    
    super();

    global.mail='';
    global.email='';
    global.first='';
    global.last='';
    global.no='';
    global.type='';
    
    // OptionsList which will used in map loop in render method 
    this.optionsList = [
      {
        navOptionIcon: 'home',
        navOptionTitle: 'Home',
        screenToNavigate: 'homeScreen',
      },
      {
        navOptionIcon: 'airport-shuttle',
        navOptionTitle: 'Your Trips',
        screenToNavigate: 'tripScreen',
      },
      {
        navOptionIcon: 'person',
        navOptionTitle: 'Edit Account',
        screenToNavigate: 'editScreen',
      },
      {
        navOptionIcon: 'help',
        navOptionTitle: 'Help',
        screenToNavigate: 'helpScreen',
      },
      {
        navOptionIcon: 'mail',
        navOptionTitle: 'Contact Us',
        screenToNavigate: 'contactScreen',
      },
      {
        navOptionIcon: 'settings',
        navOptionTitle: 'Settings',
        screenToNavigate: 'settingScreen',
      },
       {
        navOptionIcon: 'logout',
        navOptionTitle: 'Log Out',
        screenToNavigate: '',
      }
      

    ];
  }

   /*async _getStorageValue = () => {
             const value = await AsyncStorage.getItem('email');
             return value;
}
*/

shouldComponentUpdate(nextProps, nextState) {
  return true;
}

logout=()=>{

  /*if(type==='rider')
  {
    const url="https://se.getnokri.com/fyp4/public/api/logout?type=rider&user_id="+id;
        axios
        .post(url)
      .then(function (response) {

         AsyncStorage.clear();
        this.props.navigation.navigate('main');
         

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })


  }

  else if(type==='driver')
  {

    const url="https://se.getnokri.com/fyp4/public/api/logout?type=driver&user_id="+id;
        axios
        .post(url)
      .then(function (response) {*/

         AsyncStorage.clear();
        this.props.navigation.navigate('main');
         

      /*})
      .catch(function (error) {
        // handle error
        alert(error.message);
      })

  }

  else;*/
}

  async componentWillMount(){

        
        mail = await AsyncStorage.getItem('email');
        email= mail.replace(/"/g, '');
       
        const url="https://se.getnokri.com/fyp4/public/api/user-details?email="+email;
        axios
        .post(url)
      .then(function (response) {
         
        // handle success
        if(response.data.status===200)
        {
          
          first= response.data.first;
          last= response.data.last;
          no= response.data.phone;
          //id= parseInt(response.data.id);
          type= response.data.type;
          

        }

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })

      }

      


  render() {
    return (
      <View style={styles.containerSideMenu}>
      <View>
        {/*Navigation Bar header  Image */}
        <Image
          source={require('./image/icon.png')}
          style={styles.headerStyle}
        />

        <Text style={{color:'white', fontSize:15, left:40}}>{first+id}</Text>
        </View>
        {/*Divider between header Image and options*/}
        <View
          style={{
            width: '100%',
            height: 2,
            backgroundColor: '#e2e2e2',
            marginTop: 15,

          }}
        />
        {/*Setting up Navigation Options from jsonArray using loop*/}
        <View style={{ width: '100%' }}>
          {this.optionsList.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.selectedScreenIndex === key ? '#ffffff' : '#0063B2FF',
              }}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionIcon} size={25} color="#000000" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.selectedScreenIndex === key ? '#00203FFF' : '#9CC3D5FF',
                  fontWeight: global.selectedScreenIndex === key ? 'normal' : 'bold'
                }}
                onPress={() => {

                  if(item.navOptionTitle==='Log Out')
                  {
                     Alert.alert(
              'Logout',
              'Are you sure? You want to logout? All your rides will be cancelled',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {

                    this.logout();
                   
                  },
                },
              ],
              {cancelable: false},
            );
                  }
                  else
                  {
                  global.selectedScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }
                }}>
                {item.navOptionTitle}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
   headerStyle: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
  },
  containerSideMenu: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0063B2FF',
    alignItems: 'center',
    paddingTop: 20,
  }
 
});
