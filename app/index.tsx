import React from 'react';
import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from './../components/CustomButton';
import beachImage from '@/assets/meditation-images/beach.webp';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground source={beachImage} resizeMode="cover" className="flex-1">
        <LinearGradient
          className="flex-1"
          colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
        >
          <SafeAreaView className="flex-1">
            <View className="flex-1 justify-between">
              <View className="mt-5">
                <Text className="text-center text-white font-bold text-3xl">
                  Simple Meditation
                </Text>
                <Text className="text-center text-white text-regular mt-2">
                  Simplifying Meditation for Everyone
                </Text>
              </View>

              <View className="mb-3 px-4">
                <CustomButton
                  onPress={() => router.push("/nature-meditate")}
                  title="Get Started"
                  variant="primary"
                />
              </View>
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default App;