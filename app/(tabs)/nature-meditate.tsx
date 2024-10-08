import React from 'react';
import { View, Text, FlatList, Pressable, ImageBackground, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import AppGradient from '@/components/AppGradient';
import { MEDITATION_DATA } from '@/constants/meditationData';
import meditationImages from '@/constants/meditation-images';
import { router } from 'expo-router';

const NatureMeditate = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-4">
            <View className="mb-6 mt-6">
              <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">Welcome Athul</Text>
              <Text className="text-indigo-100 text-xl font-medium">
                Start your meditation practice today
              </Text>
            </View>

            <FlatList
              data={MEDITATION_DATA}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => router.push(`/meditate/${item.id}`)}
                  className="h-48 mb-4 rounded-md overflow-hidden"
                >
                  <ImageBackground
                    source={meditationImages[item.id - 1]}
                    resizeMode="cover"
                    className="flex-1 rounded-lg justify-center"
                  >
                    <LinearGradient
                      colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
                      className="flex-1 justify-center items-center"
                    >
                      <Text className="text-gray-100 text-3xl font-bold text-center">{item.title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              )}
            />
          </View>
        </SafeAreaView>
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
};

export default NatureMeditate;