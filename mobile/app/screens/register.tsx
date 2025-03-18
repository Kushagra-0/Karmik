import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../common/constant";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { primaryColor, secondaryColor } from "../common/constant";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await axios.post(`${baseUrl}/api/auth/register`, { email, password });
            console.log("Registration successful:", response.data);
            router.navigate("/screens/login");
        } catch (err: any) {
            console.error("Registration error:", err.message, err.response?.data);
            setError("Error registering user. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: secondaryColor }}>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 320, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#4A5568", marginBottom: 10 }}>Create an Account</Text>

                <Text style={{ color: "#4A5568", marginBottom: 5 }}>Email</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 15, borderColor: "#CBD5E0", width: "100%" }}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={{ color: "#4A5568", marginBottom: 5 }}>Password</Text>
                <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 5, borderColor: "#CBD5E0", width: "100%" }}>
                    <TextInput
                        style={{ flex: 1 }}
                        autoCapitalize="none"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? "eye-off" : "eye"} size={10} color="gray" />
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity
                    onPress={handleRegister}
                    disabled={isLoading}
                    style={{ marginTop: 15, backgroundColor: isLoading ? "#A0AEC0" : primaryColor, padding: 10, borderRadius: 5, alignItems: "center" }}
                >
                    {isLoading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>}
                </TouchableOpacity>

                {error && <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{error}</Text>}

                <Text style={{ textAlign: "center", color: "#4A5568", marginTop: 15 }}>
                    Already have an account?
                    <Text onPress={() => router.navigate("/screens/login")} style={{ color: primaryColor, fontWeight: "bold" }}> Login</Text>
                </Text>
            </View>
        </View>
    );
};

export default Register;
