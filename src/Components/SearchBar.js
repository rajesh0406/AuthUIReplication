import React from 'react'
import { View, Text,TouchableOpacity,TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../Theme/Colors';
const SearchBar = () => {
    return (
        <TouchableOpacity style={{margin:25,backgroundColor:Colors.grey3,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',width:'80%',height:40,borderRadius:20}}>
            <FontAwesome name="search" style={{padding:15,fontSize:14,color:Colors.darkBlack,flex:0.1}}/>
            <TextInput placeholder="Search" placeholderTextColor={Colors.lightBlack} style={{flex:0.8,textAlign:'left'}}/>
        </TouchableOpacity>
    )
}

export default SearchBar
