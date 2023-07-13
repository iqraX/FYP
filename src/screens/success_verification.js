import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import details from './details';
import home from './home';
console.disableYellowBox = true;


class success_verification extends React.Component{

  state = {
      type: '',
      no: '',
     
   }

	render(){
		const {navigation,route}=this.props;
    /* 2. Get the param 
        const {type} = route.params;*/
        this.state.type = navigation.getParam('type');
        this.state.no= navigation.getParam('no');
        
  return (
 
    <View style={styles.container}>
    <View style={styles.inner}>
    <Image source={require('./image/check.png')} style={styles.check} />

    <Text style={styles.h1}>Verified!</Text>
    <Text style={styles.h2}>You have successfully verified{"\n"} your phone number.</Text>

    <View style={styles.button_container}>


    <TouchableOpacity style={styles.button} onPress={() => {
         	this.props.navigation.navigate('details',{
             type:this.state.type,
             no:this.state.no
         	});
         }}>
    <Text style={{color:'white', fontSize: 18, fontWeight:'bold',left:40, top:10}}>PROCEED</Text>
     
    </TouchableOpacity>
    </View>

    </View>
        </View>

  );
}
}
export default success_verification;

const styles = StyleSheet.create({

	container:{
          backgroundColor: '#0063B2FF',
          height:"100%",
  },
  inner:{
    
    width:"92%",
    backgroundColor: '#FFFFFF',
    height: "92%",
    left: 16,
    top:39,
  },
	check:{
		width:250,
		height:150,
		top:70,
		left:40,
	},
	h1:{
		fontSize:35,
		left:95,
		top:100
	},
	h2:{
      top:140,
      left:60,
      right:30,

	},
	button_container:{
		top:200,

	},
	button:{
		backgroundColor:'#9CC3D5FF',
		left:80,
		height:60,
		width:170
	}

	});
