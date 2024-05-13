import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS table_user (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_name TEXT,
                user_room INTEGER,
                user_contact INTEGER,
                user_address TEXT,
                fee_paid REAL DEFAULT 0.0 -- Add fee_paid column with default value 0.0
              )`,
              [],
              () => {
                console.log("Table created successfully!");
              },
              error => {
                console.log("Error creating table: " + error.message);
              }
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mybutton
            title="Register Hosteler"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update Hosteler"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View Hosteler"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All Hosteler"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete Hosteler"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Example of SQLite Database in React Native
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
