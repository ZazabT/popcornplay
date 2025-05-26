import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  onpress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void; 
}
const SearchInput = ({onpress , value , onChangeText} : Props) => {
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
        onPress={onpress}
        value={value}
        onChangeText={onChangeText}
        className="w-full h-[60px] bg-[rgba(255,255,255,0.2)] rounded-xl pl-12 pr-12 text-base text-white"
        placeholder="Search movies, TV shows..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        selectionColor="#fff"
        cursorColor="#fff"
      />
    </View>
  );
}

export default SearchInput;