import React from 'react'
import { FlatList, View } from 'react-native'
import Colors from "../Theme/Colors";
import Data from '../Config/Data';
import Card from '../Components/Card';
const DrinkPage = ({navigation}) => {
   
    return (
        <View style={{flex:1,marginTop:40,}}>
        <FlatList
        style={{width:'100%',height:'100%'}}
        horizontal={true}
        data={Data.drinks}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <View style={{height:215,marginHorizontal:10,justifyContent:'center',alignItems:'center',width:130}}>
            <Card data={item} onPress={()=>navigation.navigate('root',{screen:'Product Details',params:{data:JSON.stringify(item)}}) }/>
    </View>
        )}
       
        />
        </View>
    )
}

export default DrinkPage
