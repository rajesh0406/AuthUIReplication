/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import {Text } from 'react-native'


import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './src/Navigator/AuthNavigator';
import ProductNavigator from './src/Navigator/ProductNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import BottomTab from './src/Components/BottomTab';
import storage from './src/Services/AsyncStorage';
const MainNavigator=createStackNavigator()
const App= () => {
  const [isSignedIn,setSignedIn]=useState(false);
  useEffect(() => {
    SplashScreen.hide();
 }, []);
 useEffect(() => {
   storage.load({
     key:'user'
     }).then(auth=>{
       if(auth.token)
       {
         setSignedIn(true);
       }
     })
  
 }, [])

  // }, [])
  return (
    <>   
         <NavigationContainer>
         <MainNavigator.Navigator>
           {
             (isSignedIn)?
             <MainNavigator.Screen name="root" options={{headerShown:false}} component={ProductNavigator}/>
             :
             <MainNavigator.Screen name="auth" options={{headerShown:false}} component={AuthNavigator}/>
           }
         </MainNavigator.Navigator>
          </NavigationContainer>
          </>
  );
};



export default App;
