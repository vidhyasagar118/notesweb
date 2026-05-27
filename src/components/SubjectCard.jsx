import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';

const AddNoteScreen = ({ files, deleteFile }) => {

  return (

    <ScrollView style={styles.container}>

      <View style={styles.grid}>

        {
          Array.isArray(files) && files.map((file, index) => (

            <View key={file._id} style={styles.card}>

              <Text style={styles.filename}>
                {file.filename}
              </Text>

              <View style={styles.buttons}>

                {/* VIEW */}
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    Linking.openURL(
                      file.filepath + '#toolbar=0'
                    )
                  }
                >
                  <Text style={styles.btnText}>View</Text>
                </TouchableOpacity>

                {/* DOWNLOAD */}
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() =>
                    Linking.openURL(file.downloadUrl)
                  }
                >
                  <Text style={styles.btnText}>Download</Text>
                </TouchableOpacity>

                {/* DELETE */}
                {
                  deleteFile && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteFile(file._id)}
                    >
                      <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                  )
                }

              </View>

            </View>
          ))
        }

      </View>

    </ScrollView>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  grid: {
    padding: 15,
    gap: 15,
  },

  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },

  filename: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  viewButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
  },

  downloadButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
  },

  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
  },

  btnText: {
    color: '#fff',
    fontSize: 14,
  },

});