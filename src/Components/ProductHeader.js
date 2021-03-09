import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Theme/Colors';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const ProductHeader = () => {
    const navigation=useNavigation();
    return (
        <View style={styles.header}>
            <Ionicons name="chevron-back" style={styles.back_arrow} onPress={()=>navigation.goBack()}/>
            <EvilIcons name="heart" style={styles.heart} />
        </View>
    )
}
const styles=StyleSheet.create({
header:{
    flex:1,
    margin:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
   
},
back_arrow:{
    color:Colors.darkBlack,
    fontSize:20
},
heart:{
    color:Colors.darkBlack,
    fontSize:25
}
})
export default ProductHeader