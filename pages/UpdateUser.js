import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView, Text } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const UpdateUser = ({ navigation }) => {
  let [inputUserName, setInputUserName] = useState("");
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userRoom, setUserRoom] = useState('');
  let [feePaid, setFeePaid] = useState('');

  let updateAllStates = (name, contact, address, room, fee) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
    setUserRoom(room);
    setFeePaid(fee);
  };

  let searchUser = () => {
    console.log(inputUserName);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_name = ?',
        [inputUserName],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_contact, res.user_address, res.user_room, res.fee_paid);
          } else {
            Alert.alert('No user found');
            updateAllStates('', '', '', '', '');
          }
        },
      );
    });
  };

  let updateUser = () => {
    console.log(inputUserName, userName, userContact, userAddress, userRoom, feePaid);

    if (!inputUserName) {
      alert('Please fill User name');
      return;
    }
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userRoom) {
      alert('Please fill Room');
      return;
    }
  
    if (parseFloat(feePaid) < 60000) {
      Alert.alert(
        'Warning',
        'Fee paid is less than 60000. Please pay the due amount.',
        [
          {
            text: 'Ok',
            onPress: () => updateUserInDatabase(),
          },
        ],
        { cancelable: false },
      );
    } else {
      updateUserInDatabase();
    }
  };

  let updateUserInDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_room=?, user_contact=?, user_address=?, fee_paid=? where user_name=?',
        [userName, userRoom, userContact, userAddress, feePaid, inputUserName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false },
            );
          } else {
            alert('Updation Failed');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter User Name"
                style={{ padding: 10 }}
                onChangeText={(inputUserName) => setInputUserName(inputUserName)}
              />
              <Mybutton title="Search User" customClick={searchUser} />
              <Mytextinput
                placeholder="Enter Name"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={(userName) => setUserName(userName)}
              />
              <Mytextinput
                placeholder="Enter Room"
                value={'' + userRoom}
                style={{ padding: 10 }}
                onChangeText={(userRoom) => setUserRoom(userRoom)}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                value={'' + userContact}
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userAddress}
                placeholder="Enter Address"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                value={'' + feePaid}
                placeholder="Enter Fee Paid"
                onChangeText={(feePaid) => setFeePaid(feePaid)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mybutton title="Update User" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;


