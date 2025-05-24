import { images } from "@/constants/images";
import React from 'react';
import { Image, View } from 'react-native';

const Saved = () => {
  return (
    <View className="flex-1 items-center bg-[#0f0D23]">
    <Image source={images.bg}/>
  </View>
  )
}

export default Saved