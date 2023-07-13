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

import MapViewDirections from 'react-native-maps-directions';

import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';

import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {getDistance} from 'geolib';
import axios from 'axios';
console.disableYellowBox = true;

 //var driverlat=0.0;
 //var driverlong=0.0;
 
 const LATITUDE_DELTA=0.0122;
 const LONGITUDE_DELTA=Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
 

export default class startRide extends Component {





  state =  {

      destination: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },

       userLocation: {

        latitude: 33.623907033520936,
        longitude: 73.1088886409998,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122

      },

      
      tracking:true,
      visible:false,
      notification_shown:false,
      locationChosen: true,
      driver_id: 0,
      ride_id: 0,
      marker_id:0,
      model:'Honda Civic',
      color:'White',
      numberPlate:'XYZ-123',
      car_type:'ALS',
      name:'Iqra Jehangir',
      phone:'034409560471',
      location:''
  }


GenerateRandomNumber=()=>
{

var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
return RandomNumber;

}


shouldComponentUpdate(nextProps, nextState) {
  return true;
}


ratingCompleted=(rating)=>{
 
   const url= "https://se.getnokri.com/fyp4/public/api/rateDriver?user_id="
      +this.state.driver_id+"&rating="+rating;

      axios
      .post(url)
      .then(async(response) => {
        
        console.log(response);
    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
            
        } else {
            
            console.log('Error', error.message);

        }
      });

       this.setState({ visible:false});

       this.props.navigation.navigate('home');

        this.restart();

  

}



  getDriverLocation=()=>{
   

      if(this.state.tracking===true)
      {
     
     console.log('driverLocation'+this.state.driver_id);
      
    const url="https://se.getnokri.com/fyp4/public/api/getlocation?driver_id="+this.state.driver_id;
        axios
        .post(url)
      .then(async(response)=> {
         
        // handle success
        if(response.data.status===200)
        {
           console.log("res",response.data);
         
         var driverlong= parseFloat(response.data.driverlong);
         var driverlat= parseFloat(response.data.driverlat);

           await  
           this.setState({userLocation:
            {longitude: driverlong,
             latitude: driverlat,
              longitudeDelta:LONGITUDE_DELTA, latitudeDelta:LATITUDE_DELTA
           }});

        


          
        }

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });


       var dis = getDistance(
      {latitude: this.state.userLocation.latitude, longitude: this.state.userLocation.longitude},
      {latitude: this.state.destination.latitude, longitude: this.state.destination.longitude},

    );
       if((dis<80)&&(this.state.notification_shown===false))
        {  
          alert('You are at the hospital!');
          this.setState({notification_shown:true, tracking:false, visible:true});
          //this.props.navigation.navigate('home',{message: 'rating', driver_id: this.state.driver_id});
          //this.startRide()
          
        }
    }

  }


  /* animate() {
  
    const newCoordinate = {
      latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
      longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
    };

    if (Platform.OS === 'android') {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }*/

  getDestination=()=>{

    console.log('\n\nGET DESTINATION'+this.state.location);
    const url= "https://se.getnokri.com/fyp4/public/api/getcoords?location="
      +this.state.location;

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

      //alert("SEETHOS"+this.state.destination.longitude+this.state.destination.latitude+response.data.status);

    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
            
        } else {
            
            console.log('Error', error.message);

        }
      });

      //z console.log('NEW VALUES '+this.state.destinationLocation+this.state.destination);
  }


componentWillMount(){


        //this.state.ride_id= navigation.getParam('ride_id');




  //this.timer = setInterval(()=> this.getDriverLocation(),5000);

}

restart=()=>{
  //this.setState({visible:false});
  this.setState({notification_shown:true, tracking:false, visible:false});
  this.props.navigation.navigate('home');
}

componentDidMount(){


        this.getDestination();
        //this.getDriverLocation();
        this.timer = setInterval(()=> this.getDriverLocation(),5000);

        
        

}



  render() {


    const {navigation,route}=this.props;
    this.state.location=navigation.getParam('destination');
        this.state.driver_id = navigation.getParam('driver_id');

  
    let marker = null;
     let driver_marker= null;

      marker = <MapView.Marker title='Destination' coordinate={this.state.destination } />;
    
        driver_marker = <MapView.Marker
         key={ this.GenerateRandomNumber() }
       coordinate={this.state.userLocation}                                   
       title={"This is you"}
       >
      <Image source={require('./image/ambulance.png')} style={{height: 35, width:35 }}/>
     </MapView.Marker>
      
   
    

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.userLocation}
          region={!this.state.locationChosen ? this.state.userLocation : null}
          style={styles.map}
          ref={ref => this.map = ref}
        >
         <MapViewDirections
          
          origin={{
                latitude: this.state.userLocation.latitude,
                longitude: this.state.userLocation.longitude
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
          {driver_marker}


        </MapView>

          <TouchableOpacity style={styles.driver_info}
        onPress={this.showdialog}>
        <View style={styles.bottomDrawer}>
        
        <View style={{flexDirection:'row'}}>
        
        <Text  

        style={{ fontWeight: 'bold', fontSize:17, left:10, top:10   }}>

        {this.state.name}
        </Text>
        

        <Text style={{fontSize:16, left:60, top:10}}>{this.state.color+" \n"+this.state.model+"\n"+this.state.numberPlate}</Text>
        
        </View>

        <Text style={{top:-30,fontSize:14, left:13}}>{this.state.phone}</Text>
        
        </View>

        </TouchableOpacity>

         {/*Dialog POPUP*/}
      <View style={styles.modal}>
  <Dialog
   visible={this.state.visible}
   rounded
  actionsBordered
    
   
    onTouchOutside={this.restart}

    dialogTitle={<DialogTitle title="" />}
   
>

    <DialogContent>

    <Text style={{ fontSize:15, color:'#949494', top:15, bottom:10}}>
    Rate your driver
    </Text>
     
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

    bottomDrawer:{


    width:300,
    height:90,
    
     backgroundColor: "#E0E0E0",
     color:'#606060',
     borderColor:'#0063B2FF',
    borderWidth: 2,
    borderRadius: 20,
    borderTopRightRadius: 20,
    position:'absolute',
    left:-150

   // elevation: 10,


  },
  map: {
       width: "100%",
    height: "91%",
    position: 'relative',
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