import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUser = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userRoom, setUserRoom] = useState('');
  const [feePaid, setFeePaid] = useState(''); // Add state for fee paid

  const register_user = () => {
    console.log(userName, userContact, userAddress, userRoom, feePaid);

    if (!userName || !userContact || !userAddress || !userRoom || !feePaid) {
      Alert.alert('Please fill all fields');
      return;
    }

    const roomNumber = parseInt(userRoom, 10);
    const contactNumber = parseInt(userContact, 10);
    const paidAmount = parseFloat(feePaid); // Convert feePaid to float

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_room, user_contact, user_address, fee_paid) VALUES (?, ?, ?, ?, ?)',
        [userName, roomNumber, contactNumber, userAddress, paidAmount],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                { text: 'Ok', onPress: () => navigation.navigate('HomeScreen') },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert('Error', 'Registration Failed');
          }
        },
        (error) => {
          Alert.alert('Error', `Failed to register user: ${error.message}`);
          console.log(error.message);
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={setUserName}
              style={{ padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Room No"
              onChangeText={setUserRoom}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={setUserContact}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Address"
              onChangeText={setUserAddress}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top', padding: 10 }}
            />
            <Mytextinput
              placeholder="Enter Fee Paid"
              onChangeText={setFeePaid}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding: 10 }}
            />
            <Mybutton title="Submit" customClick={register_user} />
          </KeyboardAvoidingView>
        </ScrollView>
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

export default RegisterUser;
