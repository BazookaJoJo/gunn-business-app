//import FtreScreen from '../screens/FtreScreen';
import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Button,
  Modal,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Picker,
  TouchableHighlight
} from "react-native";
import Touchable from "react-native-platform-touchable";
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from "expo";

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.title}> Settings </Text>,
      headerRight: (
        <Button
          onPress={navigation.getParam("handleEdit")}
          title="Edit Profile"
          // color="b"
        />
      )
    };
  };
  //
  _handleExit = () => {
    AsyncStorage.setItem("modalVisible", JSON.stringify(false));
    this.setState({ modalVisible: JSON.stringify(false) });
  };
  _handleEdit = () => {
    this.setState({ modalVisible: JSON.stringify(true) });
  };
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      modalVisible: JSON.stringify(false),
      title: "Welcome to the Gunn Business App!",
      name: "",
      email: "",
      pagekey: "firstTimeSetup",
      nameError: "none",
      emailError: "none",
      pemailError: "none",
      phoneError: "none",
      genderError: "none",
      grade: "",
      gender: "",
      pemail: "",
      phone: 0,
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
    AsyncStorage.setItem(
      this.state.pagekey,
      JSON.stringify({ value: "true" }),
      (err, result) => {
        console.log("error", err, "result", result);
      }
    );
    AsyncStorage.getItem("name").then(value => this.setState({ name: value }));
    AsyncStorage.getItem("email").then(value => this.setState({ email: value }));
    AsyncStorage.getItem("pemail").then(value => this.setState({ pemail: value }));
    AsyncStorage.getItem("phone").then(value => this.setState({ phone: value }));
    AsyncStorage.getItem("modalVisible").then(value =>
      this.setState({ modalVisible: value })
    );
    this.props.navigation.setParams({ handleEdit: this._handleEdit });
  }

  setModalVisible(visible) {
    AsyncStorage.setItem("modalVisible", JSON.stringify(visible));
    this.setState({ modalVisible: JSON.stringify(visible) });
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
        		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            	<View style={styles.ftreContainer}>
	              <View style={styles.ftreTitleContainer}>
	                <Text style={styles.ftreTitle}>{this.state.title}</Text>
	              </View>
	              <View style={styles.ftreInstructionsContainer}>
	                <Text style={styles.ftreInstructions} allowFontScaling={true}>
	                  Please enter the following information for us.
	                </Text>
	              </View>
	              <ScrollView style={styles.ftreDescriptionContainer}>
	                <Text style={styles.ftreDescription} allowFontScaling={true}>
	                  Full Name
	                </Text>
	                <TextInput
                    ref={(el) => {
                        this.inputRefs.name = el;
                    }}
	                  style={styles.textBox}
	                  value={this.state.name}
                    returnKeyType="next"
                    enablesReturnKeyAutomatically
                    onSubmitEditing={() => {
                        this.inputRefs.grade.togglePicker();
                    }}
                    onChangeText={(value) => {
                    	AsyncStorage.setItem('name', value);
                        this.setState({ 'name': value });
                    }}
	                />

	                <ErrorMessage style={{ display: this.state.nameError, marginLeft: 20 }}>
	                  Please enter your full name.
	                </ErrorMessage>

	                <Text style={styles.ftreDescription} allowFontScaling={true}>
	                  Grade
	                </Text>
	                <RNPickerSelect
                    ref={(el) => {
                        this.inputRefs.grade = el;
                    }}
                    placeholder={{
                        label: 'Select a grade',
                        value: null,
                    }}
                    items={[
                    	{ label: '9', value: '9' },
                    	{ label: '10', value: '10' },
                    	{ label: '11', value: '11' },
                    	{ label: '12', value: '12' }
                    ]}
                    onValueChange={(value) => {
                    	AsyncStorage.setItem('grade', value);
                        this.setState({ 'grade': value });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.name.focus();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.email.focus();
                    }}
                    style={{inputIOS: [{color: 'black'}, styles.textBox]}}
                    value={this.state.grade}
                    hideIcon={true}
                	/>
	                <ErrorMessage style={{ display: this.state.genderError, marginLeft: 20 }}>
	                  Please choose a grade.
	                </ErrorMessage>

	                <Text style={styles.ftreDescription} allowFontScaling={true}>
	                  Your e-mail
	                </Text>
	                <TextInput
                    ref={(el) => {
                        this.inputRefs.email = el;
                    }}
	                  style={styles.textBox}
	                  value={this.state.email}
	                  keyboardType="email-address"
                    returnKeyType="next"
                    enablesReturnKeyAutomatically
                    onSubmitEditing={() => {
                        this.inputRefs.pemail.focus();
                    }}
                    onChangeText={(value) => {
                    	AsyncStorage.setItem('email', value);
                        this.setState({ 'email': value });
                    }}
	                />
	                <ErrorMessage style={{ display: this.state.emailError, marginLeft: 20 }}>
	                  Please enter a valid email address.
	                </ErrorMessage>

	                <Text style={styles.ftreDescription} allowFontScaling={true}>
	                  Parent's e-mail
	                </Text>
	                <TextInput
                    ref={(el) => {
                        this.inputRefs.pemail = el;
                    }}
	                  style={styles.textBox}
	                  value={this.state.pemail}
	                  keyboardType="email-address"
                    returnKeyType="next"
                    enablesReturnKeyAutomatically
                    onSubmitEditing={() => {
                        this.inputRefs.phone.focus();
                    }}
                    onChangeText={(value) => {
                    	AsyncStorage.setItem('pemail', value);
                        this.setState({ 'pemail': value });
                    }}
	                />
	                <ErrorMessage style={{ display: this.state.pemailError, marginLeft: 20 }}>
	                  Please enter a valid email address.
	                </ErrorMessage>

	                <Text style={styles.ftreDescription} allowFontScaling={true}>
	                  Your phone number
	                </Text>
	                <TextInput
                    ref={(el) => {
                        this.inputRefs.phone = el;
                    }}
	                style={styles.textBox}
	                value={this.state.phone}
	                keyboardType="phone-pad"
	                returnKeyType="done"
	                onChangeText={(value) => {
	                  AsyncStorage.setItem('phone', value);
	                  this.setState({ 'phone': value });
                    }}
	                />
	                <ErrorMessage style={{ display: this.state.phoneError, marginLeft: 20 }}>
	                  Please enter a valid phone number.
	                </ErrorMessage>

	                <Text style={styles.ftreDescription} allowFontScaling={true}>
	                  Gender
	                </Text>
	                <RNPickerSelect
                    ref={(el) => {
                        this.inputRefs.gender = el;
                    }}
                    placeholder={{
                        label: 'Select a gender',
                        value: null,
                    }}
                    items={[
                    	{ label: 'Male', value: 'male' },
                    	{ label: 'Female', value: 'female' }
                    ]}
                    onValueChange={(value) => {
                    	AsyncStorage.setItem('gender', value);
                        this.setState({ 'gender': value });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.phone.focus();
                    }}
                    // onDownArrow={() => {
                    //     this.inputRefs.picker2.togglePicker();
                    // }}
                    style={{inputIOS: [{color: 'black'}, styles.textBox]}}
                    value={this.state.gender}
                    hideIcon={true}
                	/>
	                <ErrorMessage style={{ display: this.state.genderError, marginLeft: 20 }}>
	                  Please choose a gender.
	                </ErrorMessage>
	              </ScrollView>

	              <View style={styles.ftreExitContainer}>
	                <TouchableHighlight onPress={this.onExitButton}>
	                  <View style={styles.ftreExitButtonContainer}>
	                    <Text style={styles.ftreExitButtonText}>Done</Text>
	                  </View>
	                </TouchableHighlight>
	              </View>
	            </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.font}>Name</Text>
          <Text style={styles.font}>{this.state.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.font}>Email</Text>
          <Text style={styles.font}>{this.state.email}</Text>
        </View>
      </View>
    );
  }
  validName = name => {
    var re = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/;
    return re.test(name);
  };
  validPhone = phone => {
    var re = /^[0]?[0-9]\d{9}$/;
    return re.test(phone);
  };
  validEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  onExitButton = () => {
    //validate form
    // console.log(this.inputRefs);
    (this.validName(this.state.name)) ? this.setState({nameError: "none"}) : this.setState({nameError: "flex"});
    (this.validEmail(this.state.email)) ? this.setState({emailError: "none"}) : this.setState({emailError: "flex"});
    (this.validEmail(this.state.pemail)) ? this.setState({pemailError: "none"}) : this.setState({pemailError: "flex"});
    (this.validPhone(this.state.phone)) ? this.setState({phoneError: "none"}) : this.setState({phoneError: "flex"});
    (this.state.grade!=null) ? this.setState({gradeError: "none"}) : this.setState({gradeError: "flex"});
    (this.state.gender!=null) ? this.setState({genderError: "none"}) : this.setState({genderError: "flex"});
    // this.setState({Error: "flex"})
    // this.setModalVisible(!this.state.modalVisible);
  };

  
}
//////
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textBox: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    padding: 6,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: 20,
    borderRadius: 4
  },
  ftreContainer: {
    backgroundColor: "#fdfdfd",
    flex: 1,
    borderColor: "#823837"
  },
  title: {
    fontSize: 17,
    // color:'b',
    fontWeight: "600"
  },
  font: {
    fontSize: 15,
    textAlign: "left"
  },
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd"
  },
  infoContainer: {
    backgroundColor: "#fdfdfd",
    marginTop: 30
  },
  ftreTitle: {
    color: "#823837",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  ftreDescription: {
    color: "#823837",
    fontSize: 16,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 10
  },
  ftreCloseIcon: {
    alignSelf: "flex-end",
    flex: 0.5,
    marginRight: 10
  },
  ftreTitleContainer: {
    paddingTop: 30,
    flex: 0.05,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  ftreInstructionsContainer: {
    flex: 0.05,
    marginBottom: 15
  },
  ftreInstructions: {
    fontWeight: "500",
    color: "#823837",
    fontSize: 16,
    marginRight: 20,
    marginLeft: 20,
    textAlign: "center"
  },
  ftreDescriptionContainer: {
    flex: .55,
    marginTop: 0
  },
  ftreExitContainer: {
    flex: 0.15,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
    padding: 10
  },
  ftreExitButtonContainer: {
    width: 200,
    height: 40,
    backgroundColor: "#823837",
    borderRadius: 10,
    justifyContent: "center"
  },
  ftreExitButtonText: {
    color: "#fdfdfd",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={[
          this.props.style,
          { flexDirection: "row", alignItems: "center" }
        ]}
      >
        <Icon.MaterialIcons
          name="error"
          size={this.props.size}
          color="#cb2431"
        />
        <Text
          style={{ marginLeft: 4, color: "#cb2431", fontSize: this.props.size }}
          allowFontScaling={true}
        >
          {this.props.children}
        </Text>
      </View>
    );
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
