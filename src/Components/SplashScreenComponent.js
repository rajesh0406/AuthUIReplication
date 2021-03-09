import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../Theme/Colors';
const SplashScreenComponent = () => {
    return (
        <View style={styles.splash_screen}>
            <Fontisto name="react" style={styles.splash_screen_logo}/>
          </View>
    )
}
const styles=StyleSheet.create({
    splash_screen:{
      flex:1,
      backgroundColor:Colors.primaryRed,
      justifyContent:'center',
      alignItems:'center'
    },
    splash_screen_logo:{
      color:Colors.white,
      fontSize:150
    }
  })
export default SplashScreenComponent
