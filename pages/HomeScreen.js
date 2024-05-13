import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView ,StyleSheet} from 'react-native';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
  const [hostelerCount, setHostelerCount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);

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
                fee_paid REAL DEFAULT 0.0,
                date_of_joining DATE,
                date_of_leaving DATE
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

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT COUNT(*) AS count, SUM(fee_paid) AS total FROM table_user",
        [],
        (tx, res) => {
          const { count, total } = res.rows.item(0);
          setHostelerCount(count);
          setTotalPaid(total);
          const totalToPay = count * 5000;
          setTotalToPay(totalToPay);
        },
        error => {
          console.log("Error fetching hostelers count and total paid: " + error.message);
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
       
       <View style={styles.box}>
         <Text style={styles.text}>Total Hostelers</Text>
         <Text style={styles.text}>{hostelerCount}</Text>
       </View>
       <View style={styles.box}>
         <Text style={styles.text}>Total Money Remaining</Text>
         <Text style={styles.text}>{totalToPay - totalPaid}</Text>
       </View>
     </View>
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
      

       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, // Adjust the width as needed
    height: 100, // Adjust the height as needed
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
