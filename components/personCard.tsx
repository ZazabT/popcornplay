import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface PersonProps {
  id: number;
  profile_path: string;
  name: string;
  known_for_department: string;
}

const PersonCard = ({ profile_path, name, known_for_department }: PersonProps) => {
  return (
    <TouchableOpacity className="mr-4 items-center">
      <View className="w-20 h-20 rounded-full overflow-hidden mb-2">
        <Image
          source={{
            uri: profile_path
              ? `https://image.tmdb.org/t/p/w200${profile_path}`
              : 'https://via.placeholder.com/200'
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <Text className="text-white text-sm font-medium text-center" numberOfLines={1}>
        {name}
      </Text>
      <Text className="text-gray-400 text-xs text-center">
        {known_for_department}
      </Text>
    </TouchableOpacity>
  );
};

export default PersonCard;