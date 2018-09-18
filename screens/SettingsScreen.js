//import FtreScreen from '../screens/FtreScreen';
import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  _handleExit = () =>
    this.setState(state => ({
      modalVisible: !state.modalVisible,
    }));
  constructor(props) {
    super(props);
    this.props.pagekey = "firstTimeSetup";
    this.props.title = "Welcome to the Gunn Business App!"
    this.state = {
      modalVisible: true,
      name: "Name",
      email: "Email",
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
      <View style={styles.container}>
	      <View>
	        <Modal
	          animationType={"none"}
	          transparent={true}
	          style={styles.ftreContainer}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {
	            alert("Modal has been closed.");
	            this._handleExit;
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
	                style={{height:30, borderColor: 'gray', borderWidth: 1, marginHorizontal: 20}}
	                onChangeText={this.setName}
	              />

	              <Text style={styles.ftreDescription} allowFontScaling={true}>
	                E-mail
	              </Text>
	              <TextInput
	                style={{height:30, borderColor: 'gray', borderWidth: 1, marginHorizontal: 20}}
	                onChangeText={this.setEmail}
	              />
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

	      <View style={styles.infoContainer}>
      		<Text style={styles.font}>
      			Name
      		</Text>
      		<Text style={styles.font}>
      			{this.state.name}
      		</Text>
      	  </View>
      	  <View style={styles.infoContainer}>
      		<Text style={styles.font}>
      			Email
      		</Text>
      		<Text style={styles.font}>
      			{this.state.email}
      		</Text>
      	  </View>
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
	font: {
		fontSize: 15,
		textAlign: 'left'
	},
	container: {
    	flex: 1,
    	backgroundColor: '#fdfdfd',
    },
	infoContainer: {
    	backgroundColor: '#fdfdfd',
    	marginTop: 30,

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

//   static navigationOptions = {
//     title: 'Settings',
//   };

//   render() {
//     return (
//     	<View>
//           <FtreScreen pagekey={"firstTimeSetup"} title={"Welcome to the Gunn Business App!"}/>
//           <Text> abcd </Text>
//       	</View>
//     );
//   }
// }
