import { createStackNavigator} from '@react-navigation/stack';
import React,{useEffect,useState} from 'react';
import AllProductPage from '../Screens/AllProductPage';
import {useNetInfo} from "@react-native-community/netinfo";
const ProductNavigator=createStackNavigator()
import NoNetworkPage from '../Screens/NoNetworkPage';
import ProductDetails from '../Screens/ProductDetails';
import ProductHeader from '../Components/ProductHeader';
import HistoryPage from '../Screens/HistoryPage';
import FavouritePage from '../Screens/FavouritePage';
import ProfilePage from '../Screens/ProfilePage';
import Colors from '../Theme/Colors';
const ProductStack=()=>{
    const netInfo = useNetInfo();
    const [NetworkStatus,setNetworkStatus]=useState(true);
    useEffect(() => {
        if(!netInfo.isConnected)
        {
              setNetworkStatus(false)
        }
        else if(netInfo.isConnected===null)
        {
          setNetworkStatus(true)
        }
        else
        {
          setNetworkStatus(true)
        }
       }, [netInfo.isConnected])
    return(
        <>
        {
            (NetworkStatus)?
            <ProductNavigator.Navigator>
            <ProductNavigator.Screen name="All product" component={AllProductPage} options={{headerShown:false}}/>
            <ProductNavigator.Screen name="Favourite" component={FavouritePage} options={{headerShown:false}}/>
            <ProductNavigator.Screen name="History" component={HistoryPage} options={{headerShown:false}}/>
            <ProductNavigator.Screen name="Profile" component={ProfilePage} options={{headerShown:false}}/>
            <ProductNavigator.Screen name="Product Details" component={ProductDetails} 
            options={
                {headerTitle:()=>(<ProductHeader/>),
                headerLeft:null,
                gestureEnabled:false,
                headerStyle:{
                    elevation:0,
                    
                }
                }
            }
            />
        </ProductNavigator.Navigator>
            :
            <NoNetworkPage/>
        }
        </>

  
)}
export default ProductStack;
