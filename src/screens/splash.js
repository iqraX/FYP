import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
console.disableYellowBox = true;


const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  //const [email, setEmail] = useState('');
 //const [type, setType] = useState(''); 
 var mail='';
 var result;
 global.typee='';
 global.email1='';
 global.status='';
 global.id=0;

 const getemail = async() =>{


  console.log('jdjsff'+JSON.stringify(await AsyncStorage.getItem('email')));

 
  mail= (JSON.stringify(await AsyncStorage.getItem('email')));
  //setEmail(mail);
  //email = mail.replace('\"','');
  //email= mail.replace(/"/g, '');
  result=mail.replace(/"/g,'');
  email1 = result.substring(1, result.length-1);

   if(email1==='ul')
        navigation.replace('main');

  console.log('splash email'+email1);
       const url= "https://se.getnokri.com/fyp4/public/api/user-details?email="
      +email1;
      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {
         console.log(response.data.message);

         typee=response.data.type;
         id= parseInt(response.data.id);
         console.log("typee"+typee);

         if(typee==='rider')
          {navigation.replace('home',{message:'rating',driver_id:5});
           //alert(typee);
         }

        else if (typee==='driver')
          navigation.replace('driver_home');
        else;
          
      }
      else if (response.data.status === 'failed') {
         console.log(response.data.message);
         
        //setType(this.response.type);
          
      }
    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });

       
      
        
      


};

const gettype =() =>{
  
}

  useEffect(() => {
     setTimeout(() => {
      setAnimating(false);
      

      getemail();
      
     gettype();

      

       /* AsyncStorage.getItem('email').then((value) =>
        navigation.replace(
          value === null ? 'main' : 'home'
        ),
      );*/
      
      


    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./image/logoo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});