import React from 'react'
import { View, Text,Image,TouchableOpacity,StyleSheet } from 'react-native'
import Colors from '../Theme/Colors';

const Card = ({data,onPress}) => {

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.image_view}>
      <Image source={data.uri}
            style = {{height:'100%', width: '100%', resizeMode : 'stretch'}} />
        </View>
        <Text style={styles.name}>
            {data.name}
        </Text>
        <Text style={styles.cost}>
           {data.cost}
      
        </Text>
      
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    card:{
    justifyContent:'center',
    alignItems:'center',
    height:150,width:120,
    backgroundColor:Colors.white,
    borderRadius:13,
    shadowColor:Colors.grey4,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10
    },
    image_view:{
        elevation:4,
        backgroundColor:Colors.grey2,
        borderRadius:40,
        height:80,
        width:80,
        position:'absolute',
        top:-30,left:20
    },
    name:{
        marginTop:40,
        fontFamily:'Poppins-SemiBold',
        color:Colors.darkBlack,
        fontSize:13,
        textAlign:'center',
        width:'80%'
    },
    cost:{
        color:Colors.primaryRed,
        fontSize:13,
        textAlign:'center',
        width:'80%',
        fontFamily:'Poppins-SemiBold'
    }
})
export default Card
