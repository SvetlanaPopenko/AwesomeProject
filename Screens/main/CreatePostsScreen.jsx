import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [titlePhoto, setTitlePhoto] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let locationData = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    navigation.navigate("Default", {
      photo,
      location,
      titlePhoto,
      place,
    });
    setPhoto("");
    setTitlePhoto("");
    setLocation("");
    setPlace("");
  };

  const deletePhoto = () => {
    setPhoto("");
    setTitlePhoto("");
    setLocation("");
    setPlace("");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Немає доступу до камери!</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={setCameraRef}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                style={{ width: "100%", height: 240, borderRadius: 8 }}
                source={{ uri: photo }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <Text style={{ ...styles.title, marginBottom: 32 }}>
        {photo ? "Редагувати фото" : "Завантажте фото"}
      </Text>
      <TextInput
        style={{ ...styles.input, marginBottom: 16, fontFamily:"Roboto-Medium" }}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
        value={titlePhoto}
        onChangeText={setTitlePhoto}
      />
      <View style={{ position: "relative", marginBottom: 32 }}>
        <TextInput
          style={{ ...styles.input, paddingLeft: 28 }}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
          value={place}
          onChangeText={setPlace}
        />
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={{ position: "absolute", bottom: 13 }}
        />
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={sendPhoto}
          style={
            photo
              ? { ...styles.sendButton, backgroundColor: "#FF6C00" }
              : styles.sendButton
          }
        >
          <Text
            style={photo ? { ...styles.title, color: "#FFFFFF" } : styles.title}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  cameraContainer: {
    position: "relative",
    marginTop: 32,
    marginBottom: 8,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
    title: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    height: 49,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
    backgroundColor: "#FFFFFF",
  },
  sendButton: {
    height: 51,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  deleteButton: {
    width: 70,
    height: 40,
    marginBottom: 34,
    marginLeft: "auto",
    marginRight:"auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
