import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
//import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import Mybutton from './components/Mybutton';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { FontAwesome } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';


const HomeScreen = ({ navigation }) => {
  const [hostelerCount, setHostelerCount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const totalToPay = hostelerCount * 5000; // Assuming each hosteler pays 5000, calculate total amount to pay

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
      <View style={styles.tabBar}>
        {/* Navigation buttons */}
        {/* Each TouchableOpacity represents a navigation button */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Register')}
        >
          {/* <Ionicons name="ios-add-circle" size={24} color="#333" /> */}
         
          <Text style={styles.tabLabel}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Update')}
        >
          {/* <Ionicons name="ios-create" size={24} color="#333" /> */}
          {/* <Ionicons name="create" size={24} color="black" /> */}
          <Text style={styles.tabLabel}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('View')}
        >
          {/* <Ionicons name="ios-eye" size={24} color="#333" /> */}
          {/* <AntDesign name="eye" size={24} color="black" /> */}
          <Text style={styles.tabLabel}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('ViewAll')}
        >
          {/* <Ionicons name="ios-list" size={24} color="#333" /> */}
          {/* <FontAwesome name="list-alt" size={24} color="black" /> */}
          <Text style={styles.tabLabel}>View All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Delete')}
        >
          {/* <Ionicons name="ios-trash" size={24} color="#333" /> */}
          {/* <Feather name="trash-2" size={24} color="black" /> */}
          <Text style={styles.tabLabel}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 5,
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
    marginTop: 40,
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
});

export default HomeScreen;
