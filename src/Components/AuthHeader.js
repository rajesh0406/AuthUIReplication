import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Theme/Colors';
import {useNavigation} from '@react-navigation/native';

const AuthHeader = () => {
    const navigation=useNavigation();
    return (
        <View style={styles.header}>
            <Ionicons name="chevron-back" style={styles.back_arrow} onPress={()=>navigation.goBack()}/>
        </View>
    )
}
const styles=StyleSheet.create({
header:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
   
},
back_arrow:{
    color:Colors.primaryRed,
    fontSize:30
}
})
export default AuthHeader
