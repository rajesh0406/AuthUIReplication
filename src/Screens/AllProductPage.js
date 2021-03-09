import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import UnderConstructionPage from './UnderConstructionPage';
import Colors from '../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBar from '../Components/SearchBar';
import TopTab from '../Navigator/TopTabNavigator';
import BottomTab from '../Components/BottomTab';
const AllProductPage = () => {
    return (
       <View style={styles.main_page}>
           <View style={styles.headerIcons}>
               <Ionicons name="md-menu-outline" style={styles.headerIcon_menu}/>
               <AntDesign name="shoppingcart" style={styles.headerIcon_cart}/>               
           </View>
           <Text style={styles.headerTitle}>Delicious food for you</Text>
           <SearchBar/>
           <TopTab/>
           <BottomTab/>
       </View>
    )
}
const styles=StyleSheet.create({
    main_page:{
        flex:1,
        backgroundColor:Colors.grey2
    },
    headerIcons:{
        marginTop:20,
        padding:25,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerIcon_menu:{
        fontSize:30,
        color:Colors.darkBlack
    },
    headerIcon_cart:{
        fontSize:22,
        color:Colors.grey4
    },headerTitle:{
        color:Colors.darkBlack,
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        textAlign:'left',
        width:'35%',
        textShadowColor:Colors.lightBlack,
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 3,
        marginLeft:30
    }
})
export default AllProductPage
