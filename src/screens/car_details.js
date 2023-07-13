
import React, {useState, Component} from 'react';
import { StyleSheet,TextInput ,Image, KeyboardAvoidingView,ImageBackground, Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ValidationComponent from 'react-native-form-validator';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';
import MyView from './MyView';
import login from './login';
import SearchableDropdown from 'react-native-searchable-dropdown';
console.disableYellowBox = true;



class car_details extends Component {

    state = {
      
        company:[{name:'Honda'},{ name:'Toyota'},{name: 'Suzuki'},{name: 'Changan'},{name: 'Hyundai'}],
        car_type:[{name:'General'},{ name:'Cardiac'},{name: 'ALS'},{name: 'BLS'},{name: 'Covid-19'}],
        textcolor1:'#222',
        textcolor2:'#222',
        user_id:0,
        
        first: '',
        last:'',
        email: '',
        password: '',
        no: '',
        type:'',
        selected_company:'Company',
        selected_type:'Type',
        selected_model:'',

        nplate:'',
        model:'',
        color:'',
        isLoading: "",
        error1:"a",
        error2:"b",
        error3:"c",
        error4:'d',
        isHidden1:true,
        isHidden2:true,
        isHidden3:true,
        isHidden4:true,
      
      msg: "",
    };

    handlemodel = (text) => {
            this.setState({ model: text, error2:'', isHidden2:true });
   }

    handlecolor = (text) => {
            this.setState({ color: text });
            
   }

   handlenplate = (text) => {

    //alert(text+text[0]+text[1]);

            if((text.length!=5)&&((text.length!=6)))
              this.setState({error3:"Wrong format", isHidden3:false});

            else if(!(this.isCharacterALetter(text[0]))&&(this.isCharacterALetter(text[1])))
                this.setState({error3:"*Wrong format", isHidden3:false});

            else
            this.setState({ nplate: text, isHidden3:true,error3:'' });
            
   }



  isCharacterALetter=(char)=> {
  return (/[a-zA-Z]/).test(char)
}

   setcompany=(title)=>{
  let x= title.replace(/"/g,'');
  this.setState({selected_company:x, textcolor1:'#585858', error1:'',isHidden1:true});

  //alert(this.state.textcolor1);
}

settype=(title)=>{

  let x= title.replace(/"/g,'');
  this.setState({selected_type:x, textcolor2:'#585858', error4:'',isHidden4:true});
  //alert(this.state.selected_type);
}


   shouldComponentUpdate(nextProps, nextState) {
  return true;
}

   

   onsubmit=()=>{

    //alert('onsubmit');

    let check=0;
   
    this.setState({isHidden2:true, isHidden1:true, isHidden3:true});

     if(this.state.selected_company=='Company')
     { 
      this.setState({error1:"*Required1", isHidden1:false});
       check=1;
     }

   /* if(this.state.selected_type==='')
     { this.setState({error4:"*Required4", isHidden4:false});
       check=1;
     }*/

     if(this.state.model==='')
       { 
      this.setState({error2:"*Required2", isHidden2:false});
       check=1;
     }


    if(this.state.nplate==='')
     { 
      this.setState({error3:"*Required3", isHidden3:false});
       check=1;
     }

    /* alert('this.state.selected_company'+this.state.selected_company+
                'this.state.selected_type'+this.state.selected_type+
                'this.state.model'+this.state.model+
                 'this.state.nplate'+this.state.nplate+
                 'this.state.error3'+this.state.error3+
                 check
                 );*/


    if((check==0)&&(this.state.error3==''))
       this.signup();
     else;

   }

   
     signup=()=>{

      //alert('signup');
     
      var temp=this.state.selected_company+" "+this.state.model;
      this.setState({selected_model:temp})

      this.setState({ isLoading: true,  });

       const url= "http://se.getnokri.com/fyp4/public/api/user-signup?first="
      +this.state.first+ "&last="+ this.state.last+ "&password="
      +this.state.password+ "&email="
      +this.state.email+ "&type="
      +this.state.type+ "&no="
      +this.state.no;


  console.log("starting request");
    axios
      .post(url)
      .then(async(response) => {

        this.setState({ isLoading: false });
        if (response.data.status === 200) {

          await
          this.setState({

            msg: response.data.message,
            user_id:response.data.id

            
          });

          console.log(this.state.msg);
          this.signup2();

         
        
      }

       else if (response.data.status == "failed") {
          this.setState({ msg: response.data.message });
          
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

       
    
};

signup2=()=>{

 if(this.state.user_id!=0){

        var uppercasetext = (this.state.nplate).toUpperCase();
            
            const url= "http://se.getnokri.com/fyp4/public/api/driverSignup?user_id="
      +this.state.user_id+ "&model="+ this.state.selected_model+ "&color="
      +this.state.color+ "&nplate="
      +uppercasetext+ "&car_type="
      +this.state.selected_type;
      
      //console.log('signup2');

    axios
      .post(url)
      .then((response) => {

        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          
          this.setState({

            msg: response.data.message,
            

            
          });

         // console.log(this.state.msg);
         //alert(response.data.status);

          this.props.navigation.navigate('login',{
           messagee:'registered'
          });

         
        
      }

       else if (response.data.status == "failed") {
          this.setState({ msg: response.data.message });
          
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

       


       }          //END OF if (driver registration)
 
}



     render(){

      const {navigation,route}=this.props;
       this.state.first = navigation.getParam('first');
       this.state.last = navigation.getParam('last');
       this.state.no = navigation.getParam('no');
        this.state.password = navigation.getParam('password');
    
        this.state.type = 'driver';
        this.state.email= navigation.getParam('email');


    return(


    	<View style={styles.container}>
         <View style={styles.inner}>

         
         <Image source={require('./image/logoo.png')} style={styles.logo} />

         <View style={{left:'7%'}}>
         <Text style={{ color:'#585858' ,fontSize:16}}>
         Enter your vehicle informationn
         </Text>

         

         <View style={{width:'85%',top:'10%'}}>

           {/*comapany dropdown start*/}
              <SearchableDropdown
           style={{height:'100%', }}
          onTextChange={(text) => console.log(text)}
          // Change listner on the searchable input
          
          onItemSelect={(item) => this.setcompany(JSON.stringify(item.name))}
          // Called after the selection from the dropdown
          containerStyle={{padding: 5}}
          // Suggestion container style
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',

          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            height:50,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            // Text style of a single dropdown item
            color: 'black'
          }}

          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={this.state.company}
         
          placeholder={this.state.selected_company}
         
          resetValue={false}
         
          underlineColorAndroid="transparent"
          
        />
      {/*company dropdown end*/}

      <MyView style={{top:15}} hide={this.state.isHidden1}>
        

        <Text style={{color:'red', fontSize:13, top:-20, left:10}}>{this.state.error1}</Text>
        </MyView>
      </View>

      <TextInput 
      placeholder="Model"
      onChangeText={this.handlemodel}
      style={styles.input}

      />

       <MyView style={{top:28}} hide={this.state.isHidden2}>
        <Text style={{color:'red', fontSize:13,left:10}}>{this.state.error2}</Text>
        </MyView>

      <View style={{flexDirection:'row'}}>
      <TextInput 
      placeholder="Color"
      onChangeText={this.handlecolor}
      style={styles.input2}

      />

      <TextInput 
      placeholder="Number plate"
      onChangeText={this.handlenplate}
      style={styles.input3}

      />

       <MyView style={{top:95}} hide={this.state.isHidden3}>
        <Text style={{color:'red', fontSize:13, left:-150}}>{this.state.error3}</Text>
        </MyView>

      </View>

        <View style={{width:'85%',top:'10%'}}>

           {/*type dropdown start*/}
              <SearchableDropdown
           style={{height:'100%', }}
          onTextChange={(text) => console.log(text)}
          // Change listner on the searchable input
          
          onItemSelect={(item) => this.settype(JSON.stringify(item.name))}
          // Called after the selection from the dropdown
          containerStyle={{padding: 5}}
          // Suggestion container style
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',

          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            height:50,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            // Text style of a single dropdown item
            //color: {this.state.textcolor2},
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={this.state.car_type}
         
          placeholder={this.state.selected_type}
         
          resetValue={false}
         
          underlineColorAndroid="transparent"
          
        />
      {/*type dropdown end*/}

       

      </View>

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



export default car_details;

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
		height: 150,
		width:200,
		left:60,
	},

	input:{
    fontSize:14,
     top:'10%',
        margin: 12,
    borderWidth: 1,
    padding:10,
    backgroundColor: '#FAF9F8',
    color: '#222',
    width:'82%',
    left:'-2.1%',
borderColor: '#bbb',

  },

  input2:{
     fontSize:14,
     top:'10%',
        margin: 12,
    borderWidth: 1,
    padding:10,
    backgroundColor: '#FAF9F8',
    color: '#222',
    width:'36%',
    left:'-10%',
borderColor: '#bbb',
  },

   input3:{
     fontSize:14,
     top:'10%',
        margin: 12,
    borderWidth: 1,
    padding:10,
    backgroundColor: '#FAF9F8',
    color: '#222',
    width:'40%',
    left:'-15%',
borderColor: '#bbb',
  },

  button:{
    top:'20%',
    height:50,
    width:170,
    left:'15%',
    backgroundColor: '#FC6A03'
  },

});