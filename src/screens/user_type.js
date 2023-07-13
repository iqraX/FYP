import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, TouchableOpacity, Text, View, Button } from 'react-native';
import signup2 from './signup2';
console.disableYellowBox = true;


class user_type extends React.Component {
     render(){
    return(

    	<View style={styles.container}>
         <View style={styles.inner}>
         <Image source={require('./image/logoo.png')} style={styles.logo} />
         <Text style={styles.h1}>Pick your role</Text>

         <View style={{ flexDirection: 'row', top:30}}>

         <TouchableOpacity 
         onPress={() => {
         	this.props.navigation.navigate('signup2',{
             type:'rider'
         	});
         }}
         >
         <Image source={ require('./image/rider.png')} style={styles.rider}/>
         </TouchableOpacity>

         <TouchableOpacity 
         style={{left:20}}
         onPress={() => {
         	this.props.navigation.navigate('signup2',{
         		type: 'driver'
         	});
         }}
         >
         <Image source={ require('./image/driver.jpg')} style={styles.driver}/>
         </TouchableOpacity>
         </View>

         <View style={{ flexDirection: 'row', top:30}}>
         <TouchableOpacity onPress={() =>{this.props.navigation.navigate('signup2',{
         		type: 'rider'
         	});
     }}>
         <Text style={styles.txt1}> RIDER</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('signup2',{
         		type: 'driver'
         	});
     }}

         >
         <Text style={styles.txt2}> DRIVER</Text>
         </TouchableOpacity>

         </View>

         <Text style={styles.footnote}>Drivers can only be designated professionals.</Text>
 


         </View>
        </View>

    	);

	}
}

export default user_type;

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
	logo:{
		height: 180,
		width:200,
		left:60,
	},

	h1:{
		fontSize:20,
		left:30
	},

	rider:{
		top:30,
		left:30,
		width:100,
		height:100
	},

	driver:{
		top:30,
		left:60,
		width:100,
		height:100
	},
	txt1:{
		top: 50,
		left:40,
		fontSize:20
	},
	txt2:{
		top: 50,
		left:120,
		fontSize:20
	},
	footnote:{
		top:300,
		fontSize:10,
		left:52
	}

		});