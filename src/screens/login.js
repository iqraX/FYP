import { StatusBar } from 'expo-status-bar';
import React, {useState, Component} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, Text, View, Button, CheckBox, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import home from './home';
import driver_home from './driver_home';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
console.disableYellowBox = true;
import MyView from './MyView';

class login extends React.Component {

  state = {
      
        //id: 0,
        email :'',
        password: '',
        msg:'',
        check:'' ,
        type:'',
        message:'',
        visible:false,
        error1:"a",
        error2:"b",
        isHidden1:true,
        isHidden2:true,
       
      };




      
    handlepassword = (text) => {
            this.setState({ password: text, isHidden2:true,error2:'' });
            
   }
    handlemail = (text) => {
            this.setState({ email: text, isHidden1:true,error1:'' });

            
   }

   async setemail() {

    //alert('SETEMAIL @LOGIN'+this.state.email)

    await AsyncStorage.setItem('email', JSON.stringify(this.state.email));
    email1=this.state.email;
    const url= "https://se.getnokri.com/fyp4/public/api/user-details?email="
      +this.state.email;

      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {
         console.log(response.data.message);

         typee=response.data.type;
         id= parseInt(response.data.id);
         
          
      }
      else if (response.data.status === 'failed') {
         console.log(response.data.message);
          
      }
    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });
    
    console.log("inside login setting value"+this.state.email);

   }

   move=()=>{
    this.props.navigation.navigate('signup2');
   }

   onsubmit = () =>{

     let check=0;
   
    this.setState({isHidden2:true, isHidden1:true});

    if(this.state.email==='')
     { this.setState({error1:"*Email is required", isHidden1:false});
       check=1;
     }

     if(this.state.password==='')
     { 
      this.setState({error2:"*Password is required", isHidden2:false});
       check=1;
     }

       if(check==0)
       this.handlelogin();
     else;

   }

   componentDidMount(){
   const {navigation,route}=this.props;
       var temp = navigation.getParam('messagee');
       if(temp=='registered')
        this.setState({visible:true});

    }

   shouldComponentUpdate(nextProps, nextState) {

  return true;
}

   

   

     handlelogin =  () => {

             const url= "https://se.getnokri.com/fyp4/public/api/user-login?email="
      +this.state.email+ "&password="
      +this.state.password;

      //this.setState({email:url});

      axios
      .post(url)
      .then((response) => {
         //this.setState({email:'inside post'});

        this.setState({ isLoading: false });
        if (response.data.status === 200) {
         
          this.setState({
            msg: response.data.message,
            id: response.data.id,
            type: response.data.type,

           
          });

          
         this.setemail();
          //this.call();
          //await AsyncStorage.setItem('email', JSON.stringify(this.state.email));
          //AsyncStorage.setItem('type', JSON.stringify(this.state.type));

           

         if (this.state.type=== 'rider')
          { 
            
            this.props.navigation.navigate('home',{

            email:this.state.email,
            message: 'rating'
            
          });
        
      }
         else if(this.state.type === 'driver')
          {
            
            this.props.navigation.navigate('driver_home',{

            email:this.state.email
            
          });
           
          }

          
        }

        else if (response.data.status === "failed") {

          alert(response.data.message);
         
          
        }

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

      //alert(temp);



    return(
      <View style={styles.container}>
         <View style={styles.inner}>
         <Image source={require('./image/logoo.png')} style={styles.logo} />

         <View style={styles.container2}>
         <Text style={styles.h1}>Log In</Text>
         <View>
         <TextInput placeholder="Email "
        style={{ left:20, fontSize:17, width:'65%', height:50, top:35, borderWidth: 1, padding:10,
 
 borderColor: '#0063B2FF',
 borderRadius: 12 ,
 backgroundColor : "#FAF9F8"}}

         onChangeText={this.handlemail}/>
         </View>

          <MyView style={{top:35,left:10}} hide={this.state.isHidden1}>
        <Text style={{color:'red', fontSize:13, top:10}}>{this.state.error1}</Text>
        </MyView>
        
        <View>
         <TextInput placeholder="Password"
        style={{top:60, left:20, fontSize:17,width:'65%',
      height:50, borderWidth: 1, padding:10,
 
 borderColor: '#0063B2FF',
 borderRadius: 12 ,
 backgroundColor : "#FAF9F8"}}

         secureTextEntry={true}
         onChangeText={this.handlepassword}/>
         </View>

          <MyView style={{top:55, left:10}} hide={this.state.isHidden2}>
        <Text style={{color:'red', fontSize:13, top:10}}>{this.state.error2}</Text>
        </MyView>

         <TouchableOpacity style={styles.button}
         onPress={this.onsubmit}>
         <Text style={{color:'white', fontSize: 18, fontWeight:'bold',textAlign:'center'
       }}>Log In</Text>
         </TouchableOpacity>

        

        <Text style={styles.midtext}>OR</Text>
        

        <View style={styles.button_container2}>

        <TouchableOpacity style={styles.button2}
         onPress={this.move}>
         <Text style={{color:'#0063B2FF', fontSize: 18, fontWeight:'bold',left:40, top:10}}>
         Create an Account
         </Text>
         </TouchableOpacity>


        
        </View>

         </View>

          {/*Dialog POPUP*/}
      <View style={styles.modal}>
  <Dialog
   visible={this.state.visible}
   rounded
  actionsBordered
    
   
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}

    dialogTitle={<DialogTitle title="Registration done!" />}
   
>

    <DialogContent>
     
     <Text style={{top:10, textAlign: 'center', fontSize:18, 
     paddingBottom:23, color:'#676767',
     paddingLeft:20,
     paddingRight:20,paddingTop:10
   }}>
      You can now login
      </Text>
     
    </DialogContent>
  </Dialog>
</View>


         </View>
         </View>


         );

  }

}

export default login;

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
    top:30,
    height: 80,
    width:200,
    left:60,
  },
  h1:{
    fontSize:20,
  },

  container2:{

    top:70,
        left:30
  },
  button_container:{
          
          top:80,
          width:100,
          left:60
  },
  button_container2:{
          
          top:130,
          width:170,
          left:30
  },
  midtext:{
    fontSize:20,
     top:165,
     left:90
    },


  modal:{
    left:20,
    paddingTop: 20,
    //height:400,
    //width: 100,

  },

    button:{
    top:100,
    height:50,
    width:'40%',
    padding:10,
    left:55,
    backgroundColor: '#FC6A03'
  },

   button2:{
    top:50,
    height:50,
    width:170,
    left:-30,
    
    backgroundColor: 'white'
  }


  });