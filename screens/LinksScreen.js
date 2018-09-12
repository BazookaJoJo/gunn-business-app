import React from 'react';
import { Button, Linking, ScrollView, StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
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
      <View style={styles.option}>
        <Touchable style={styles.optionTouchable}
          id="Gunn"
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleGunnBusinessWebsite}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../assets/images/gunnbusiness.png')}
                resizeMode="contain"
                fadeDuration={0}
                style={{ width: 20, height: 20, marginTop: 1 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Gunn Business Website
              </Text>
            </View>
          </View>
        </Touchable>
        <Touchable style={styles.optionTouchable}
          id="FBLA"
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleFBLAWebsite}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../assets/images/fbla.png')}
                resizeMode="contain"
                fadeDuration={0}
                style={{ width: 20, height: 20, marginTop: 1 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                FBLA Website
              </Text>
            </View>
          </View>
        </Touchable>
        <Touchable style={styles.optionTouchable}
          id="DECA"
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleDECAWebsite}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../assets/images/deca.png')}
                resizeMode="contain"
                fadeDuration={0}
                style={{ width: 20, height: 20, marginTop: 1 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                DECA Website
              </Text>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
  _handleGunnBusinessWebsite = () => {
    WebBrowser.openBrowserAsync('https://www.gunnbusiness.com');
  }
  _handleFBLAWebsite = () => {
    WebBrowser.openBrowserAsync('https://www.fbla-pbl.org');
  }
  _handleDECAWebsite = () => {
    WebBrowser.openBrowserAsync('https://www.deca.org');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  optionTouchable: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED'    
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});
