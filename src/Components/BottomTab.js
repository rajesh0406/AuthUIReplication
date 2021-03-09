import React,{useState} from 'react'
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../Theme/Colors';
import {useNavigation} from '@react-navigation/native';
const BottomTab = () => {
    const navigation = useNavigation();
    const [active,setActive]=useState(1);
    return (
        <View style={styles.bottom_tab}>
            <TouchableOpacity>
            <Entypo name="home" onPress={()=>{
                setActive(1)
                navigation.navigate("root",{screen:'All Product'})
                }} style={(active===1)?styles.isActive:styles.notActive}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Feather name="heart" onPress={()=>{
                setActive(2)
                navigation.navigate("root",{screen:"Favourite"})}} style={(active===2)?styles.isActive:styles.notActive}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Feather name="user" onPress={()=>{
                setActive(3)
                navigation.navigate("root",{screen:"Profile"})}
            } style={(active===3)?styles.isActive:styles.notActive}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <MaterialCommunityIcons name="history" onPress={()=>{
                setActive(4)
                navigation.navigate("root",{screen:"History"})}} style={(active===4)?styles.isActive:styles.notActive}/>
            </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    bottom_tab:{
        height:60,
        width:'100%',
        position:'absolute',
        bottom:0,
        left:0,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:Colors.grey2
    },
    isActive:{
        color:Colors.primaryRed,
        fontSize:20
    },
    notActive:{
        fontSize:20,
        color:Colors.icongrey,
        
    }
    
})

export default BottomTab
