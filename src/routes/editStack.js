import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import edit from '../screens/edit';
import edit_name from '../screens/edit_name';

const screens={
          
          Edit:{
          	screen:edit,
          	navigationOptions:{
          		title:'Edit Account',
          	}
          },

          EditName:{
               screen:edit_name,
               navigationOptions:{
                    title:'Edit Name'
               }
          }


}

const EditStack = createStackNavigator(screens,{
	defaultNavigatorOptions:{
		headerTintColor: '#444',
		headerStyle: {backgroundColor: '#eee', height:60}
	}
});

export default EditStack;
