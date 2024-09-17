import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import AppGradient from '@/components/AppGradient';
import CustomButton from '@/components/CustomButton';
import { Audio } from 'expo-av'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/meditationData';

const BREATH_DURATION = 4000; 

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes
  const [isMeditating, setMeditating] = useState(false);
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const breathAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isMeditating && secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setMeditating(false);
    }

    return () => clearInterval(intervalId);
  }, [isMeditating, secondsRemaining]);

  useEffect(() => {
    let animationId: Animated.CompositeAnimation | null = null;

    if (isMeditating) {
      animationId = Animated.loop(
        Animated.sequence([
          Animated.timing(breathAnimation, {
            toValue: 1,
            duration: BREATH_DURATION / 2,
            useNativeDriver: false,
          }),
          Animated.timing(breathAnimation, {
            toValue: 0,
            duration: BREATH_DURATION / 2,
            useNativeDriver: false,
          }),
        ])
      );

      animationId.start();

      // Update breathing state
      const intervalId = setInterval(() => {
        setIsBreathingIn((prev) => !prev);
      }, BREATH_DURATION / 2);

      return () => {
        if (animationId) animationId.stop();
        clearInterval(intervalId);
      };
    } else {
      breathAnimation.setValue(0);
    }
  }, [isMeditating, breathAnimation]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = async() => {
    setMeditating(!isMeditating);

    await toggleSound();
  };

  const toggleSound = async() => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio){
      await sound.playAsync();
      setPlayingAudio(true)
    }
    else{
      await sound.pauseAsync();
      setPlayingAudio(false)
    }
  }

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILES[audioFileName]
    );

    setSound(sound);
    return sound;
  }

  const handleBackPress = async () => {
    if (audioSound && isPlayingAudio) {
      await audioSound.pauseAsync();
      setPlayingAudio(false);
    }
    router.back();
  };

  const animatedSize = breathAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 280], // Size range for the breathing circle
  });

  const animatedTextSize = breathAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [48, 52], // Text size range
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode="cover" style={styles.backgroundImage}>
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable onPress={handleBackPress} style={styles.backButton}>
            <MaterialCommunityIcons name="chevron-left-circle-outline" size={50} color="white" />
          </Pressable>
          
          <View style={styles.timerContainer}>
            <Animated.View style={[styles.timerCircle, { width: animatedSize, height: animatedSize }]}>
              <Animated.Text style={[styles.timerText, { fontSize: animatedTextSize }]}>
                {formatTime(secondsRemaining)}
              </Animated.Text>
              {isMeditating && (
                <Text style={styles.breathText}>
                  {isBreathingIn ? "Breathe in..." : "Breathe out..."}
                </Text>
              )}
            </Animated.View>
          </View>
          
          <View style={styles.buttonContainer}>
            <CustomButton
              title={isMeditating ? 'Stop Meditation' : 'Start Meditation'}
              onPress={handleStartStop}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCircle: {
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  breathText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default Meditate;