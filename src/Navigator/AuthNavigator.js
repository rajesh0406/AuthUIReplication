import { createStackNavigator} from '@react-navigation/stack';

import React,{useEffect,useState} from 'react';
import InitPage from '../Screens/InitPage';
import LoginPage from '../Screens/LoginPage';
import SignupPage from '../Screens/SignUpPage';
import AuthHeader from '../Components/AuthHeader';
import Colors from '../Theme/Colors';
import {useNetInfo} from "@react-native-community/netinfo";
import NoNetworkPage from '../Screens/NoNetworkPage';
import OTPLogin from '../Screens/OTPLogin';
const AuthNavigator=createStackNavigator()
const AuthStack=()=>{
    const netInfo = useNetInfo();
    const [NetworkStatus,setNetworkStatus]=useState(true);
    useEffect(() => {
        if(!netInfo.isConnected)
        {
              setNetworkStatus(false)
        }
        else if(netInfo.isConnected===null)
        {
          setNetworkStatus(true)
        }
        else
        {
          setNetworkStatus(true)
        }
       }, [netInfo.isConnected])
    return(
        <>
        {
            (NetworkStatus)?
            <AuthNavigator.Navigator>
            
    <AuthNavigator.Screen name="init" component={InitPage} options={{headerShown:false}}/>
    <AuthNavigator.Screen name="login" component={LoginPage} options={
        {headerTitle:()=>(<AuthHeader/>),
        headerLeft:null,
        gestureEnabled:false,
        headerStyle:{
            elevation:0,
            borderBottomWidth:1,
            borderColor:Colors.grey,
        }
        }}/>   
    <AuthNavigator.Screen name="otplogin" component={OTPLogin} options={
        {headerTitle:()=>(<AuthHeader/>),
        headerLeft:null,
        gestureEnabled:false,
        headerStyle:{
            elevation:0,
            borderBottomWidth:1,
            borderColor:Colors.grey,
        }
        }}/>   
    <AuthNavigator.Screen name="signup" component={SignupPage} options={
        {headerTitle:()=>(<AuthHeader/>),
        headerLeft:null,
        gestureEnabled:false,
        headerStyle:{
            elevation:0,
            borderBottomWidth:1,
            borderColor:Colors.grey,
        }
        }}/>   
     
</AuthNavigator.Navigator>
            :
            <NoNetworkPage/>
        }
        </>

)}
export default AuthStack;