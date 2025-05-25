import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchInput = () => {
  return (
    <View className="relative w-full ">
      {/* Search Icon */}
      <View className="absolute left-4 top-1/3 ">
        <Image 
          source={icons.search} 
          className="w-5 h-5"
          style={{ tintColor: 'rgba(255,255,255,0.5)' }}
        />
      </View>

      {/* Input */}
      <TextInput
        className="w-full h-[50px] bg-[rgba(255,255,255,0.1)] rounded-2xl pl-12 pr-12 text-base text-white"
        placeholder="Search movies, TV shows..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        selectionColor="#fff"
        cursorColor="#fff"
      />
    </View>
  );
}

export default SearchInput;