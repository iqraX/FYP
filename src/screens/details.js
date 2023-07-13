
import React, {useState, Component} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ValidationComponent from 'react-native-form-validator';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import MyView from './MyView';
console.disableYellowBox = true;



class details extends Component {

    state = {
      
        first: '',
        last:'',
        email: '',
        password: '',
        no: '',
        type:'',
        isLoading: "",
        error1:"a",
        error2:"b",
        error3:"c",
        isHidden1:true,
        isHidden2:true,
        isHidden3:true,
        visible:false,
      
      msg: "",
    };
  
  
	

    handlefirst = (text) => {
            this.setState({ first: text, isHidden1:true,error1:'' })
   }

    handlelast = (text) => {
            this.setState({ last: text })
   }

    handlepassword = (text) => {
            this.setState({ password: text,isHidden3:true,error2:'' });
            
   }

   handlemail = (text) => {
            this.setState({ email: text, isHidden2:true,error3:'' });
            
   }


   shouldComponentUpdate(nextProps, nextState) {
  return true;
}

   validatemail=()=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(this.state.email) === false) {
    this.setState({error2:"*Incorrect email format"});
    this.setState({isHidden2:false});
    return 1;
    
  }
  else 
    return 0;

 

   }

   onsubmit=()=>{

    let check=0;
   
    this.setState({isHidden2:true, isHidden1:true, isHidden3:true});

     if(this.state.first==='')
     { 
      this.setState({error1:"*First name is required", isHidden1:false});
       check=1;
     }

    if(this.state.email==='')
     { this.setState({error2:"*Email is required", isHidden2:false});
       check=1;
     }
    else
      check=this.validatemail();


    if(this.state.password==='')
     { 
      this.setState({error3:"*Password is required", isHidden3:false});
       check=1;
     }
    else{

      if((this.state.password.toString().length)<8)
        {
          this.setState({error3:"*Password must be at least 8 characters long",isHidden3:false});
          check=1;

    }

    }

    if(check==0)
       this.signup();
     else;


   }

   
    signup=()=>{

      this.setState({ isLoading: true,  });

      if(this.state.type=='rider'){

       const url= "http://se.getnokri.com/fyp4/public/api/user-signup?first="
      +this.state.first+ "&last="+ this.state.last+ "&password="
      +this.state.password+ "&email="
      +this.state.email+ "&type="
      +this.state.type+ "&no="
      +this.state.no;


  console.log("starting request");
    axios
      .post(url)
      .then((response) => {

        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({

            msg: response.data.message,

            
          });

          console.log(this.state.msg);
         // let temp=JSON.stringify(this.state.msg);
          
          this.setState({visible:true});
          this.props.navigation.navigate('login', { messagee: 'registered'});
        
      }
                                              
       else if (response.data.status == "failed") {
          this.setState({ msg: response.data.message });
          alert(response.data.message);
          
        }

      
    })
  
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
            this.state.msg=error.response;
        } else {
            
            console.log('Error', error.message);
        }
      });

     }

     else if(this.state.type=='driver')
     {

       const url= "http://se.getnokri.com/fyp4/public/api/checkemail?email="
      +this.state.email;

    axios
      .post(url)
      .then((response) => {

        if (response.data.status === 200) {
          

          this.props.navigation.navigate('car_details',{
            first: this.state.first,
            last: this.state.last,
            password: this.state.password,
            email: this.state.email,
            no: this.state.no,
          });
        
      }

       else if (response.data.status == "failed") {
        
          this.setState({ msg: response.data.message });
          alert(response.data.message);
          
        }

      
    })
  
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
            this.state.msg=error.response;
        } else {
            
            console.log('Error', error.message);
        }
      });


      
     }

     

    
};



     render(){

      const {navigation,route}=this.props;
    // 2. Get the param 
       
        this.state.type = navigation.getParam('type');
        this.state.no= navigation.getParam('no');


     	



    return(
    	<View style={styles.container}>
         <View style={styles.inner}>
         <Image source={require('./image/logoo.png')} style={styles.logo} />
         
       
         <View style={styles.container2}>
         <Text style={styles.h1}>What is your name?</Text>

         <View style={{flexDirection:"row", top:20, fontSize:16}}>
         <View style={styles.first}>
         <TextInput placeholder="First" 
         onChangeText={this.handlefirst}
         />
         </View>
         <View style={styles.last}>
         <TextInput placeholder="Last"
         onChangeText={this.handlelast}
          />

         </View>
         </View>

          <MyView style={{top:15}} hide={this.state.isHidden1}>
        

        <Text style={{color:'red', fontSize:13, top:10}}>{this.state.error1}</Text>
        </MyView>
        
        <View style={styles.container3}>
        <Text style={styles.h1}>Create your account password</Text>
        <TextInput placeholder="Make it secure"
        onChangeText={this.handlepassword} secureTextEntry={true}
         style={styles.password}/>
        </View>

         <MyView style={{top:70}} hide={this.state.isHidden3}>
        

        <Text style={{color:'red', fontSize:13, top:10}}>{this.state.error3}</Text>
        </MyView>

        <View style={styles.container3}>
        <Text style={styles.h1}>{"\n\n\n"}Your Email</Text>
        <TextInput placeholder="Email Address"
        onChangeText={this.handlemail}
         style={styles.password}/>
        </View>

         <MyView style={{top:75}} hide={this.state.isHidden2}>
        

        <Text style={{color:'red', fontSize:13, top:10}}>{this.state.error2}</Text>
        </MyView>
        
         </View>


         <View style={styles.button_container}>



        <TouchableOpacity style={styles.button}  onPress={this.onsubmit}  >
        <Text style={{color:'white', fontSize: 18, fontWeight:'bold',left:40, top:10
       }}>CONTINUE</Text>
        </TouchableOpacity>

        
      


                

        
        </View>

        


         </View>
         </View>


         );

	}
}



export default details;

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

	container2:{
		left:40,
	},

	first:{
		width:60,
    fontSize:16
	},

	last:{
		width:60,
		left:80,
    fontSize:16
	},
	container3:{
		top:60
	},
	password:{
		top:20,
    fontSize:16,
    //position:'absolute'
	},

   modal:{
    left:20,
    paddingTop: 20,
    //height:400,
    //width: 100,

  },

  button:{
    top:15,
    height:50,
    width:170,
    left:0,
    backgroundColor: '#FC6A03'
  },

	button_container:{
          
          top:140,
          width:150,
          left:80
	},

  h1:{
    fontSize:16
  }

});