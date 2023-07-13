import React, { Component } from "react";
import MapViewDirections from 'react-native-maps-directions';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE }  from "react-native-maps";
import MyView from './MyView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import {getDistance} from 'geolib';
console.disableYellowBox = true;

export default class direction extends Component {


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

      riderLocation: {
        latitude:33.6992,
        longitude:73.0534,
        latitudeDelta:0.0122,
        longitudeDelta:
        Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122,
      },
    
      ride_id:0,
      rideInfo:null,
      destinationLocation:'',
     
  }

  componentWillMount(){

        this.getLocationHandler();
        this.timer = setInterval(()=> this.saveLocation(),10000);
      
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
    //alert("Fetching the Position failed, please pick one manually!");
  })
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
  
  //alert(JSON.stringify(this.state.focusedLocation));

  };

  componentDidMount(){


        const {navigation,route}=this.props;
        this.state.riderLocation = navigation.getParam('riderLocation');
        this.state.ride_id= navigation.getParam('ride_id');

  } 

  shouldComponentUpdate(nextProps, nextState) {
  return true;
}



   saveLocation(){

    

     this.getLocationHandler();

  const url= "https://se.getnokri.com/fyp4/public/api/location?longitude="
      +this.state.focusedLocation.longitude+ "&latitude="
      +this.state.focusedLocation.latitude+ "&user_id="
      +id;

      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {
         console.log(response.data.message);

          
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

startRide=()=>{

  const url= "https://se.getnokri.com/fyp4/public/api/changeStatus?ride_id="
      +this.state.ride_id+"&status=driving";

      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {

         console.log("status changed to driving");

      }
    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
            
        } else {
            
            console.log('Error', error.message);

        }
      });

   //END OF CHANGE STATUS REQUEST

  const url1= "https://se.getnokri.com/fyp4/public/api/rideInfo?ride_id="
      +this.state.ride_id;

      axios
      .post(url1)
      .then((response) => {
        
        if (response.data.status === 200) {

         console.log("\n\nSENDING THIS"+ response.data.location+ this.state.ride_id);

          this.props.navigation.navigate('hospitalRide',{
            
            ride_id:this.state.ride_id,
            location: response.data.location,
            
          });

          
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




  render() {

        

    let marker = null;
    let rider_marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} >
      <Image source={require('./image/ambulance.png')} style={{height: 35, width:35 }}/>
      </MapView.Marker>;
    }

    if(this.state.riderLocation.latitude!=0.00)
    {
      
      rider_marker= <MapView.Marker pinColor={'orange'} coordinate={ this.state.riderLocation } />;
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >

      
          {marker}
          {rider_marker}
  

        </MapView>

         
         <View style={{flexDirection:'row'}}  >        

        <TouchableOpacity style={styles.startride}
        onPress={this.startRide}>
        <Text style={{top:10,fontSize:18, color:'white',fontWeight: 'bold'}}
        >Start Ride</Text></TouchableOpacity>
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
    height: "90%"
  },
  button: {
    margin: 8
  },

 accept: {

    backgroundColor:  '#0063B2FF',
    width:"49%",
    height:60,
     alignItems: "center",

     paddingBottom:20
  },

  reject: {
    backgroundColor:  '#B22222',
    width:"49%",
    left:5,
    height:60,
    alignItems: "center",
    paddingBottom:20
  },

  startride: {
       width:'95%',
       backgroundColor:  '#0063B2FF',
       left:5,
       height:60,
       alignItems: "center",
       paddingBottom:20
  }


});