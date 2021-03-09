import React,{useEffect} from 'react'
import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity } from 'react-native'
import Colors from '../Theme/Colors';
import Button from '../Components/Button';
import { useNavigation } from '@react-navigation/native';


const InitPage = () => {
  
    const navigation=useNavigation();
    return (
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <Text  style={{color:Colors.primaryRed,fontFamily:'Poppins-SemiBold',fontSize:23,padding:30,width:'100%',textAlign:'center'}}>Say hello to your new app</Text>   
         <Button onPress={()=>navigation.navigate('login')} text="Log In" ButtonStyle={styles.login_button} TextStyle={styles.login_text} />
         <Button onPress={()=>navigation.navigate('signup')} text="Sign Up" ButtonStyle={styles.signup_button} TextStyle={styles.signup_text}/>  
     </View>
    )
}
const styles=StyleSheet.create({
    login_button:{
        width:'60%',
        backgroundColor:Colors.primaryRed,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        borderRadius:20,
        margin:10
    },
    login_text:{
        fontSize:15,
        color:Colors.white,
        fontFamily:'Poppins-SemiBold'
    },
    signup_button:{
        width:'60%',
        backgroundColor:Colors.white,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        borderRadius:20,
        borderWidth:1,
        margin:10,
        borderColor:Colors.primaryRed
    },
    signup_text:{
        fontSize:15,
        color:Colors.primaryRed,
        fontFamily:'Poppins-SemiBold'
    }
})

export default InitPage
