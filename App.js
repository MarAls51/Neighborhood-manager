import React, { Component, useState} from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigator/AuthNavigator';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './app/redux/store/store'
export default function App() {
  return (
    <Provider store = {store}>
      <NavigationContainer>
        <AuthNavigator/>
      </NavigationContainer>
    </Provider>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-end',
  },
});