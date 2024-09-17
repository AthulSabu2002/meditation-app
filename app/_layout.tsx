import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";


export default function RootLayout(){

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="meditate/[id]" options={{headerShown: false}}/>
        </Stack>
    )
}