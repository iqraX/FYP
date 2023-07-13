import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,TextInput ,Image,ImageBackground, Text, View, Button, CheckBox } from 'react-native';
import axios from 'axios';
console.disableYellowBox = true;

class edit_name extends React.Component {

	state = {
      
      kind : '',
      value: '',
      new_value: '',
     
    };

    handlesave = () => {

    	const url='https://se.getnokri.com/fyp4/public/api/edit-details?kind='
    	+this.state.kind+ '&value='
    	+this.state.new_value+ '&email='
    	+email;

     axios
     .post(url)
     .then((response) => {

       alert(response.data.message);

       if(this.state.kind==='First Name')
        	first=this.state.new_value;
            

        else if(this.state.kind==='Last Name')
        	last=this.state.new_value;
            

        else if(this.state.kind==='Email')
        	email=this.state.new_value;

        
        else if(this.state.kind==='Phone Number')
        	no=this.state.new_value;

        else;

      })
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });
    



    }

    handlevalue = (text) => {
    	this.setState({ new_value: text });
    }

    componentWillMount(){
        const {navigation,route}=this.props;
       
        this.state.kind = navigation.getParam('kind');

        if(this.state.kind==='First Name')
        	this.setState({ value: first });
            

        else if(this.state.kind==='Last Name')
        	this.setState({ value: last });
            

        else if(this.state.kind==='Email')
        	this.setState({ value: email });

        
        else if(this.state.kind==='Phone Number')
        	this.setState({ value: no});

        else;

        /*else if(this.state.kind==='First Name')
        	this.setState({ value: first });*/
    }

	
     render(){
     	
         
    return(

    	<View>

         <Text> {this.state.kind}</Text>
         <TextInput placeholder={this.state.value} onChangeText={this.handlevalue}/>
         <Button title="Save Changes" onPress={this.handlesave}
         />
         </View>




    );
}
}
export default edit_name;