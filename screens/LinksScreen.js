import React from 'react';
import { Button, Linking, ScrollView, StyleSheet } from 'react-native';
import {WebBrowser} from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          title="Gunn Business Website"
          onPress={this._handleOpenWithWebBrowser}
          style={styles.button}
          color="#841584"
        />
      </ScrollView>
    );
  }
  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('https://www.gunnbusiness.com');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
