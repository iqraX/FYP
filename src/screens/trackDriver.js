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

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {getDistance} from 'geolib';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
console.disableYellowBox = true;

 //var driverlat=0.0;
 //var driverlong=0.0;
 
 const LATITUDE_DELTA=0.0122;
 const LONGITUDE_DELTA=Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122;
 

export default class trackDriver extends Component {

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

       driverLocation: {

        latitude: 33.623907033520936,
        longitude: 73.1088886409998,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122

      },

      visible:false,
      tracking:true,
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
      phone:'034409560471'
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


GenerateRandomNumber=()=>
{

var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
return RandomNumber;

}



  getDriverLocation=()=>{
     
      
      //const { coordinate } = this.state;

      if((this.state.driver_id!=0)&&(this.state.tracking===true))
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
           this.setState({driverLocation:
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
      {latitude: this.state.focusedLocation.latitude, longitude: this.state.focusedLocation.longitude},
      {latitude: this.state.driverLocation.latitude, longitude: this.state.driverLocation.longitude},

    );
       if((dis<50)&&(this.state.notification_shown===false))
        {  
          alert('Your ambulance has arrived! Find it');
          this.setState({notification_shown:true, tracking:false});
          this.startRide()
          
        }
    }

  }

  showdialog=()=>{

    this.setState({visible:true});

  }

startRide=()=>{

  if(this.state.tracking===false){

    console.log('startRide');

     const url="https://se.getnokri.com/fyp4/public/api/rideInfo?ride_id="+this.state.ride_id;
        axios
        .post(url)
      .then(async(response)=> {
         
        // handle success
        if(response.data.status===200)
        {
          if(response.data.ride_status=='driving')       //waiting to start the ride
              this.props.navigation.navigate('startRide',{

            destination: response.data.rideInfo.location,
            ride_id:this.state.ride_id,
            driver_id:this.state.driver_id,
            
          });

            else if(response.data.ride_status=='cancelled')
            {
              alert('Ride has been cancelled');
              this.props.navigation.navigate('home',{

                  no:this.GenerateRandomNumber(),
                  
                 });
            }
          
        }

        //alert(JSON.stringify(response.data));

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
    



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


componentWillMount(){

  const {navigation,route}=this.props;
        this.state.driver_id = navigation.getParam('driver_id');
        this.state.ride_id= navigation.getParam('ride_id');

   console.log('componentWillMount');
       
       this.getDriverInfo();
       this.getLocationHandler();

  this.timer = setInterval(()=> this.getDriverLocation(),5000);
  this.timer = setInterval(()=> this.startRide(),5000);


}

getDriverInfo(){

   const url="https://se.getnokri.com/fyp4/public/api/getcarInfo?driver_id="+this.state.driver_id;
        axios
        .post(url)
      .then(async(response)=> {
         
        // handle success
        if(response.data.status===200)
        {
  
           this.setState({
               model: response.data.model,
               color:response.data.color,
               numberPlate:response.data.numberPlate,
               car_type:response.data.type 
           });
        }

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });

       //END OF CAR INFO

       const url1="https://se.getnokri.com/fyp4/public/api/getDetail?id="+this.state.driver_id;
        axios
        .post(url1)
      .then(async(response)=> {
         
        // handle success
        if(response.data.status===200)
        {
  
           this.setState({
               name: response.data.name,
               phone:response.data.phone
           });
        }

      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });

}

  render() {

    

        console.log('STATE'+this.state.driverLocation.latitude +' '+this.state.driverLocation.longitude);


    let marker = null;
     let driver_marker= null;
      marker = <MapView.Marker title='This is you' coordinate={this.state.focusedLocation } />;
        

        driver_marker = <MapView.Marker
         key={ this.GenerateRandomNumber() }
       coordinate={this.state.driverLocation}                                   
       title={"Your driver"}
       >
      <Image source={require('./image/ambulance.png')} style={{height: 35, width:35 }}/>
     </MapView.Marker>
      
   
    

    return (
      <View style={styles.container}>
        <MapView
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
                latitude: this.state.driverLocation.latitude,
                longitude: this.state.driverLocation.longitude
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
        

        <Text style={{fontSize:16, left:80, top:10}}>{this.state.color+" \n"+this.state.model+"\n"+this.state.numberPlate}</Text>
        
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
    
   
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}

    dialogTitle={<DialogTitle title="" />}
   
>

    <DialogContent>
     
     <View style={{flexDirection:'row'}}>
        <Text  style={{ fontWeight: 'bold' }}>{this.state.name+"\n"+this.state.phone}</Text>
        <Text>{this.state.color+this.state.model}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
        <Text >{this.state.phone}</Text>
        <Text>{this.state.numberPlate}</Text>
        </View>
     
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

   modal:{
    left:20,
    paddingTop: 20,
    //height:400,
    //width: 100,

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