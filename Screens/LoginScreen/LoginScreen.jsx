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

export default function LoginScreen() {
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
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title}>Увійти</Text>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 170 : 80,
              }}
            >             
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
                <Text style={styles.text}>Зареєструватися</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Немає акаунту? Зареєструватися</Text>
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
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily:'Roboto-Regular',
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
    fontFamily:'Roboto-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
  },
  button: {
    fontFamily:'Roboto-Regular',
    backgroundColor: "#FF6C00",
    height: 40,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
});