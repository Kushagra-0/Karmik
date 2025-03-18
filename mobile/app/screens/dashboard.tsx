import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { primaryColor, secondaryColor } from '../common/constant';

const DashboardScreen = () => {

  return (
    <View style={{ flex: 1, backgroundColor: secondaryColor, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Text style={{ color: primaryColor, fontSize: 64, fontWeight: 'bold', padding: 24 }}>
        Dashboard
      </Animated.Text>
    </View>
  );
};

export default DashboardScreen;