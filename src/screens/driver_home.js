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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import MyView from './MyView';
console.disableYellowBox = true;

export default class driver_home extends Component {


  state =  {

    tmpArray:[],
    visible:false,
    check:true,
    button_text:'Go Online',
      status: '',
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
        latitude:0.00,
        longitude:0.00,
        latitudeDelta:0.0122,
        longitudeDelta:
        Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122,
      },

      locationChosen: false,
      destination:'',
      email:'',
      count:0,
      
  }

 

  

  checkstatus=()=>{


    if(status==='')
    {
        const url= "https://se.getnokri.com/fyp4/public/api/checkstatus?user_id="
      +id;

      axios
      .post(url)
      .then((response) => {
       
      // alert("checkstatus response"+JSON.stringify(response));
        if(response.data.status==='online')
            {
              this.setState({button_text:'Go Offline'});
              status='online';
            }
       else if (response.data.status==='offline')
          {
              this.setState({button_text:'Go online'});
              status='offline';
            }
       else;
          
      
    })
    
       .catch((error) => {
       if (error.response) {

        //alert(JSON.stringify(error.response));
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });
    }



  }

 componentWillMount(){

  
  this.getLocationHandler();
  this.timer = setInterval(()=> this.saveLocation(),5000);
  this.timer = setInterval(()=> this.search(), 10000);

   
}

 getLocationHandler = () => {

  //this.checkstatus();

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
    if(this.state.count==0)
   { 
    alert("Fetching the Position failed, please pick one manually!");
     this.setState({count:1});
   }
  else;
  })

    //alert(this.state.count);
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

   saveLocation(){

    this.checkstatus();
 
 this.getLocationHandler();
 //alert('driver_home ID'+id+' EMAIL'+this.state.email);

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
            //alert(JSON.stringify(error.response));
            
        } else {
            
            console.log('Error', error.message);

        }
      });



};

  search(){

    if(status==='online')
    {

    if(this.state.check===true)
    {
       const url2= "https://se.getnokri.com/fyp4/public/api/checkrequest?lat="
      +this.state.focusedLocation.latitude+"&long="
      +this.state.focusedLocation.longitude+"&ride_id="
      +this.state.tmpArray.id;

      axios
      .post(url2)
      .then((response) => {
        
        if(response.data.status===200){
         console.log(response.data.message);

         
         this.setState({tmpArray:response.data.requests, check:false, });
          this.state.destination = (this.state.tmpArray.location).replace(/"/g,'');
          this.setState({visible:true});
         // this.setState({invisible:false });
          //alert('inside search'+this.state.invisible);
        

         //alert(JSON.stringify(this.state.tmpArray));

       

         

       }

       else;
    
      
    })
    
       .catch((error) => {
       if (error.response) {

            alert(JSON.stringify(error.response));
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      }); 

    }
   } 

  };

  button_handler =() => {

   
    const url= "https://se.getnokri.com/fyp4/public/api/online?user_id="
      +id;

      axios
      .post(url)
      .then((response) => {
        
         console.log(response.data.message);
         //alert(response.data.message);

        if(response.data.message==='online')
         {
          this.setState({ button_text:'Go Offline'});
          status='online';
          alert('You will now start seeing Requests!!');
        }
       else if (response.data.message==='offline')
         {
          this.setState({ button_text:'Go online'});
          status='offline';
          alert('All your current rides are canceled!');
        }
       else;
          
      
    })
    
       .catch((error) => {
       if (error.response) {

        alert(JSON.stringify(error.response));
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });

     

  
  }
 

 cancel=()=>{

    this.setState({visible:false, check:true});


 }

shouldComponentUpdate(nextProps, nextState) {
  return true;
}



 showlocation=()=>{

  this.setState({visible:false});

  let tmplat=JSON.stringify(this.state.tmpArray.latitude);
  tmplat= tmplat.replace(/"/g,'');
  //alert('tmplat'+tmplat);

  let tmplong=JSON.stringify(this.state.tmpArray.longitude);
  tmplong= tmplong.replace(/"/g,'');

  let ridesid= this.state.tmpArray.id;

  this.state.riderLocation.latitude= parseFloat(tmplat);
  this.state.riderLocation.longitude= parseFloat(tmplong);

  this.props.navigation.navigate('direction',{

            riderLocation:this.state.riderLocation,
            ride_id:ridesid
            
          });



 }



  render() {

    
    let marker = null;
    let rider_marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
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
  

        </MapView>
                   
        <TouchableOpacity style={styles.onbutton}
        onPress={this.button_handler}>
        <Text style={{top:10,fontSize:20, color:'white',fontWeight: 'bold'}}
        >{this.state.button_text}</Text></TouchableOpacity>

        

 <View style={styles.container}>
  <Dialog
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
    dialogTitle={<DialogTitle title="New request" />}

    >


    <DialogContent>
     <Text style={{fontSize:18, top:10, bottom:10,padding:10}}>{this.state.destination}</Text>

     <View style={{flexDirection:'row', top:20, bottom:40}}>

     <TouchableOpacity 
      style={{backgroundColor:'#B22222', width:'40%', height:50,left:15}}
     onPress={this.cancel}>
     <Text style={{color:'white',fontSize:13,left:24, top:12}}>CANCEL</Text>
        
        
        </TouchableOpacity>

      <TouchableOpacity
      style={{backgroundColor:'#0063B2FF',left:20, width:'48%', height:50}}
        onPress={this.showlocation}>

        <Text style={{color:'white',fontSize:15,left:20,top:12,fontWeight: 'bold'}}>Show location</Text>
       
      </TouchableOpacity>
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
  map: {
    width: "100%",
    height: 580
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