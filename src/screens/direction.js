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

const LATITUDE_DELTA=0.0122;
 const LONGITUDE_DELTA=Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122

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

      destination: {
        latitude:33.6992,
        longitude:73.0534,
        latitudeDelta:0.0122,
        longitudeDelta:
        Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122,
      },

      destinationLocation:'',

      locationChosen: true,
      firstTime:true,
      ride_id:0,
      tracking:false,
      direction:null,
      notification_shown:false,
      firstViewButton:false,      //show acceptdecline buttons
      secondViewButton:true,      //hide cancelRide button
      thirdViewButton:true,       //hide startride
      button_text:'Start Ride',
      type:0,

      
  }

  componentWillMount(){

        this.getLocationHandler();
        this.timer = setInterval(()=> this.saveLocation(),5000);
       // this.timer = setInterval


  
 
}

componentDidMount(){

 const {navigation,route}=this.props;
        this.state.destination = navigation.getParam('riderLocation');
        this.state.ride_id= navigation.getParam('ride_id');


}

 getLocationHandler = () => {

  //aalert('inside getLocationHandler');
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

     var dis = getDistance(
      {latitude: this.state.focusedLocation.latitude, longitude: this.state.focusedLocation.longitude},
      {latitude: coords.latitude, longitude: coords.longitude},

    );

     if((dis>9)||(this.state.firstTime===true)) // only change focusedLocation if screen 
                                     //just loaded or if user has moved atleast 10m
     {

   
      this.setState({firstTime:false});

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

  }

  }; 

accept =() => {

  this.setState({secondViewButton:false, firstViewButton:true});

   this.setState({tracking:true});

      
        const url= "https://se.getnokri.com/fyp4/public/api/confirm?id="
      +id+"&ride_id="+this.state.ride_id+"&type=driver";

      axios
      .post(url)
      .then((response) => {
        
        this.setState({rider_id:response.data.rider_id});
         alert('Ride is booked. Follow the directions to reach the patient');
    })
    
       .catch((error) => {
       if (error.response) {

        alert(error.response);
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });
    
    this.setState({tracking:true});

     
   }


   reject=()=>{
       
       this.props.navigation.navigate('driver_home',{

            command:'refresh',
            
          });


   }

   endride=()=>{
    //end ride goes here
   }


   saveLocation(){

    if(this.state.tracking===true)
    {

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


       var dis = getDistance(
      {latitude: this.state.focusedLocation.latitude, longitude: this.state.focusedLocation.longitude},
      {latitude: this.state.destination.latitude, longitude: this.state.destination.longitude},

    );
       if((dis<50)&&(this.state.notification_shown===false))
        {

          this.setState({notification_shown:true, tracking:false});

            alert('You have arrived! Wait for your rider');
          this.props.navigation.navigate('waitforRider',{

            riderLocation:this.state.destination,
            ride_id:this.state.ride_id,
            
          });
        }


}
}




  render() {
        

    let marker = null;
    let destination_marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} >
      <Image source={require('./image/ambulance.png')} style={{height: 35, width:35 }}/>
      </MapView.Marker>;
    }

    if(this.state.destination.latitude!=0.00)
    {
      
      destination_marker= <MapView.Marker pinColor={'orange'} coordinate={ this.state.destination } />;
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

        <MapViewDirections
          
          origin={{
                latitude: this.state.focusedLocation.latitude,
                longitude: this.state.focusedLocation.longitude
              }}
              destination={{
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude
              }}
          
          apikey={'AIzaSyBTQU7mVIoAgU5Kof1IfMAQ3MtnfxGp_-Q'} // insert your API Key here
          strokeWidth={4}
          strokeColor="black"
        />

          {marker}
          {destination_marker}
  

        </MapView>

        <MyView hide={this.state.firstViewButton} >
         
         <View style={{flexDirection:'row'}}  >        
        <TouchableOpacity style={styles.accept}
        onPress={this.accept}>
        <Text style={{top:10,fontSize:17, color:'white',fontWeight: 'bold'}}
        >Accept</Text></TouchableOpacity>

        <TouchableOpacity style={styles.reject}
        onPress={this.reject}>
        <Text style={{top:10,fontSize:17, color:'white',fontWeight: 'bold'}}
        >Decline</Text></TouchableOpacity>
        </View>

        </MyView>

        <MyView hide={this.state.secondViewButton} >
         
         <View style={{flexDirection:'row'}}  >        

        <TouchableOpacity style={styles.cancel}
        onPress={this.reject}>
        <Text style={{top:10,fontSize:18, color:'white',fontWeight: 'bold'}}
        >Cancel Ride</Text></TouchableOpacity>
        </View>

        </MyView>

        <MyView hide={this.state.thirdViewButton} >
         
         <View style={{flexDirection:'row'}}  >        

        <TouchableOpacity style={styles.startride}
        onPress={this.endride}>
        <Text style={{top:10,fontSize:18, color:'white',fontWeight: 'bold'}}
        >{this.state.button_text}</Text></TouchableOpacity>
        </View>

        </MyView>



     

        
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

  cancel: {
       width:'95%',
       backgroundColor:  '#B22222',
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