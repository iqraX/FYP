import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import EditStack from './editStack';

const RootDrawerNavigator = createDrawerNavigator({
	Home: {
		screen: HomeStack,
	},

	Edit: {
		screen:  EditStack
	}
})

export default createAppContainer(RootDrawerNavigator);