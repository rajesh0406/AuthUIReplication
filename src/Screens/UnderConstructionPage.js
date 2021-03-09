import React from 'react'
import { View, Text } from 'react-native'
import SVG from '../Assets/Images/under_construction.svg';
import Colors from '../Theme/Colors';
const UnderConstructionPage = () => {
    return (
        <View style={{backgroundColor:Colors.white,flex:1,justifyContent:'center',alignItems:'center'}}>
            <SVG height={200} width={200}/>
            <Text style={{fontFamily:'Poppins-SemiBold',fontSize:18,color:Colors.primaryRed,width:'90%',textAlign:'center'}}>This page is under construction</Text>
            <Text style={{fontFamily:'Poppins-Medium',color:Colors.primaryRed,fontSize:14}}>We're working on it!</Text>            
        
        </View>
    )
}

export default UnderConstructionPage
