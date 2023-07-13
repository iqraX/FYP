import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, Text, View, Button,TouchableOpacity } from 'react-native';
import main from './main';
import signup3 from './signup3';
import user_type from './user_type';
import MyView from './MyView';
import axios from 'axios';
console.disableYellowBox = true;


class signup2 extends React.Component {


state = {
      type: '',
      no: '',
      isValid:true,
      error:'',
      code:'',
   }

   
	 handlenumber = (text) => {

            this.setState({ no:text })
   }

   shouldComponentUpdate(nextProps, nextState) {
  return true;
}

   send=()=>{
     
     if(this.state.no==='')
      this.setState({error:'Empty field',isValid:false});

    else{

      if (isNaN(this.state.no)) 
        this.setState({error:'Invalid number',isValid:false});

      else if((this.state.no.toString().length)!=9)
        this.setState({error:'Invalid number',isValid:false});

      else
      {
        this.setState({isValid:true});


         //COMMENT OUT THIS CODE TO SEND THE CODE
          this.props.navigation.navigate('signup3',{
            type: this.state.type,
            no:this.state.no,
            code:'1234',
            
          });

          //DECOMMENT THIS PART

       /* const url= "http://se.getnokri.com/fyp4/public/api/save_code?number="+('923'+this.state.no);
       
        axios
      .post(url)
      .then((response) => {

        if (response.data.status === 'success') {
          this.setState({

           code:response.data.code
            
          });

         

           this.props.navigation.navigate('signup3',{
            type: this.state.type,
            no:this.state.no,
            code:this.state.code

          });

         
        
      }

      else{
        alert("error"+response.data.status+JSON.stringify(response.data.error)+this.state.no);
      }

        

      
    })
  
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
            alert("error response"+JSON.stringify(error.response));
            this.state.msg=error.response;

        } else {
            
            console.log('Error', error.message);
            alert("error message"+JSON.stringify(error.message));
        }
      });*/






      }

    }


   }
   
     render(){
     	const {navigation,route}=this.props;

        this.state.type = navigation.getParam('type');

        

    return(

    	


    	<View style={styles.container}>
         <View style={styles.inner}>
         <Image source={require('./image/logoo.png')} style={styles.logo} />
         
         <Text style={styles.h2}>Enter Your mobile number to create an account</Text>
        

         <View style={{flexDirection:'row'}}>
         <TextInput style={styles.phone} value=" +923" editable={false} />
         <TextInput style={styles.phone2} keyboardType="numeric" 
         onChangeText={this.handlenumber}
         placeholder="">
        </TextInput>
        </View>
        
        <View style={styles.button_container}>

        <MyView hide={this.state.isValid}>
        

        <Text style={{color:'red', fontSize:13, top:10}}>{"*"+this.state.error}</Text>
        </MyView>

        <TouchableOpacity style={styles.button}
         onPress={this.send}>
         <Text style={{color:'white', fontSize: 18, fontWeight:'bold',left:40, top:10
       }}>Continue</Text>
         </TouchableOpacity>

         


        
        </View>

        <Text style={styles.note}>
        You should recieve an SMS for verification.
        {"\n"} Message and data rates may apply.
        </Text>

        <Text style={styles.note}>
        {"\n\n\n\n\n\n\n\n\n"}By signing up you have agreed to our</Text>

        <Text style={styles.note1}>
        Terms of use & Privacy policy</Text>

         </View>
        </View>

    	);

	}
}

export default signup2;

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
	},
	h2:{
		top:10,
		left:20,
    fontSize:15
	},
	
	phone:{

    fontSize:18,
    color:'black',
		top:50,
		left:50,
		height:70,
		bottom:50,
    borderWidth:0.3,
    width:65,
     borderColor: '#808080'
		
		
	},
  phone2:{

    fontSize:18,
    top:50,
    left:60,
    height:70,
    bottom:50,
    borderWidth:0.3,
    borderColor: '#808080',
    width:170
    
    
  },


	button_container:{
          
          top:50,
          width:200,
          left:50
	},

	note:{
		top:140,
		left:75,
		right:50,
		fontSize:10,
		color:'#808080',
	},
	note1:{
		top:140,
		left:80,
		right:50,
		fontSize:10,
		
	},

  button:{
    top:60,
    height:50,
    width:170,
    left:35,
    backgroundColor: '#9CC3D5FF'
  }



		});