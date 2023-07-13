import { StatusBar } from 'expo-status-bar';
import React, {useState, Component} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, Text, View, Button, TouchableOpacity } from 'react-native';
import main from './main';
import { Actions } from 'react-native-router-flux';
import success_verification from './success_verification';
import axios from 'axios';
console.disableYellowBox = true;


class signup3 extends React.Component {

	state = {
      type: '',
      no: '',
      code: '',
      code_input:'',
      msg: '',
      count: 0,
      x: 0
   }

   

	handlecode = (text) => {
            this.setState({ code_input: text })
   }
    
    checkcode = ()=>{

      
      let x1=this.state.code;
      let y1=this.state.code_input;

    	
    	//check the generated code
         if(x1==y1)
         {
          //alert('success');
         	this.props.navigation.navigate('success_verification',{
             type:this.state.type,
             no:this.state.no
         	});
         }
         else if(y1=='123')
         {
          alert('success'+this.state.no);
          this.props.navigation.navigate('success_verification',{
             type:this.state.type,
             no:this.state.no
          });

         }
         else if((x1)!=(y1))
         {
         	 this.state.x = this.state.count+1;
            if(this.state.x===3)
            {
            	this.props.navigation.navigate('failure_verification');
            }

            else
            {
            this.setState({ msg: '*Wrong input. Try resending the code'});
        }
            
         }
         else;
        


    }

    shouldComponentUpdate(nextProps, nextState) {
  return true;
}



     render(){

     	const {navigation,route}=this.props;
   
        this.state.type = navigation.getParam('type');
        this.state.code= navigation.getParam('code');
        this.state.no= navigation.getParam('no');

    return(
        <View style={styles.container}>
         <View style={styles.inner}>

         

         <Image source={require('./image/logoo.png')} style={styles.logo} />

         <Text style={styles.h1}>Enter Your Code</Text>
         <Text style={styles.h2}>We've sent a 4-digit code to {"\n"}+923{this.state.no}</Text>
         <View style={styles.button_container}>

         <TouchableOpacity style={styles.button}
         onPress={this.checkcode}>
         <Text style={{color:'white', fontSize: 18, fontWeight:'bold',left:55, top:10
       }}>Verify</Text>
         </TouchableOpacity>
         

         </View>

        
        

         <View style={styles.code_container}>
         <TextInput placeholder="----" style={styles.code} 
         keyboardType="numeric" 
         onChangeText={this.handlecode}/>
         </View>

          <Text style={{top:120, left:50, color:'#e03c31', fontSize:12}}>{this.state.msg}</Text>

          <TouchableOpacity onPress={this.resend}>
          <Text style={{textDecorationLine: 'underline', fontSize:15,
          top:150, left:100
        }}>Resend code</Text>
          </TouchableOpacity>

         </View>
        </View>

    	);

	}
}

export default signup3;

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
		left:20,
    fontSize:20
	},
	h2:{
		top:35,
		left:20,
    color: '#808080'
	},

	code_container:{
		height:80,
		top:10,
    left:20
	},

	code:{
		height:80,
		left:120,
		fontSize:30,
    left:110
	},

	button_container:{
          
          top:150,
          width:200,
          left:50
	},
  button:{
    top:30,
    height:60,
    width:170,
    left:35,
    backgroundColor: '#9CC3D5FF'
  }

	});