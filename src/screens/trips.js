import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput, TouchableOpacity ,Image,ImageBackground, Text, View, Button } from 'react-native';
import user_type from './user_type';
import axios from 'axios';
console.disableYellowBox = true;

class trips extends React.Component {


state = {
	trips:[],
     
   }

   shouldComponentUpdate(nextProps, nextState) {
  return true;
}

   componentWillMount(){

    let x='';

               	const url="https://se.getnokri.com/fyp4/public/api/trips?id="
      +id+"&type="+type;

      axios
      .post(url)
      .then((response) => {
         console.log("response");
        
        if (response.data.status == 200) {
          
           console.log("response200");
           this.setState({ trips: response.data.trips });
          // alert(JSON.stringify(this.state.trips[0]));

          
      }
      else
       console.log("failed response");
    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });

}

	render(){

     const displaytrips = this.state.trips.map((data) => {
    return (
      <View style={{top:20}}><Text>"Destination "{data.location}{"\n"}" Rider_id "{data.rider_id}{"\n"}
      "DateTime "{data.created_at}{"\n"}{"\n"}{"\n"}

      </Text></View>
    )
  })

      

    return(

<View>
<View >
{displaytrips}


</View>
</View>
      
        
    	
    	);

	}
}

export default trips;