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

const MovieCard = ({ id, poster_path, title, vote_average, vote_count, release_date }: MovieProps) => {
  return (
    <TouchableOpacity 
      className="mr-3 mb-4"
      onPress={() => router.push(`/movie/${id}`)}
    >
      <View className="relative">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          className="w-[120px] h-[205px] rounded-2xl"
          resizeMode="cover"
        />
        
        {/* Gradient Overlay */}
        <View className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl p-3">
          <View className="absolute bottom-3 left-3 right-3">
            <Text className="text-white font-semibold" numberOfLines={1}>
              {title}
            </Text>
            
            <View className="flex-row items-center mt-1">
              <Text className="text-yellow-400 text-xs">⭐ {vote_average.toFixed(1)}</Text>
              <Text className="text-gray-400 text-xs ml-2">({vote_count})</Text>
            </View>
            
            <Text className="text-gray-400 text-xs mt-1">
              {new Date(release_date).getFullYear()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MovieCard;