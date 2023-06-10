import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [focusInput, setFocusInput] = useState(null);
  const[passwordShow, setPasswordShow]=useState(true);

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
            <Text style={styles.title}>Реєстрація</Text>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 180 : 80,
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
                    isFocusInput("email") && styles.inputFocus,
                  ]}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  value={state.password}
                  secureTextEntry={true}
                  onFocus={() => handleFocusInput("password")}
                  onBlur={handleBlurInput}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity onPress={()=>setPasswordShow(!passwordShow)} style={styles.btnPasswordShow}>
                  {passwordShow ? (
                    <Text style={styles.passwordShowText}>Показати</Text>
                  ): (
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
              <Text style={styles.text}>Вже є aкаунт?Увійти</Text>
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  textBtn: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems:"center",
  },
  form: {
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    color: "#212121",
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
  },
  input: {
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    color: "#212121",
    fontSize: 16,
  },
  inputFocus: {
    borderColor: "#FF6C00",
  },
  button: {
    fontFamily: "Roboto-Regular",
    backgroundColor: "#FF6C00",
    height: 40,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 108,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  btnPasswordShow:{
position:"absolute",
right:16,
top:16,
  },
  passwordShowText:{
    fontFamily:"Roboto-Regular",
    fontSize:16,
        color:"1B4371",
        textAlign:"right",
  }
});
