import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput, TouchableOpacity ,Image,ImageBackground, Text, View, Button } from 'react-native';
import user_type from './user_type';
import Communications from 'react-native-communications';
console.disableYellowBox = true;

class contact extends React.Component {
	render(){
    return(

      <View>
      <View style={{height:'60%', backgroundColor: '#0063B2FF',top:-10}}>

      <Image style={{height:'100%', width:'100%'}} source={require('./image/contact.jpg')}  />

      </View>

      <View style={{flexDirection:'row', top:40}}>
      <Image style={{width:40, height:40, left:40}} source={require('./image/address.png')}  />
      <Text style={{ left:60, color:'#3b444b'}}
      >International Islamic University{"\n"} H-10, Islamabad, Pakistan</Text>
      </View>

       <View style={{flexDirection:'row', top:80}}>
      <Image style={{width:40, height:40, left:40}} source={require('./image/phone.png')}  />
      <Text style={{ left:60, color:'#3b444b', top:10}}
      >(0300)5113992</Text>
      </View>

      <View style={{flexDirection:'row', top:120}}>
      <Image style={{width:40, height:40, left:40}} source={require('./image/mail.png')}  />
      <View>
      <TouchableOpacity
       style={{left:60, top:10}}
          activeOpacity={0.7}
          
          onPress={() =>
            Communications.email(
              [
                'ambulance@gmail.com',
                
              ],
              null,
              null,
              '',
              '',
            )
          }>
          <Text style={{color:'#3b444b', textDecorationLine: 'underline', fontSize:15,fontWeight: 'bold'}}>
            Send an Email
          </Text>
        </TouchableOpacity>
        </View>
      </View>





      </View>  //parent

        
       /* <View>
    	<TouchableOpacity
          activeOpacity={0.7}
          
          onPress={() =>
            Communications.email(
              [
                'ambulance@gmail.com',
                
              ],
              null,
              null,
              '',
              '',
            )
          }>
          <Text >
            Send an Email
          </Text>
        </TouchableOpacity>
        </View>*/




    	);

	}
}

export default contact;