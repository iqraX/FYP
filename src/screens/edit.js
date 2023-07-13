import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, Text, View, Button, CheckBox,TouchableOpacity } from 'react-native';
import edit_name from './edit_name';
console.disableYellowBox = true;
class edit extends React.Component {

	

     render(){
    return(
         <View>
         <View style={styles.upper}>
          <Image source={require('./image/edit.jpg')} style={styles.icon} />
         </View>
         
         <TouchableOpacity onPress={() => {
         	this.props.navigation.navigate('edit_name', {kind : 'First Name'});
         }}
         >
         <Text style={styles.heading}>First Name</Text>
         <Text style={styles.data}>{first}</Text>
         <View style={styles.line}/>
         </TouchableOpacity>
         
         <TouchableOpacity onPress={() => {
         	this.props.navigation.navigate('edit_name', {kind : 'Last Name'});
         }}>
         <Text style={styles.heading}>Last Name</Text>
         <Text style={styles.data}>{last}</Text>
         <View style={styles.line}/>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => {
         	this.props.navigation.navigate('edit_name', {kind : 'Phone Number'});
         }}>
         <Text style={styles.heading}>Phone Number</Text>
         <Text style={styles.data}>{no}</Text>
         <View style={styles.line}/>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => {
         	this.props.navigation.navigate('edit_name', {kind : 'Email'});
         }}>
         <Text style={styles.heading}>Email</Text>
         <Text style={styles.data}>{email}</Text>
         <View style={styles.line}/>
         </TouchableOpacity>

         

         </View>

    );
}
}
export default edit;

const styles = StyleSheet.create({

	upper:{
		
		height: 140,
	},
	icon:{
		height: 140,
		width:150,
		top:10,
		left:10
	},
	heading:{
		top:20,
        color: '#a6a6a6',
        left:25,
	},
	data:{
		height:70,
        top:45,
        left:30

	},
	line:{
		 borderBottomColor: '#d3d3d3',
             borderBottomWidth: 1,
             left:10,
             right:10,
             width:330
	}

	});