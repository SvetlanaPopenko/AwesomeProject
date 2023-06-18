import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={require("../../assets/user.jpg")} style={styles.img} />
        <View style={{flex:1, flexDirection:"column"}}>
          <Text style={styles.name}>Ім'я Прізвище</Text>
          <Text style={styles.email}>email@gmail.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.titlePhoto}>{item.titlePhoto}</Text>
            <View style={styles.description}>
              <View style={styles.comments}>
                <TouchableOpacity onPress={()=>navigation.navigate("Comments")}>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginRight: 9 }}
                  />
                </TouchableOpacity>
                <Text style={styles.amount}>0</Text>
              </View>
              <View style={styles.comments}>
                <TouchableOpacity>
                  <Feather
                    name="thumbs-up"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
                <Text style={styles.amount}>10</Text>
              </View>
              <View style={styles.location}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Map", {
                      location: item.location,
                      title: item.titlePhoto,
                      image: item.photo,
                    });
                  }}
                >
                  <Feather
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{ ...styles.amount, textDecorationLine: "underline" }}
                >
                  {item.place}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  user: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 32,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    fontFamily:"Roboto-Medium",
    fontWeight:700,
    fontSize:13,
    lineHeight:15,
    color:"#212121",
  },
  email: {
    fontFamily:"Roboto-Regular",
    fontSize:11,
    lineHeight:12.89,
    color:"#212121",
  },
  imageContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius:8,
    marginBottom:8,
  },
  titlePhoto: {
    marginBottom:11,
    fontFamily:"Roboto-Medium",
    fontSize:16,
    lineHeight:19,
    color:"#212121",
  },
  description: {
    paddingBottom:34,
    flexDirection:"row",
  },
  comments: {
    margin:31,
    flexDirection:"row",
    alignItems:"center",
  },
  amount: {
    fontFamily:"Roboto-Regular",
    fontSize:16,
    lineHeight:19,
    color:"#212121",
  },
  location:{
marginLeft:"auto",
flexDirection:"row",
alignItems:"center",
  },
  });

export default DefaultScreen;
