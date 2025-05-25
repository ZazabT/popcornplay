import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieProps {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  vote_count,
  release_date,
}: MovieProps) => {
  return (
    <TouchableOpacity
      className="w-[31%] mb-4 mx-[1%]"
      onPress={() => router.push(`/movie/${id}`)}
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          className="w-full aspect-[2/3] rounded-2xl"
          resizeMode="cover"
        />

        {/* Overlay for better text visibility */}
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm rounded-b-2xl p-2">
          <Text className="text-white text-xs font-semibold" numberOfLines={1}>
            {title}
          </Text>

          <View className="flex-row items-center mt-0.5">
            <Text className="text-yellow-400 text-[10px] font-medium">
              ⭐ {vote_average.toFixed(1)}
            </Text>
            <Text className="text-gray-300 text-[10px] ml-1">({vote_count})</Text>
          </View>

          <Text className="text-gray-300 text-[10px] mt-0.5">
            {new Date(release_date).getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
