import React, { Component } from 'react';
import { Alert, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image } from 'react-native';
console.disableYellowBox = true;

class ExpandableListView extends Component {

  constructor() {
    super();
    this.state = {
      layoutHeight: 0
    }
  }

  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.item.expanded) {
      this.setState(() => {
        return {
          layoutHeight: null
        }
      });
    }
    else {
      this.setState(() => {
        return {
          layoutHeight: 0
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  

  render() {
    return (
      <View style={styles.panelContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickFunction} style={styles.categoryView}>
          <Text style={styles.categoryText}>{this.props.item.category} </Text>
          <Image
            source={require('./image/down.png')}
            style={styles.iconStyle} />
        </TouchableOpacity>
        <View style={{ height: this.state.layoutHeight, overflow: 'hidden' }}>
          {
            this.props.item.subCategory.map((item, key) => (
              <TouchableOpacity key={key} style={styles.subCategoryText} >
                <Text> {item.name} </Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    );
  }
}


export default class help extends Component {
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    // create array to contain Expandable ListView items & create a State named as accordionData and store the array in this State
    const array = [
      {
         expanded: false, category: "How do I get a new password?", subCategory: [{ id: 1, name: 'Once the account is created you can change your password in future goto to menu bar (upper left corner) and in menu list you will see Edit Account, Click on the that and change your passsword.you can change your name as well (Email Id IS PERMANENT you cannot change that.) ' },]
       },

        {
         expanded: false, category: "Can I change my Email Id?", subCategory: [{ id: 2, name: 'No,You can not change Your Email id once the account is created.' },]
       },

        {
         expanded: false, category: "Can I retrieve my deleted account?", subCategory: [{ id: 3, name: 'No, Account once deleted can not be retrieve.' },]
       },

        {
         expanded: false, category: "How to Delete an account?", subCategory: [{ id: 4, name: 'If You want to delete Your account goto menu bar showing at the left upper corner (Icon having 3 bars) Goto settings. there you will see the ACCOUNT DELETE option' },]
       },

       {
         expanded: false, category: "How to Add the Current Location?", subCategory: [{ id: 5, name: 'You can add your location manually and if you want that application automatically pick your current location then goto your mobile settings and enables the location.' },]
       },

       {
         expanded: false, category: "How to Edit the profile?", subCategory: [{ id: 6, name: 'Goto menu bar showing at the left upper corner. In menu bar you can see the option Edit Account.' },]
       },

       {
         expanded: false, category: "Who can See my Profile?", subCategory: [{ id: 7, name: 'Only You can see your profile.When you book your ride after that your location and your number will be shown to the Driver' },]
       },

       {
         expanded: false, category: "Can I see my previous Rides?", subCategory: [{ id: 8, name: 'YES! you can see Your previous rides. Your history will be maintained. ' },]
       },

        {
         expanded: false, category: "How Can I track the Amublance?", subCategory: [{ id: 9, name: 'On the home page you will see the google Map.After booking the Ride you can see the driver location on that Map and can locate your driver and afterwards can track the ambulance where are you going.' },]
       },

        {
         expanded: false, category: "if I logout After Booking the Ride Can Driver still locate me?", subCategory: [{ id: 10, name: 'NO! if you logout your account the driver will be unable to see you.and the ride will be cancelled unfortunately.' },]
       },

       {
         expanded: false, category: "How the Ride bill is generated?", subCategory: [{ id: 11, name: 'The Bill is generated according to the distance/km the ride covered.' },]
       },

       {
         expanded: false, category: "How do I Know I booked the Ambulance", subCategory: [{ id: 12, name: 'After finding Your driver when you press on CONFIRM button you will be able to see the drivers location. if you can see the ambulance location and drivers number that means your ride is boooked and is on its way.' },]
       },

       {
         expanded: false, category: "How to contact us for any query", subCategory: [{ id: 13, name: 'If you want to contact us.You can mail us on (ambulance@gmail.com) or can visit us on Instagram (Amublance on call).' },]
       }
       ];
    this.state = { accordionData: [...array] }
  }

  // enable layout animation, toggle 'expanded' state for index and then update the layout
  updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.accordionData];
    array[index]['expanded'] = !array[index]['expanded'];
    this.setState(() => {
      return {
        accordionData: array
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          {
            this.state.accordionData.map((item, key) =>
              (
                <ExpandableListView key={item.category} onClickFunction={this.updateLayout.bind(this, key)} item={item} />
              ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#F5FCFF',
  },
  iconStyle: {
    width: 15,
    height: 15,
    right:20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //tintColor: '#CAE7DF',
  },
  subCategoryText: {
    fontSize: 18,
    color: '#000',
    padding: 10
  },
  categoryText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 15,
    padding: 15
  },
  categoryView: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0063B2FF'
  },
  Btn: {
    padding: 10,
    backgroundColor: '#F49F1C'
  }
});








 



