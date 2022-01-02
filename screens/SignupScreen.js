import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    Button as RNButton,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, InputField, ErrorMessage } from "../components";
import auth from "../config/firebase";
export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState("eye");
    const [signupError, setSignupError] = useState("");

    const handlePasswordVisibility = () => {
        if (rightIcon === "eye") {
            setRightIcon("eye-off");
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === "eye-off") {
            setRightIcon("eye");
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onHandleSignup = async () => {
        try {
            if (email !== "" && password !== "") {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setSignupError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark-content" />
            <Image
                source={{
                    uri: "https://reactnative.dev/docs/assets/p_cat2.png",
                }}
                style={{
                    width: 200,
                    height: 200,
                    display: "flex",
                    alignSelf: "center",
                }}
            />
            <Text style={styles.title}>Create new account</Text>
            <InputField
                inputStyle={{
                    fontSize: 14,
                }}
                containerStyle={{
                    backgroundColor: "#fff",
                    marginBottom: 20,
                }}
                leftIcon="email"
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <InputField
                inputStyle={{
                    fontSize: 14,
                }}
                containerStyle={{
                    backgroundColor: "#fff",
                    marginBottom: 20,
                }}
                leftIcon="lock"
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="password"
                rightIcon={rightIcon}
                value={password}
                onChangeText={(text) => setPassword(text)}
                handlePasswordVisibility={handlePasswordVisibility}
            />
            {signupError ? (
                <ErrorMessage error={signupError} visible={true} />
            ) : null}
            <Button
                onPress={onHandleSignup}
                backgroundColor="#5CB3CF"
                title="Signup"
                tileColor="#fff"
                titleSize={20}
                containerStyle={{
                    marginBottom: 24,
                }}
            />

            <RNButton
                onPress={() => navigation.navigate("Login")}
                title="Go to Login"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 12,
        // borderWidth: 5,
        // borderColor: "red",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
        alignSelf: "center",
        paddingBottom: 24,
    },
});
