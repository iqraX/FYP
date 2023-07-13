import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput, TouchableOpacity ,Image,ImageBackground, Text, View, Button } from 'react-native';
import user_type from './user_type';
console.disableYellowBox = true;

class main extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
  return true;
}
    
  
    render(){
    return(

    <ImageBackground source={require('./image/background.jpeg')} style={styles.backgroundImage}>

    
    
    <View style={styles.button_container}>
    <View style={styles.image}>
    <Image source={require('./image/logooo.png')} />
    </View>


    <View style={styles.extra}>

    <TouchableOpacity style={styles.button1} onPress={() =>this.props.navigation.navigate('login', { messagee: 'login'})}>
    <Text style={{top:12}}>LOG IN</Text>
    </TouchableOpacity>
    

    
    <TouchableOpacity style={styles.button2} onPress={() =>this.props.navigation.navigate('user_type')}>
    <Text style={{top:12, fontWeight:'normal', color:'white'}}>REGISTER</Text>
    </TouchableOpacity>
    
    </View>

    </View>
    </ImageBackground>

    	);

	}
}

export default main;

	const styles = StyleSheet.create({

		backgroundImage:{
          flex: 1,
          resizeMode: 'cover',
           width: null,
    height: null,
		},

    button_container:{

      height: "100%",
       width:"100%",
      // textAlign:'center',
       //alignItems:'center',
       //paddingLeft:"20%",
       fontSize:26,
       backgroundColor: 'rgba( 0, 0, 0, 0.85 )'

    },

    button1:{
      left:20,
       fontSize:20,
       height:50,
       textAlign:'center',
       alignItems:'center',
       width:150,
       backgroundColor: "white"

    },

    button2:{
       left:30,
       fontSize:20,
       height:50,
       textAlign:'center',
       alignItems:'center',
       width:150,
       backgroundColor: "#0063B2FF",
       color: "#FFFFFF",
       fontWeight: 'bold'

    },
    extra:{
      top:400,
      flexDirection: "row",
      
      
    },
    image:{

      width:300,
      left:70,
      top:70
    }

		});