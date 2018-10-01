import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from "react-native";
export default class FtreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      name: "",
      email: "",
    };
  }
  componentDidMount() {
    AsyncStorage.getItem(this.props.pagekey, (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          console.log("null value recieved", result);
          this.setModalVisible(true);
        } else {
          console.log("result", result);
        }
      }
    });
    AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
            });
    AsyncStorage.getItem('name').then((value) => this.setState({'name': value }))
    AsyncStorage.getItem('email').then((value) => this.setState({'email': value }))
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setName = (value) => {
      AsyncStorage.setItem('name', value);
      this.setState({ 'name': value });
  }
  setEmail = (value) => {
      AsyncStorage.setItem('email', value);
      this.setState({ 'email': value });
  }
  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          style={styles.ftreContainer}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.ftreContainer}>
            <View style={styles.ftreTitleContainer}>
              <Text style={styles.ftreTitle}>{this.props.title}</Text>
            </View>
            <View style={styles.ftreDescriptionContainer}>
              <Text style={styles.ftreDescription} allowFontScaling={true}>
                Full Name
              </Text>
              <TextInput
                style={{height:30, borderColor: 'gray', borderWidth: 1, marginHorizontal: 20, borderRadius: 4px}}
                onChangeText={this.setName}
              />
              <Text>
                {this.state.name}
              </Text>

              <Text style={styles.ftreDescription} allowFontScaling={true}>
                E-mail
              </Text>
              <TextInput
                style={{height:30, borderColor: 'gray', borderWidth: 1, marginHorizontal: 20, borderRadius: 4px}}
                onChangeText={this.setEmail}
              />
              <Text>
                {this.state.email}
              </Text>
            </View>
            <View style={styles.ftreExitContainer}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View style={styles.ftreExitButtonContainer}>
                  <Text style={styles.ftreExitButtonText}>Exit</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>

    );
  }
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
ftreContainer:{
		backgroundColor:'#fdfdfd',
		flex:1,
		borderColor:'#823837',
	},
	ftreTitle:{
		color:'#823837',
    fontWeight:'bold',
		fontSize:20,
		textAlign:'center',	
	},
	ftreDescription:{
		color:'#823837',
    fontSize:15,
		marginRight:20,
		marginLeft:20
	},
	ftreCloseIcon:{
		alignSelf:'flex-end',
		flex:0.5,
		marginRight:10
	},
	ftreTitleContainer:{
    paddingTop:30,
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',

	},
	ftreDescriptionContainer:{
		flex:6.5,
    marginTop:0,
	},
	ftreExitContainer:{
		flex:2,
		justifyContent:'flex-start',
		alignItems:'center',
	},
	ftreExitButtonContainer:{
		width:200,
		height:40,
		backgroundColor:'#823837',
		borderRadius:10,
		justifyContent:'center',
	},
	ftreExitButtonText:{
		color:'white',
		fontSize:20,
		fontWeight:'bold',
		textAlign:'center'
	}
});
