import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';
import AudioList from '../screens/AudioList'
import Player from '../screens/Player'
import PlayList from '../screens/PlayList'

// Create a Tab navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='AudioList' component={AudioList} options={{
            tabBarIcon: () => {
                return <MaterialIcons name="headset" size={24} color="black" />
            }
        }}/>
        <Tab.Screen name='Player' component={Player} options={{
            tabBarIcon: () => {
                return <MaterialIcons name="play-circle-filled" size={24} color="black" />
            }
        }}/>
        <Tab.Screen name='PlayList' component={PlayList} options={{
          tabBarIcon: () => {
            return <MaterialIcons name="queue-music" size={24} color="black" />
          }
        }}/>
    </Tab.Navigator>
  )
}
