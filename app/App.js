import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "react-native-paper";
import CreateForm from './Page/CreateForm';
import PreviewForm from './Page/PreviewForm';

const Tab = createBottomTabNavigator();

const Index = ({ }) => {
   const { colors } = useTheme();
   return (
      <NavigationContainer>
         <Tab.Navigator
            screenOptions={({ route }) => ({
               tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Create') {
                     iconName = focused ? 'add-circle' : 'add-circle-outline';
                  } else if (route.name === 'Preview') {
                     iconName = focused ? 'eye' : 'eye-outline';
                  }
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
               },
            })}
            tabBarOptions={{
               scrollEnabled: true,
               activeTintColor: colors.primary,
               keyboardHidesTabBar: true
            }}
         >
            <Tab.Screen name="Create" component={CreateForm} options={{ unmountOnBlur: true }} />
            <Tab.Screen name="Preview" component={PreviewForm} options={{ unmountOnBlur: true }} />
         </Tab.Navigator>
      </NavigationContainer >
   );
}

export default Index;
