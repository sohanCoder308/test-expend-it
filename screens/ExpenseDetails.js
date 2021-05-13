import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class ExpenseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: this.props.navigation.getParam('details'),
      month: '',
      date: '',
      year: '',
    };
  }
  getDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    console.log(this.state.details);
    this.setState({
      date: date,
      year: year,
    });
    if (month === 0) {
      this.setState({
        month: 'January',
      });
    } else if (month === 1) {
      this.setState({
        month: 'February',
      });
    } else if (month === 2) {
      this.setState({
        month: 'March',
      });
    } else if (month === 3) {
      this.setState({
        month: 'April',
      });
    } else if (month === 4) {
      this.setState({
        month: 'May',
      });
    } else if (month === 5) {
      this.setState({
        month: 'June',
      });
    } else if (month === 6) {
      this.setState({
        month: 'July',
      });
    } else if (month === 7) {
      this.setState({
        month: 'August',
      });
    } else if (month === 8) {
      this.setState({
        month: 'September',
      });
    } else if (month === 9) {
      this.setState({
        month: 'October',
      });
    } else if (month === 10) {
      this.setState({
        month: 'November',
      });
    } else if (month === 11) {
      this.setState({
        month: 'December',
      });
    }
  }
  componentDidMount() {
    this.getDate();
  }
  render() {
    var { date, month, year } = this.state;
    var properDate = date + ' ' + month + ' ' + year;
    var { details } = this.state;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Expense Details',
            style: { fontWeight: 'bold', fontSize: 18 },
          }}
          leftComponent={
            <Icon
              name={'arrow-back'}
              type={'ionicons'}
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        <ScrollView>
          <Card title={'Your Expense Details'} style={{ fontSize: 20 }}>
            <Text>Amount Spent: ₹ {details.amountSpent}</Text>
            <Text>You spent on: {details.whereSpent}</Text>
            <Text>You preferred: {details.cashorcard}</Text>
            <Text>Date: {details.date}</Text>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
