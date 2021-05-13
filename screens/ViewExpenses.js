import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Icon, ListItem, Header } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class ViewExpenses extends Component {
  constructor() {
    super();
    this.state = {
      user_id: firebase.auth().currentUser.email,
      expenses: [],
      totalAm: 'sohan',
    };
    this.expensesRef = null;
  }
  markAsRead = (details) => {
    db.collection('expenses').doc(details.doc_id).update({
      status: 'read',
    });
  };
  updateAmountSpent() {
    db.collection('users').where('email_id', '==', this.state.user_id).update({
      total_amount_spent: 10,
    });
  }
  getAllExpenses = () => {
    this.expensesRef = db
      .collection('expenses')
      .where('userId', '==', this.state.user_id)
      .where('status', '==', 'unread')
      .onSnapshot((snapshot) => {
        var expenses = [];
        snapshot.docs.map((doc) => {
          var expense = doc.data();
          expense['doc_id'] = doc.id;
          expenses.push(expense);
        });
        this.setState({
          expenses: expenses,
        });
      });
  };
  componentDidMount() {
    this.getAllExpenses();
  }
  componentWillUnmount() {
    this.expensesRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={'Spent: ₹' + item.amountSpent}
        subtitle={'Spent On: ' + item.whereSpent}
        containerStyle={{ borderRadius: 30 }}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ExpenseDetails', {
                details: item,
              });
            }}>
            <Text>View Expense Details</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };
  render() {
    var { expenses } = this.state;
    var amount = 0;
    var totalAm = 0;
    for (var i in expenses) {
      amount = parseInt(expenses[i].amountSpent);
      totalAm += amount;
    }
    return (
      <View style={styles.container}>
        <View>
          <MyHeader
            title="View Expenses"
            navigation={this.props.navigation}
            backgroundColor={'white'}
          />
        </View>
        <View style={{ alignItems: 'left' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Total Amount Spent: {totalAm}
          </Text>
        </View>
        <ScrollView style={styles.subContainer}>
          {this.state.expenses.length === 0 ? (
            <View style={styles.textContainer}>
              <Text>You have not added any expenses.</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.expenses}
              renderItem={this.renderItem}
            />
          )}
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              this.props.navigation.navigate('AddExpenses', {
                totalAm: totalAm,
              })
            }>
            <Icon name={'circle-with-plus'} type={'entypo'} size={40} />
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
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonStyle: {
    marginLeft: 250,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
