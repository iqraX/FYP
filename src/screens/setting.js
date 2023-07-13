import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput, TouchableOpacity ,Image,ImageBackground, Text, View, Button,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import axios from 'axios';
console.disableYellowBox = true;

class setting extends React.Component {

	state={

		stmt: '',
    visible: false,
    password:'',
    new_password: '',

	}



	delete =()=>{

			const url = 'https://se.getnokri.com/fyp4/public/api/delete?email='+email;
			 axios
             .post(url)
             .then((response) => {

             	Alert.alert(
              '',
              'Account Deleted',
              [
                
                {
                  text: 'Continue',
                  onPress: () => {
                      
                      AsyncStorage.clear();
                    this.props.navigation.navigate('main');

                  },
                },
              ],
              {cancelable: false},
            );



             })
             .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });

		

	}

  show= ()=>{

    this.setState({visible:true});
  }

  changepassword= ()=>{

    const url = 'https://se.getnokri.com/fyp4/public/api/changepassword?email='+email+
                '&password='+this.state.password+'&new_password='+
                 this.state.new_password;
       axios
             .post(url)
             .then((response) => {
               
               if(response.data.status===200)
               {
                this.setState({visible:false});
                alert('You have successfully changed your password');
              }

              else
              {
                 this.setState({visible:false});
                alert('Authentication failed');
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

   handlepassword = (text) => {
            this.setState({ password: text })
   }

    handlenewpassword = (text) => {
            this.setState({ new_password: text })
   }

   handledelete =()=>{ 

   

   	Alert.alert(
              'Delete Account',
              'Are you sure? You want to delete your account?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'YES',
                  onPress: () => {
                      
                      this.delete();

                  },
                },
              ],
              {cancelable: false},
            );

   	}

	render(){
    return(

      <View>

     <View>
      
    	<TouchableOpacity onPress={this.handledelete} style={styles.row}>
      <Image
          source={require('./image/delete.png')}
          style={styles.image}
          
        />
        <Text style={styles.options}>Delete My Account</Text>
        </TouchableOpacity>

        <View
        style={{
             borderBottomColor: '#808080',
             borderBottomWidth: 1,
             top:16
         }}
        />
        
        
        
        <TouchableOpacity onPress={this.show} style={styles.row2}>
        <Image
          source={require('./image/change.jpg')}
          style={styles.image}
          
        />
        <Text style={styles.options}>Change my password</Text>
        </TouchableOpacity>

          <View
        style={{
             borderBottomColor: '#808080',
             borderBottomWidth: 1,
             top:24
         }}
        />
        

        </View>

         
      <View style={styles.container}>
  <Dialog
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
    dialogTitle={<DialogTitle title="Confirm your password" />}
>

    <DialogContent>
     <TextInput placeholder="Enter current password"
     onChangeText={this.handlepassword}  
     secureTextEntry={true}
     style={{width:'90%', height:50 }}/>

     <TextInput placeholder="Enter new password"
     onChangeText={this.handlenewpassword} 
     secureTextEntry={true}
     style={{width:'90%', height:50, }}/>
     
     <View style={{top:10, left:70}}>
     <TouchableOpacity onPress={this.changepassword} style={styles.onbutton}>
     <Text style={{fontColor:'white',top:10}}>Enter</Text>
     </TouchableOpacity>
     </View>

     
    </DialogContent>
  </Dialog>
</View>

</View>

    	);

	}
}

export default setting;

const styles = StyleSheet.create({
   options: {
   top:10,
   left:20
  },

  container:{
    left:20,
    paddingTop: 20
  },

  row:{
    flexDirection:'row',
    height:40,
    top:10
  },
  row2:{
     flexDirection:'row',
    height:40,
    top:20
  },

  image:{
    width:30, 
    height:40,
    left:12

  },

  onbutton: {
    backgroundColor:  '#0063B2FF',
    fontSize: 20,
    width:90,
    height:40,
     alignItems: "center",

     paddingBottom:20
  }
 
 
});