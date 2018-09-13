import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import FtreScreen from '../screens/FtreScreen';
import { View } from 'react-native';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    	<View>
          <FtreScreen pagekey={"firstTimeSetup"} title={"Welcome to the Gunn Business App!"}/>
      </View>
    );
  }
}
