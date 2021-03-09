import React from 'react'
import { View, Text,StyleSheet,Image } from 'react-native'
import Colors from '../Theme/Colors';
import Button from '../Components/Button';
const ProductDetails = ({route}) => {
    let {data}=route.params;
    data=JSON.parse(data)
    
    return (
        <View style={styles.product_page}>
          <View style={styles.image_view}>
              <View style={styles.image_shadow}>
          <Image source={data.uri}
            style = {{height:'100%', width:'100%', resizeMode : 'stretch'}} />
            </View>
            <View style={{marginTop:30}}>
                <Text style={styles.name}>
                    {data.name}
                </Text>
                <Text style={styles.cost}>
                    {data.cost}
                </Text>
            </View>
          </View>
          <View style={{margin:40}}>
                <Text style={styles.text_title}>
                    Delivery info
                </Text>
                <Text style={styles.text}>
                    Delivered between monday and thursday from 8pm to 9.15pm
                </Text>
                <View style={{marginTop:10}}>
                <Text style={styles.text_title}>
                    Return policy
                </Text>
                <Text style={styles.text}>
                    All our food are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately
                </Text>
                </View>
            </View>
            <Button  text="Add to cart" ButtonStyle={styles.add_button} TextStyle={styles.add_text}/>
        </View>
    )
}

const styles=StyleSheet.create({
    product_page:{
        flex:1,
        backgroundColor:Colors.white
    },
    image_view:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    name:{
        textAlign:'center',
        color:Colors.darkBlack,
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        textShadowColor:Colors.lightBlack,
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 1,
        
    },
    cost:{
        textAlign:'center',
        color:Colors.primaryRed,
        fontFamily:'Poppins-SemiBold',
        fontSize:18,
    },
    text_title:{
        textAlign:'left',
        fontSize:15,
        color:Colors.darkBlack,
        textShadowColor:Colors.lightBlack,
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 1,

    },
    text:{
        marginTop:5,
        textAlign:'left',
        fontSize:14,
        color:'#c2c2c5',
        textShadowColor:Colors.grey3,
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 1,
    },
    image_shadow:{
        elevation:3,
        borderRadius:90,
        height:160,
        width:160,
        
    },
    add_button:{
        width:'80%',
        backgroundColor:Colors.primaryRed,
        justifyContent:'center',
        alignItems:'center',
        height:50,
        borderRadius:40,
        marginLeft:40
        
    },
    add_text:{
        fontSize:15,
        color:Colors.white,
        fontFamily:'Poppins-SemiBold'
    }
    

})
export default ProductDetails
