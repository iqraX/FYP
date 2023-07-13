import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import axios from 'axios';
import SearchableDropdown from 'react-native-searchable-dropdown';
import home from './home';
import MyView from './MyView';
import Dialog, {DialogTitle,  DialogButton, DialogContent, DialogFooter } from 'react-native-popup-dialog';

import Spinner from 'react-native-loading-spinner-overlay';
console.disableYellowBox = true;




export default class book extends Component {

	constructor(){

    super();
	}

	state={

    nature:[{name:'govt'},{ name:'private'},{name: 'armed forces'}],
    specialization:[{name:'general'},{name:'cardiac'},{name:'cancer'},{name:'maternity'}],
    selected_nature:'',
    selected_rating:'',
    selected_specialization:'',
    visible:false,
    tmpArray:[],
    personalized:'',
		
  confirm:false,
  loading:false,
  ride_id:0,
	hospitals:[],
  temp:[],
    selectedValue:'',
	long:0.0000,
	lat:0.0000,

  isHidden:true,
}

		

		componentWillMount(){
                
                const {navigation,route}=this.props;
   
               this.state.long = navigation.getParam('longitude');
               this.state.lat = navigation.getParam('latitude');
                this.personalize();
                this.state.temp= this.state.hospitals.title;
                this.timer = setInterval(()=> this.check_for_confirmation(), 3000);

}



check_for_confirmation=()=>{
  if(this.state.confirm===true){

    const url= "https://se.getnokri.com/fyp4/public/api/confirm?id="
      +id+"&ride_id="+this.state.ride_id+"&type=rider";

      axios
      .post(url)
      .then((response) => {
        if(response.data.msg==='booked')
        {
          this.setState({
            confirm:false,
            loading:false,
            driver_id:response.data.driver_id,
            ride_id:response.data.ride_id
          });

          alert("Your ambulance is on its way!");
          //THIS NEEDS MODIFICATIONS

          this.props.navigation.navigate('trackDriver',{

            ride_id:this.state.ride_id,
            driver_id:this.state.driver_id,
          });

        }
        else;
      
    })
    
       .catch((error) => {
       if (error.response) {

        alert(JSON.stringify(error.response));
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });


  }
  else;
}

suggest=()=>{

  this.setState({isHidden:false});
}

setnature=(title)=>{
  let x= title.replace(/"/g,'');
  this.setState({selected_nature:x});
}

setrating=(title)=>{
  let x= title.replace(/"/g,'');
  this.setState({selected_rating:x});
}

setspecialization=(title)=>{
  let x= title.replace(/"/g,'');
  this.setState({selected_specialization:x});
  
}

sendrequest(title){

  this.setState({loading:true});
  const hospital= title.replace(/"/g,'');
  const url= "https://se.getnokri.com/fyp4/public/api/postrequest?location="
      +hospital+"&lat="
      +this.state.lat+"&long="
      +this.state.long+"&id="
      +id;

      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {
         console.log(response.data.message);
         this.setState({confirm:true, ride_id: response.data.ride_id});


         //enter next timer function
          
      }
    })
    
       .catch((error) => {
       if (error.response) {
            
            console.log(error.response);
        } else {
            
            console.log('Error', error.message);
        }
      });

       //WAITING FOR DRIVER CONFIRMATION

       //wait();

}

  prepersonalize=()=>{

   this.personalize();
  this.setState({visible:true});
 
   
  

}


personalize=()=>{

  

  const url= "https://se.getnokri.com/fyp4/public/api/personalize?nature="
      +this.state.selected_nature+"&rating="
      +this.state.selected_rating+"&specialization="
      +this.state.selected_specialization+"&latitude="
      +this.state.lat+"&longitude="
      +this.state.long;


      //this.setState({email:url});

      axios
      .post(url)
      .then((response) => {
        
        if (response.data.status === 200) {
         console.log(response.data.message);
         this.setState({hospitals: response.data.hospitals});
         

         //enter next timer function
          
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

	render() {

     const personalizedd = this.state.hospitals.map((data) => {
    return (
      <View><Text>{data.name}</Text></View>
    )
  })



		return(


            <View>

            <View style={{height:45,width:'100%', backgroundColor: '#9CC3D5FF'}}>
       

      </View>
      <View style={styles.container}>
            <Text
            style={{fontWeight:'bold', fontSize:20}}
            >Choose your destination</Text>

            <View style={{width:'85%', paddingTop:20}}>
           <SearchableDropdown
           style={{height:'100%'}}
          onTextChange={(text) => console.log(text)}
          onItemSelect={(item) => this.sendrequest(JSON.stringify(item.name))}
          containerStyle={{padding: 5}}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            padding: 10,
            height:50,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            color: '#222',
          }}
          itemsContainerStyle={{
            maxHeight: '60%',
          }}
          items={this.state.hospitals}
          placeholder="Nearby Hospitals"
          resetValue={false}
          underlineColorAndroid="transparent"
        />

            </View>

             <Spinner
         
          visible={this.state.loading}
          
          textContent={'Finding ambulance...'}
          
          textStyle={styles.spinnerTextStyle}
        />

            <View style={{top:40}}>    
            <TouchableOpacity onPress={this.suggest}>
            <Text style={{color:'#323232',fontSize:12, left:10,textDecorationLine: 'underline'}}>
            Need our Recommendations?
            </Text>
            </TouchableOpacity>
            </View>

            <MyView hide={this.state.isHidden} style={{top:100}}>


             <View style={{flexDirection: 'row'}}>
             <Text style={{left:5}}>Type</Text>
             <Text style={{left:85}}>Rating</Text>
             </View>



             <View style={{flexDirection: 'row'}}>

             <View style={{width:120}}>

           {/*nature dropdown start*/}
              <SearchableDropdown
           style={{height:'100%', }}
          onTextChange={(text) => console.log(text)}
          // Change listner on the searchable input
          
          onItemSelect={(item) => this.setnature(JSON.stringify(item.name))}
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
            color: '#222',
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={this.state.nature}
         
          placeholder={this.state.selected_nature}
         
          resetValue={false}
         
          underlineColorAndroid="transparent"
          
        />
      {/*nature dropdown end*/}
      </View>


    {/*rating dropdown start*/}
     <View style={{width:'40%'}}>
     <SearchableDropdown
           style={{height:'100%'}}
          onTextChange={(text) => console.log(text)}
          // Change listner on the searchable input
          
          onItemSelect={(item) => this.setrating(JSON.stringify(item.name))}
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
            color: '#222',
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={[{name: 'Above 2'},{name:'Above 3'},{name: 'Above 4'}]}
         
          placeholder={this.state.selected_rating}
         
          resetValue={false}
         
          underlineColorAndroid="transparent"
          
        />
        </View>

  {/*rating dropdown end*/}

             </View>






     {/*THE SECOND ROW OF CATEGORIES START HERE*/}




      <View style={{top:20}}>
             
             <Text style={{left:5}}>Specialization</Text>
             </View>



             <View style={{width:'84%', top:20}} >

           {/*specialization dropdown start*/}
              <SearchableDropdown
           style={{height:'100%'}}
          onTextChange={(text) => console.log(text)}
          // Change listner on the searchable input
          
          onItemSelect={(item) => this.setspecialization(JSON.stringify(item.name))}
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
            color: '#222',
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={this.state.specialization}
         
          placeholder={this.state.selected_specialization}
         
          resetValue={false}
         
          underlineColorAndroid="transparent"
          
        />
      {/*nature dropdown end*/}


    

  {/*rating dropdown end*/}

             </View>

        <TouchableOpacity style={styles.onbutton}
        onPress={this.prepersonalize}>
        <Text style={{top:10,fontSize:15, color:'white',}}
        >Find Hospitals</Text></TouchableOpacity>




          
        </MyView>

      {/*Dialog POPUP*/}
      <View style={styles.container}>
  <Dialog
    visible={this.state.visible}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
    dialogTitle={<DialogTitle title="Our Suggested Hospitals" />}
>

    <DialogContent>
     <View>{personalizedd}</View>

     
     
    </DialogContent>
  </Dialog>
</View>


           

            </View>
            
            </View>


			);
	}

}

const styles = StyleSheet.create({

  container:{
    left:20,
    paddingTop: 20
  },
   spinnerTextStyle: {
    color: '#FFF',
    fontWeight: 'normal',
  },
   onbutton: {
    backgroundColor:  '#0063B2FF',
    fontSize: 20,
    width:200,
    height:40,
     alignItems: "center",
     top:40,
     left:60,
     paddingBottom:20
  }

 


	});