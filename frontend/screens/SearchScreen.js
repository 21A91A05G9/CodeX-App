import React, { useState } from "react";
import { 
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  
  // State variables for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Login"); // Replace with your login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleChangePassword = async () => {
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
  
    try {
      // Retrieve the user's email from AsyncStorage
      const email = await AsyncStorage.getItem("userEmail"); // Ensure you have stored this during login
      console.log(email);
      console.log("Sending password change request...");
  
      const response = await fetch("http://192.168.1.6:5000/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,           // Include the email in the request
          currentPassword,
          newPassword,
        }),
      });
  
      console.log("Response Status:", response.status);
      const data = await response.json();
      
      if (response.ok) {
        alert("Password changed successfully!");
        setChangePasswordModalVisible(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Error changing password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing password.");
    }
  };
  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../assets/user.png")}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../assets/edit.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      {/* Profile Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../assets/close.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>
                Save Changes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => {
          setLogoutModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to logout?</Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={[styles.button, styles.yesButton]}
                onPress={() => {
                  setLogoutModalVisible(false);
                  handleLogout();
                }}
              >
                <Text style={[styles.buttonText, styles.yesButtonText]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.noButton]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={[styles.buttonText, styles.noButtonText]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => {
          setChangePasswordModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setChangePasswordModalVisible(false)}
            >
              <Image
                source={require("../assets/close.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={currentPassword} // Bind to state
              onChangeText={setCurrentPassword} // Update state
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={newPassword} // Bind to state
              onChangeText={setNewPassword} // Update state
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword} // Bind to state
              onChangeText={setConfirmPassword} // Update state
            />
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleChangePassword}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>
                Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setChangePasswordModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.body}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setChangePasswordModalVisible(true)} 
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLogoutModalVisible(true)} 
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 10,
    padding: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    padding: 5,
    borderWidth: 0.5,
    borderColor: "black",
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  body: {
    padding: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  cancelButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  saveButton: {
    backgroundColor: "black",
  },
  saveButtonText: {
    color: "white",
  },
  confirmationButtons: {
    flexDirection: "row",
    justifyContent: "space-between", // Align the Yes and No buttons side by side
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: "black",
    flex: 0.45, // Make the Yes button take up about half of the space
  },
  yesButtonText: {
    color: "white",
  },
  noButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "black",
    flex: 0.45, // Make the No button take up about half of the space
  },
  noButtonText: {
    color: "black",
  },
});

export default SearchScreen;
