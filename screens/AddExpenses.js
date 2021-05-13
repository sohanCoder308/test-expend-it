import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Picker,
} from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import db from '../config';

export default class AddExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: firebase.auth().currentUser.email,
      whereSpent: '',
      amountSpent: '',
      cashorcard: '',
      totalAm: this.props.navigation.getParam('totalAm'),
      docId: '',
      limit: '',
    };
  }
  createAlert = () => {
    alert('Expense Added Successfully.');
    this.setState({
      whereSpent: '',
      amountSpent: '',
      cashorcard: '',
    });
  };
  getDocId = () => {
    db.collection('users')
      .where('email_id', '==', this.state.user_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            docId: doc.id,
            limit: data.limit,
          });
        });
        console.log(this.state.limit);
        this.updateTotalAmount();
      });
  };
  updateTotalAmount = () => {
    db.collection('users').doc(this.state.docId).update({
      total_amount_spent: this.state.totalAm,
    });
  };
  componentDidMount() {
    this.getDocId();
  }
  addExpenses = () => {
    var { limit, totalAm, docId, user_id, cashorcard } = this.state;
    if (totalAm >= limit) {
      alert(
        'You have exceeded your limit. To increase your limit go to settings.'
      );
    } else {
      console.log(cashorcard);
      if (
        this.state.cashorcard === 'Cash' ||
        this.state.cashorcard === 'Card'
      ) {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var dateOfExpense = day + '-' + month + '-' + year;
        db.collection('expenses').add({
          whereSpent: this.state.whereSpent,
          amountSpent: this.state.amountSpent,
          cashorcard: this.state.cashorcard,
          userId: this.state.user_id,
          status: 'unread',
          date: dateOfExpense,
        });
        this.createAlert();
      } else {
        alert('Please select expense type.');
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.totalAm >= this.state.limit ? (
          <View>
            <Header
              leftComponent={
                <Icon
                  name={'arrow-back'}
                  type={'ionicons'}
                  color={'black'}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                />
              }
              centerComponent={{
                text: 'Add Your Expenses',
                style: { fontWeight: 'bold', fontSize: 18 },
              }}
              backgroundColor={'orange'}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                You have exceeded your limit. To increase your limit go to
                settings and increase your expenses limit.
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Header
                leftComponent={
                  <Icon
                    name={'arrow-back'}
                    type={'ionicons'}
                    color={'black'}
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                  />
                }
                centerComponent={{
                  text: 'Add Your Expenses',
                  style: { fontWeight: 'bold', fontSize: 18 },
                }}
                backgroundColor={'orange'}
              />
            </View>
            <View style={styles.container}>
              <Input
                placeholder={'  Amout you spent..'}
                leftIcon={<Icon name={'rupee'} type={'font-awesome'} />}
                onChangeText={(amountText) => {
                  this.setState({
                    amountSpent: amountText,
                  });
                }}
                value={this.state.amountSpent}
              />
              <Input
                placeholder={'  Where did you spend ?'}
                leftIcon={<Icon name={'money'} type={'font-awesome'} />}
                onChangeText={(whereText) => {
                  this.setState({
                    whereSpent: whereText,
                  });
                }}
                value={this.state.whereSpent}
              />
              <Picker
                style={{ height: 50, width: '100%' }}
                containerStyle={{ marginLeft: '40%' }}
                onValueChange={(selectedValue) =>
                  this.setState({ cashorcard: selectedValue })
                }>
                <Picker.Item label="Select your expense type" value="none-" />
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="Card" value="Card" />
              </Picker>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.addExpenses()}>
                <Text style={styles.buttonText}>Add Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
  },
});
