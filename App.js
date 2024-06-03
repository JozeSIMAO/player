import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import { AudioProvider } from './app/context/AudioProvider';
import AudioListItem from './app/components/AudioListItem';

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </NavigationContainer>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
