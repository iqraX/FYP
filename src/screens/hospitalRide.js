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
      tracking:true,
      direction:null,
      notification_shown:false,
      isHidden:true,
    

      
  }

  componentWillMount(){

        this.getLocationHandler();
        this.timer = setInterval(()=> this.saveLocation(),5000);


  
 
}

componentDidMount(){

 const {navigation,route}=this.props;
        this.state.destinationLocation = navigation.getParam('location');
        this.state.ride_id= navigation.getParam('ride_id');

        //alert(this.state.destinationLocation+this.state.ride_id);

        //Getting coordinates of hospital
         const url= "https://se.getnokri.com/fyp4/public/api/getcoords?location="
      +this.state.destinationLocation;

      axios
      .post(url)
      .then(async(response) => {
        
        if (response.data.status === 200) {

         await  
          this.setState({destination:
            {longitude: parseFloat(response.data.longitude),
             latitude: parseFloat(response.data.latitude),
              longitudeDelta:LONGITUDE_DELTA, latitudeDelta:LATITUDE_DELTA
           }});

          

          
      }

      //alert(this.state.destination.longitude+this.state.destination.latitude+response.data.status);

    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
            
        } else {
            
            console.log('Error', error.message);

        }
      });

       console.log('NEW VALUES '+this.state.destinationLocation+this.state.destination);


}

shouldComponentUpdate(nextProps, nextState) {
  return true;
}


GenerateRandomNumber=()=>
{

var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
return RandomNumber;

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
                                     //just loaded or if user has moved atleast 10m (limit the use of DirectonsAPI)
     {

     // alert('channging the position');
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
   

   endride=()=>{

    alert('Ending the ride!');

    const url= "https://se.getnokri.com/fyp4/public/api/changeStatus?id="
      +this.state.ride_id+ "&status=passive";

      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {
         console.log(response.data.message);
          this.props.navigation.navigate('driver_home');

          
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

       //alert(dis+this.state.notification_shown);
       if((dis<50)&&(this.state.notification_shown==false))
        {

          this.setState({notification_shown:true, tracking:false});

            alert('You have arrived at the hospital') ;
            this.setState({isHidden:false});
            //alert(this.state.isHidden);
            


        }


}
}




  render() {

        

    let marker = null;
    let destination_marker = null;


      marker = <MapView.Marker coordinate={this.state.focusedLocation} >
      <Image source={require('./image/ambulance.png')} style={{height: 35, width:35 }}/>
      </MapView.Marker>;
    

    if(this.state.destination.latitude!=0.00)
    {
      
      destination_marker= <MapView.Marker 
      pinColor={'orange'}
      key={ this.GenerateRandomNumber() }
       coordinate={ this.state.destination } />;
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

        

        <MyView hide={this.state.isHidden}  >
         
         <View style={{flexDirection:'row'}}  >        

        <TouchableOpacity style={styles.startride}
        onPress={this.endride}>
        <Text style={{top:10,fontSize:18, color:'white',fontWeight: 'bold'}}
        >End Ride</Text></TouchableOpacity>
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
    height: "92%"
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