import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import MyTextInput from './components/Mytextinput';
import MyButton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });

const ViewUser = () => {
  const [inputUserName, setInputUserName] = useState('');
  const [userData, setUserData] = useState({});

  const searchUser = () => {
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_name = ?',
        [inputUserName],
        (tx, results) => {
          const len = results.rows.length;
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('No user found');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <MyTextInput
            placeholder="Enter User Name"
            onChangeText={(inputUserName) => setInputUserName(inputUserName)}
            style={styles.textInput}
          />
          <MyButton title="Search User" customClick={searchUser} />
        </View>
        <View style={styles.userDataContainer}>
          <Text style={styles.userInfo}>User Id: {userData.user_id}</Text>
          <Text style={styles.userInfo}>User Name: {userData.user_name}</Text>
          <Text style={styles.userInfo}>User Room No.: {userData.user_room}</Text>
          <Text style={styles.userInfo}>User Contact: {userData.user_contact}</Text>
          <Text style={styles.userInfo}>User Address: {userData.user_address}</Text>
          <Text style={styles.userInfo}>User Remaining : {60000 - userData?.fee_paid || 60000 }</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    margin: 20,
    
  },
  inputContainer: {
   
  },
  textInput: {
    padding: 10,
   
    borderColor: '#ccc',
    borderWidth: 1,
    
  },
  userDataContainer: {
    marginLeft: 35,
    marginRight: 35,
  },
  userInfo: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default ViewUser;
