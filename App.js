import { createStackNavigator } from 'react-navigation'
import Home from './Components/Home'
import Game from './Components/Game'

const RootNavigator = createStackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Game: {
    screen: Game,
    navigationOptions: {
      headerTitle: 'Planet Emoji',
    },
  },
})

export default RootNavigator
