import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { primaryColor, secondaryColor } from './common/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("authToken");

    if (token) {
      router.navigate("/screens/dashboard")
    } else {
      router.navigate("/screens/login");
    }
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      getToken();
    });
  }, [fadeAnim, router]);

  return (
    <View style={{ flex: 1, backgroundColor: secondaryColor, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Text style={{ color: primaryColor, fontSize: 92, fontWeight: 'bold', padding: 24, opacity: fadeAnim }}>
        Karmik
      </Animated.Text>
    </View>
  );
};

export default StartScreen;