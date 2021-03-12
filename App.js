/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useReducer} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './src/Navigator/AuthNavigator';
import ProductNavigator from './src/Navigator/ProductNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import storage from './src/Services/AsyncStorage';
import {AuthContext} from './src/Store/Context';
const MainNavigator=createStackNavigator()
const initialState = {
  isSignedIn: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        isSignedIn: true,
      };
    case "SIGNOUT":
      return {
        ...state,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

const App= () => {
  const [state, dispatch] =useReducer(reducer, initialState);
  useEffect(() => {
    SplashScreen.hide();
 }, []);
 useEffect(() => {
   storage.load({
     key:'user'
     }).then(auth=>{
       if(auth.token)
       {
         dispatch({type:'SIGNIN'})
       }
     }).catch(e=>{})
 }, [])

  return ( 
     <AuthContext.Provider value={{state,dispatch}}>
         <NavigationContainer>
         <MainNavigator.Navigator>
           {
             (state.isSignedIn)?
             <MainNavigator.Screen name="root" options={{headerShown:false}} component={ProductNavigator}/>
             :
             <MainNavigator.Screen name="auth"   options={{headerShown:false}} component={AuthNavigator}/>
           }
         </MainNavigator.Navigator>
          </NavigationContainer>
          </AuthContext.Provider>
         
  );
};



export default App;
