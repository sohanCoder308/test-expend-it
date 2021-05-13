import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      firstName: '',
      lastName: '',
      docId: '',
      limit: '',
      total_amount_spent: '',
    };
  }
  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      .where('email_id', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            firstName: data.first_name,
            lastName: data.last_name,
            userId: data.email_id,
            limit: data.limit,
            total_amount_spent: data.total_amount_spent,
            docId: doc.id,
          });
        });
      });
  };
  updateUserDetails = () => {
    var { limit } = this.state;
    limit = parseInt(this.state.limit);
    db.collection('users').doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      limit: limit,
    });
    alert('Profile Updated Successfully');
  };
  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <MyHeader
            title={'Settings'}
            navigation={this.props.navigation}
            backgroundColor={'orange'}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={'First Name'}
            maxLength={12}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
            value={this.state.firstName}
          />
          <Text style={styles.label}>Last Name </Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={'Last Name'}
            maxLength={12}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
            value={this.state.lastName}
          />
          <Text style={styles.label}>Expenses Limit</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={'Your Expenses Limit Here'}
            maxLength={10}
            onChangeText={(text) => {
              this.setState({
                limit: text,
              });
            }}
            value={this.state.limit}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}>
            <Text style={styles.buttonText}> Save </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  formContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  label: {
    fontSize: RFValue(18),
    color: '#717D7E',
    fontWeight: 'bold',
    padding: RFValue(10),
    marginLeft: RFValue(20),
  },
  formTextInput: {
    width: '90%',
    height: RFValue(50),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    marginBottom: RFValue(20),
    marginLeft: RFValue(20),
  },
  button: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(50),
    backgroundColor: '#32867d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
  buttonView: {
    flex: 0.22,
    alignItems: 'center',
    marginTop: RFValue(100),
  },
  buttonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
  },
});
