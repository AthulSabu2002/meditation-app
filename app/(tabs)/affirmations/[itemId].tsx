import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import AppGradient from '@/components/AppGradient';
import AntDesign from '@expo/vector-icons/AntDesign';

const AffirmaionPractice = () => {
    const { itemId } = useLocalSearchParams();
    const router = useRouter()

    const [affirmation, setAffirmation] = useState<GalleryPreviewData | undefined>(undefined);
    const [sentences, setSentences] = useState<string[]>([]);

    useEffect(() => {
        if (itemId) {
            for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
                const affirmationsData = AFFIRMATION_GALLERY[idx].data;

                const affirmationToStart = affirmationsData.find((a) => a.id === Number(itemId));

                if (affirmationToStart) {
                    setAffirmation(affirmationToStart);

                    const affirmationsArray = affirmationToStart.text.split(".");

                    if (affirmationsArray[affirmationsArray.length - 1] === '') {
                        affirmationsArray.pop();
                    }

                    setSentences(affirmationsArray); // Update the sentences state here
                    return;
                }
            }
        }
    }, [itemId]); // Dependency array to include itemId

    return (
        <View className='flex-1'>
            <ImageBackground source={affirmation?.image} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
                    <Pressable onPress={() => router.back()} className='absolute top-10 left-3 z-10'>
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                        <View className='w-full flex-1 justify-center items-center'>
                            <View className='w-full h-4/5 justify-center items-center'>
                                {sentences.map((sentence, idx) => (
                                    <Text key={idx} className='text-white text-3xl mb-5 text-center'>{sentence}.</Text>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default AffirmaionPractice;
