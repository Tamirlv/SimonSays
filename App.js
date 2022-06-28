import React, { useState, useEffect } from 'react';
import Simon from './Components/Simon'
import ScoreBoard from './Components/scoreBoard'
import configureStore from './SimonStore/store';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text } from 'react-native';


const store = configureStore();
const Stack = createStackNavigator();

const HelloWorldApp = (props) => {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   console.log('usedeffect')
  // },[count])
  // const decrement = () => {
  //   console.log('tam', count)
  //   setCount(count-1)
  // }
  // const increment = () => {
  //   console.log('tam', count)
  //   setCount(count+1)
  // }
  return (
    <Provider store={store}>
      {/* <Button onPress={increment} title='+'></Button>
      <Text >{count}</Text>
      <Button onPress={decrement} title='-'></Button> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Game"
            component={Simon}
            options={{ title: 'Simon Says' }}
          />
          <Stack.Screen
            name="Score Board"
            component={ScoreBoard}
            options={{ title: 'Score board' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default HelloWorldApp;