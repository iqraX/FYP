import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import home from '../screens/home';

const screens={
          
          Home:{
          	screen:home,
          	navigationOptions:{
          		title:'GameZone',
          	}
          }


}

const HomeStack = createStackNavigator(screens,{
	defaultNavigatorOptions:{
          header:null,
		headerTintColor: '#444',
		headerStyle: {backgroundColor: '#eee', height:60}
	}
});

export default HomeStack;
