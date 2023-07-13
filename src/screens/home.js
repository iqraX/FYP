import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  TouchableOpacity
} from "react-native";
import MapView from "react-native-maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import { Rating, AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
console.disableYellowBox = true;


export default class home extends Component {

  constructor() {

     super();

    global.driverlat=0.00;
    global.driverlong=0.00;
  }


  state =  {

      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },
      locationChosen: false,
      random_no:0,
      message:'',
      visible:false,
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });

  };

  

shouldComponentUpdate(nextProps, nextState) {
  return true;
}





  getdrivers = () => {

    const url= "https://se.getnokri.com/fyp4/public/api/getdrivers?latitude="
      +this.state.latitude+"&longitude"
      +this.state.longitude;

      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {

        
          
      }
    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    console.log(err);
    alert("Fetching the Position failed, please pick one manually!");
  })
  }

 async getId(){

     const tmpmail = await AsyncStorage.getItem('email');
       const tmpemail= mail.replace(/"/g, '');
       
        const url="https://se.getnokri.com/fyp4/public/api/user-details?email="+tmpemail;
        axios
        .post(url)
      .then(function (response) {
         
        // handle success
        if(response.data.status===200)
        {
          
          id= parseInt(response.data.id);
          
        }

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })

  }


componentWillMount(){

   
   this.getId();
   this.getLocationHandler();
   this.getdrivers();


}



componentDidMount(){


}


  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker title='This is you' coordinate={this.state.focusedLocation } />;
    }
    

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}


        </MapView>

        <View style={{paddingTop:15}}>

        <TouchableOpacity style={styles.onbutton}
       onPress={() => {
          this.props.navigation.navigate('book',{
             latitude:this.state.focusedLocation.latitude,
             longitude:this.state.focusedLocation.longitude
          });

          

         }}>
        <Text style={{top:10,fontSize:20, color:'white',fontWeight: 'bold'}}
        >Get AMBULANCE</Text></TouchableOpacity>
        </View>

        {/*Dialog POPUP*/}
      <View style={styles.modal}>
  <Dialog
   visible={this.state.visible}
   rounded
  actionsBordered
    
   
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}

    dialogTitle={<DialogTitle title="" />}
   
>

    <DialogContent>
     
     <Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>
    </DialogContent>
  </Dialog>
</View>

        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 560
  },

   modal:{
    left:20,
    paddingTop: 20,
    //height:400,
    //width: 100,

  },

  button: {
    margin: 8
  },
  onbutton: {
    backgroundColor:  '#0063B2FF',
    fontSize: 20,
    width:290,
    height:60,
     alignItems: "center",

     paddingBottom:20
  }
});