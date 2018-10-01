//import FtreScreen from '../screens/FtreScreen';
import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Button,
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from "react-native";
import Touchable from 'react-native-platform-touchable';
import { Icon } from "expo";

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
	return {
	  headerTitle: <Text style={styles.title}> Settings </Text>,
	  headerRight: (
		<Button 
		  onPress={navigation.getParam('handleEdit')}
		  title="Edit Profile"
		  // color="b"
		/>
	  ),
	};
  };
  _handleExit = () => {
	  AsyncStorage.setItem('modalVisible', JSON.stringify(false));
	  this.setState({ 'modalVisible': JSON.stringify(false) });
  }
  _handleEdit = () => {
		this.setState({'modalVisible': JSON.stringify(true)});

  }
  constructor(props) {
	super(props);
	this.state = {
	  modalVisible: JSON.stringify(false),
	  title: "Welcome to the Gunn Business App!",
	  name: "Name",
	  email: "Email",
	  pagekey: "firstTimeSetup",
	};
  }

  componentDidMount() {
	AsyncStorage.getItem(this.state.pagekey, (err, result) => {
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
	AsyncStorage.setItem(this.state.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
			console.log("error",err,"result",result);
			});
	AsyncStorage.getItem('name').then((value) => this.setState({'name': value }));
	AsyncStorage.getItem('email').then((value) => this.setState({'email': value }));
	AsyncStorage.getItem('modalVisible').then((value) => this.setState({'modalVisible': value }));
	this.props.navigation.setParams({ handleEdit: this._handleEdit });
  }

  setModalVisible(visible) {
	AsyncStorage.setItem('modalVisible', JSON.stringify(visible));
	this.setState({ 'modalVisible': JSON.stringify(visible) });
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
			  visible={JSON.parse(this.state.modalVisible)}
			  onRequestClose={() => {
				alert("Modal has been closed.");
				this._handleExit;
			  }}
			>
			  <View style={styles.ftreContainer}>
				<View style={styles.ftreTitleContainer}>
				  <Text style={styles.ftreTitle}>{this.state.title}</Text>
				</View>
				<View style={styles.ftreDescriptionContainer}>
				  <Text style={styles.ftreDescription} allowFontScaling={true}>
					Full Name
				  </Text>
				  <TextInput
					style={styles.textBox}
					onChangeText={this.setName}
					value={this.state.name}
				  />

				  <ErrorMessage style={{ display: 'none', marginLeft: 20 }}>
				  	Please enter your full name.
			  	  </ErrorMessage>

				  <Text style={styles.ftreDescription} allowFontScaling={true}>
					E-mail
				  </Text>
				  <TextInput
					style={styles.textBox}
					onChangeText={this.setEmail}
					value={this.state.email}
				  />

				  <ErrorMessage style={{ display: 'none', marginLeft: 20 }}>
				  	Please enter a valid email address.
			  	  </ErrorMessage>


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
///////
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	textBox:{
		height:30,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 6,
		marginTop: 8,
		marginBottom: 8,
		marginHorizontal: 20,
		borderRadius: 4,
	},
	ftreContainer:{
		backgroundColor:'#fdfdfd',
		flex:1,
		borderColor:'#823837',
	},
	title:{
		fontSize: 17,
		// color:'b',
		fontWeight:'600',
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
		fontSize:16,
		marginRight:20,
		marginLeft:20,
		marginTop: 16,
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

class ErrorMessage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		    <View style={[ this.props.style, {flexDirection: 'row', alignItems: 'center'} ]}>
			  <Icon.MaterialIcons
				name="error"
				size={this.props.size}
				color="#cb2431"
				/>
		  	  <Text style={{ marginLeft: 4, color: "#cb2431", fontSize: this.props.size }} allowFontScaling={true}>
		  		{this.props.children}
		 	  </Text>
  			</View>
		)
	}
}

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
