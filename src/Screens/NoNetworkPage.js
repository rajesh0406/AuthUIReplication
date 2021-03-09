import React from 'react'
import { View, Text } from 'react-native'
import SVG from '../Assets/Images/server_down.svg';
import Colors from '../Theme/Colors';
const NoNetworkPage = () => {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ee5764'}}>
            <SVG height={200} width={200} style={{borderRadius:100}}/>
            <Text style={{fontFamily:'Poppins-SemiBold',color:Colors.white,fontSize:20}}>No Connection</Text>
            <Text style={{fontFamily:'Poppins-SemiBold',color:Colors.white,fontSize:15,width:'90%',textAlign:'center'}}>Please check your internet connection and try again</Text>
        </View>
    )
}

export default NoNetworkPage
