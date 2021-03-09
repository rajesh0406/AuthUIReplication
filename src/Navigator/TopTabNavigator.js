import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Colors from '../Theme/Colors';
import FoodPage from '../Screens/FoodPage';
import DrinkPage from '../Screens/DrinkPage';
import SnackPage from '../Screens/SnackPage';
const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Foods"
      tabBarOptions={{
        activeTintColor:Colors.primaryRed,
        labelStyle:{fontSize: 12,textTransform: 'none'},
        style: {width:'85%',marginLeft:20,marginRight:20,
        backgroundColor:Colors.grey2,elevation:0,shadowOpacity:0},
        inactiveTintColor:Colors.grey5,
        indicatorStyle:{backgroundColor:Colors.primaryRed,height:2,width:100}
      }}
    >
      <Tab.Screen
        name="Foods"
        component={FoodPage}
        options={{ tabBarLabel: 'Foods' }}
        style={{fontFamily:'Poppins-SemiBold'}}
      />
      <Tab.Screen
        name="Snacks"
        component={DrinkPage}
        options={{ tabBarLabel: 'Drinks' }}
        style={{fontFamily:'Poppins-SemiBold'}}
      />
      <Tab.Screen
        name="Drinks"
        component={SnackPage}
        options={{ tabBarLabel: 'Snacks' }}
        style={{fontFamily:'Poppins-SemiBold'}}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;