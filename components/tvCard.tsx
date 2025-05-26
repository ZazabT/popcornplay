import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface TvShowProps {
  id: number;
  poster_path: string;
  name: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

const TvCard = React.memo(({ id, poster_path, name, vote_average, vote_count, first_air_date }: TvShowProps) => {
  return (
    <TouchableOpacity className="mr-4 active:opacity-80">
      <View className="relative">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          className="w-32 h-48 rounded-xl"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 rounded-b-xl px-2 py-1">
          <Text className="text-white text-xs font-semibold" numberOfLines={1}>
            {name}
          </Text>
          <View className="flex-row items-center mt-0.5">
            <Text className="text-yellow-400 text-[10px]">⭐ {vote_average.toFixed(1)}</Text>
            <Text className="text-gray-400 text-[10px] ml-1">({vote_count})</Text>
          </View>
          <Text className="text-gray-400 text-[10px] mt-0.5">
            {new Date(first_air_date).getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default TvCard;
