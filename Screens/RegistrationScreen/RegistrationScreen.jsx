import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [focusInput, setFocusInput] = useState(null);
  const [passwordShow, setPasswordShow] = useState(true);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const closeKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleFocusInput = (inputName) => {
    setIsShowKeyboard(true);
    setFocusInput(inputName);
  };

  const handleBlurInput = () => {
    setIsShowKeyboard(false);
    setFocusInput(null);
  };

  const isFocusInput = (inputName) => focusInput === inputName;

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/photobg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.box}>
              <View style={styles.avatar}>
                <Image
                  source={require("../../assets/user.jpg")}
                  style={styles.avatarImg}
                />
                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                  <Ionicons name="add" size={20} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -100 : 80,
                }}
              >
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      isFocusInput("login") && styles.inputFocus,
                    ]}
                    placeholder="Логін"
                    placeholderTextColor="#BDBDBD"
                    value={state.login}
                    onFocus={() => handleFocusInput("login")}
                    onBlur={handleBlurInput}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      isFocusInput("email") && styles.inputFocus,
                    ]}
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    value={state.email}
                    onFocus={() => handleFocusInput("email")}
                    onBlur={handleBlurInput}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      isFocusInput("password") && styles.inputFocus,
                    ]}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    value={state.password}
                    secureTextEntry={passwordShow}
                    onFocus={() => handleFocusInput("password")}
                    onBlur={handleBlurInput}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordShow(!passwordShow)}
                    style={styles.btnPasswordShow}
                  >
                    {passwordShow ? (
                      <Text style={styles.passwordShowText}>Показати</Text>
                    ) : (
                      <Text style={styles.passwordShowText}>Приховати</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={keyboardHide}
                >
                  <Text style={styles.textBtn}>Зареєструватися</Text>
                </TouchableOpacity>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже є aкаунт?Увійти
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  box: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    marginTop: "auto",
    paddingTop: 92,
  },
  avatar: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginHorizontal: "auto",
    top: -60,
    width: 120,
    height: 120,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addBtn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
  },
  title: {
    color: "#212121",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
  },
  form: {
    marginHorizontal: 16,
    display: "flex",
    justifyContent: "center",
    gap: 16,
  },
  input: {
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    height: 50,
    color: "#212121",
    fontSize: 16,
  },
  inputFocus: {
    borderColor: "#FF6C00",
  },
  btnPasswordShow: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  passwordShowText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "right",
  },
  button: {
    fontFamily: "Roboto-Regular",
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  text: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});
