import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

const SearchInput = () => {
  return (
    <View className="relative w-full">
      <View className="absolute left-4 top-3.5 z-10">
        <Image 
          source={icons.search} 
          className="w-5 h-5" 
          style={{ tintColor: '#666' }}
        />
      </View>
      <TextInput 
        className="w-full h-[50px] rounded-2xl bg-[#ffffff15] pl-12 pr-14 py-3 text-base text-white"
        placeholder="Search movies, series..." 
        placeholderTextColor="#666"
        selectionColor="#fff"
      />
      <TouchableOpacity className="absolute right-4 top-3.5">
        <Image 
          source={icons.search} 
          className="w-5 h-5" 
          style={{ tintColor: '#666' }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default SearchInput;