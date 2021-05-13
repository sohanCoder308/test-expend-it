import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Header, Input, Icon } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      isModalVisible: false,
    };
  }
  handleLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('ViewExpenses');
        //alert('Successfully Logged In.');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  handleSignUp = () => {
    this.setState({ isModalVisible: true });
    this.handleSubmit();
  };
  handleSubmit = () => {
    var { firstName, lastName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password doesn't match/n Please check your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('users').add({
            first_name: firstName,
            last_name: lastName,
            email_id: email,
            total_amount_spent: 0,
            limit: 10000,
          });
          alert('User Added Successfully', ' ', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.container}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.upperContainer}>
              <Text style={styles.title}>Registration</Text>
              <Icon
                name={'cross'}
                type={'entypo'}
                size={50}
                color={'purple'}
                containerStyle={styles.icon}
                onPress={() => this.setState({ isModalVisible: false })}
              />
              <TextInput
                placeholder={'   First Name'}
                style={styles.input}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
                value={this.state.firstName}
              />
              <TextInput
                placeholder={'   Last Name'}
                style={styles.input}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
                value={this.state.lastName}
              />
              <TextInput
                placeholder={'   abc@example.com'}
                style={styles.input}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    email: text,
                  });
                }}
                value={this.state.email}
              />
              <TextInput
                placeholder={'   Password'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
                value={this.state.password}
              />
              <TextInput
                placeholder={'   Confirm Password'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
                value={this.state.confirmPassword}
              />
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.handleSignUp()}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    var { email, password, isModalVisible } = this.state;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'pink' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              fontSize: 27,
              color: 'black',
              backgroundColor: 'pink',
              marginTop: 80,
              marginBottom: 40,
              fontWeight: 'bold',
            }}>
            Welcome to Expendit !
          </Text>

          <Input
            containerStyle={{
              width: '90%',
              height: 55,
              borderWidth: 1.5,
              borderColor: 'purple',
              marginBottom: 10,
              borderRadius: 25,
              borderWidth: 2.5,
            }}
            inputContainerStyle={{ borderBottomWidth: 0, height: 55 }}
            placeholder={'  abc@example.com'}
            leftIcon={<Icon name={'email'} />}
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
            value={this.state.email}
          />
          <Input
            containerStyle={{
              width: '90%',
              height: 55,
              borderWidth: 1.5,
              borderColor: 'purple',
              marginBottom: 10,
              borderRadius: 25,
              borderWidth: 2.5,
            }}
            inputContainerStyle={{ borderBottomWidth: 0, height: 55 }}
            placeholder={'  Enter your password'}
            secureTextEntry={true}
            leftIcon={<Icon name={'lock'} />}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.handleLogin(this.state.email, this.state.password);
            }}>
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle1}
            onPress={() => this.handleSignUp()}>
            <Text style={styles.buttonText1}>
              Don't have an accout? Sign Up here.
            </Text>
          </TouchableOpacity>
        </View>
        {this.showModal()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*borderTopLeftRadius: 45,
    borderTopRightRadius: 45,*/
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginTop: 50,
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: 'purple',
    marginTop: 30,
  },
  icon: {
    position: 'absolute',
    left: 150,
    top: 0,
    bottom: 20,
  },
  input: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '400',
    width: '80%',
    height: 55,
    borderWidth: 1.5,
    borderColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2.5,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
  },
  buttonStyle: {
    width: '75%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'purple',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginBottom: 18.8,
  },
  buttonText1: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
});
