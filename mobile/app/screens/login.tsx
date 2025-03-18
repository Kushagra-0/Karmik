import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor } from "../common/constant";
import { baseUrl } from "../common/constant";
// import { Eye, EyeOff } from "react-native-feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
    // //   const { setToken } = useAuth();  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();


    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/auth/login`, { email, password });
            const { token } = response.data

            await AsyncStorage.setItem("authToken", token);
            console.log("Token stored:", token);

            router.push("/screens/dashboard");
            //   setToken(response.data.token);
            router.navigate("/screens/dashboard");
        } catch (err) {
            setError("Invalid credentials");
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: secondaryColor }}>
            <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, width: 320, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#4b5563", marginBottom: 20 }}>Welcome Back</Text>

                <Text style={{ color: "#4b5563", marginBottom: 5 }}>Email</Text>
                <TextInput
                    style={{ width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, borderColor: "#e5e7eb", marginBottom: 15 }}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={{ color: "#4b5563", marginBottom: 5 }}>Password</Text>
                <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 5, borderColor: "#e5e7eb", marginBottom: 15, paddingHorizontal: 10 }}>
                    <TextInput
                        style={{ flex: 1, paddingVertical: 10 }}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff width={20} height={20} color="#4b5563" /> : <Eye width={20} height={20} color="#4b5563" />}
                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    style={{ width: "100%", padding: 12, borderRadius: 5, backgroundColor: isLoading ? "#9ca3af" : primaryColor, alignItems: "center" }}
                    disabled={isLoading}
                >
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>}
                </TouchableOpacity>

                {error && <Text style={{ color: "#dc2626", textAlign: "center", marginTop: 10 }}>{error}</Text>}

                <Text style={{ textAlign: "center", color: "#4b5563", marginTop: 15 }}>
                    Don't have an account?
                    <Text onPress={() => router.navigate("/screens/register")} style={{ color: primaryColor, fontWeight: "bold" }}> Register</Text>
                </Text>
            </View>
        </View>
    );
};

export default LoginScreen;