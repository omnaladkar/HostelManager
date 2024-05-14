import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
  const [hostelerCount, setHostelerCount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const totalToPay = hostelerCount * 5000; // Assuming each hosteler pays 5000, calculate total amount to pay

  useEffect(() => {
    // Create or open the table_user table
    db.transaction(txn => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS table_user (" +
        "user_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "user_name TEXT," +
        "user_room INTEGER," +
        "user_contact INTEGER," +
        "user_address TEXT," +
        "fee_paid REAL DEFAULT 0.0," +
        "date_of_joining DATE," +
        "date_of_leaving DATE" +
        ");"
      );
    });
  }, []);

  useEffect(() => {
    // Retrieve total hostelers count and total amount paid
    db.transaction(txn => {
      txn.executeSql(
        "SELECT COUNT(*) AS count, SUM(fee_paid) AS total FROM table_user",
        [],
        (tx, res) => {
          const { count, total } = res.rows.item(0);
          setHostelerCount(count);
          setTotalPaid(total);
        },
        error => {
          console.log("Error fetching hostelers count and total paid: " + error.message);
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Laxmi Hostel</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Total Hostelers</Text>
            <Text style={styles.infoText}>{hostelerCount}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Total Money Remaining</Text>
            <Text style={styles.infoText}>{totalToPay - totalPaid}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.tabLabel}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Update')}
        >
          <Text style={styles.tabLabel}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('View')}
        >
          <Text style={styles.tabLabel}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('ViewAll')}
        >
          <Text style={styles.tabLabel}>View All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Delete')}
        >
          <Text style={styles.tabLabel}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  infoBox: {
    backgroundColor: '#ff9f1c',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 30,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});

export default HomeScreen;

