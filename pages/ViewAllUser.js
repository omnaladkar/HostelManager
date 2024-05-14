import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewAllUser = () => {
  const [flatListItems, setFlatListItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  const toggleModal = (item) => {
    setSelectedItem(item);
  };

  let listItemView = (item) => {
    return (
      <TouchableOpacity onPress={() => toggleModal(item)} style={styles.listItemContainer}>
        <Text style={styles.itemText}>Name: {item.user_name}</Text>
        <Text style={styles.itemText}>Room No: {item.user_room}</Text>
        <Text style={styles.itemText}>Remaining: {60000 - item.fee_paid}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={{ uri: 'https://your-image-url.com/background.jpg' }} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
          contentContainerStyle={styles.flatListContainer}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedItem !== null}
          onRequestClose={() => {
            toggleModal(null);
          }}
        >
          <SafeAreaView style={styles.modalContainer}>
            <TouchableOpacity onPress={() => toggleModal(null)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            {selectedItem && (
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Details</Text>
                <Text style={styles.modalText}>Id: {selectedItem.user_id}</Text>
                <Text style={styles.modalText}>Name: {selectedItem.user_name}</Text>
                <Text style={styles.modalText}>Room: {selectedItem.user_room}</Text>
                <Text style={styles.modalText}>Contact: {selectedItem.user_contact}</Text>
                <Text style={styles.modalText}>Fees Paid till date: {selectedItem.fee_paid}</Text>
                <Text style={styles.modalText}>Address: {selectedItem.user_address}</Text>
              </View>
            )}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white
    padding: 10,
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
  listItemContainer: {
    backgroundColor: '#ffdfba',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ffa07a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  closeButton: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginRight: 16,
  },
});

export default ViewAllUser;
