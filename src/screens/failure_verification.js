import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, Text, View, Button } from 'react-native';
console.disableYellowBox = true;



class failure_verification extends React.Component {
     render(){
    return(

    	<View style={styles.container}>
         <View style={styles.inner}>
         <Image source={require('./image/logo.jpg')} style={styles.logo} />

          <Text style={styles.h1}>Sorry!</Text>
    <Text style={styles.h2}>There is some problem in{"\n"} verifying your phone number.</Text>

    <View style={styles.button_container}>

        <Button style={styles.button} title="Change phone number" / >
        
        </View>

    <View style={styles.button_container2}>

        <Button style={styles.button} title="Resend code" / >
        
        </View>

         </View>
        </View>

    	);

	}
}

export default failure_verification;

const styles = StyleSheet.create({

	container:{
          backgroundColor: '#79CDCD',
          height:"100%",
	},
	inner:{
		
		width:"82%",
		backgroundColor: '#FFFFFF',
		height: "90%",
		left: 30,
		top:30,
	},
	logo:{
		height: 180,
		width:200,
		left:60,
	},
	h1:{
		fontSize:30,
		left:100,
		
	},
	h2:{
      top:60,
      left:40,
      right:30,

	},
		button_container:{
          
          top:120,
          width:200,
          left:50
	},
	button_container2:{
          
          top:150,
          width:200,
          left:50
	},


			});