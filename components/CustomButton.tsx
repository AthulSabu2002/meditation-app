import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const CustomButton = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
  variant = 'primary'
}: CustomButtonProps) => {
  const getButtonStyles = () => {
    const baseStyles = 'rounded-xl min-h-[62px] justify-center items-center shadow-md w-full';
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-blue-500 ${containerStyles}`;
      case 'secondary':
        return `${baseStyles} bg-gray-200 ${containerStyles}`;
      case 'outline':
        return `${baseStyles} bg-transparent border-2 border-blue-500 ${containerStyles}`;
      default:
        return `${baseStyles} bg-blue-500 ${containerStyles}`;
    }
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold text-lg';
    switch (variant) {
      case 'primary':
        return `${baseStyles} text-white ${textStyles}`;
      case 'secondary':
        return `${baseStyles} text-gray-800 ${textStyles}`;
      case 'outline':
        return `${baseStyles} text-blue-500 ${textStyles}`;
      default:
        return `${baseStyles} text-white ${textStyles}`;
    }
  };

  return (
    <View className="flex-1 justify-end px-4 pb-6">
      <TouchableOpacity
        activeOpacity={0.7}
        className={getButtonStyles()}
        onPress={onPress}
      >
        <Text className={getTextStyles()}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;