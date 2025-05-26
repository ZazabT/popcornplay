import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  const safeId = Array.isArray(id) ? id[0] : id;
  
  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(safeId));
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white/50 mt-4">Loading movie details...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={['#1A0012', '#0A001F']}
        className="absolute w-full h-full"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="h-[600px] relative">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}` }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(26, 0, 18, 0.8)', '#1A0012']}
            className="absolute bottom-0 w-full h-[350px]"
          />
          <SafeAreaView className="absolute w-full">
            <View className="flex-row justify-between items-center mx-4 mt-2">
              <TouchableOpacity 
                className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full items-center justify-center"
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full items-center justify-center"
              >
                <Ionicons name="heart-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Poster Overlay */}
          <View className="absolute bottom-0 w-full px-4 pb-4 flex-row">
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
              className="w-32 h-48 rounded-2xl"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4 justify-end">
              <Text className="text-white text-3xl font-bold" numberOfLines={2}>
                {movie?.title}
              </Text>
              <Text className="text-gray-300 text-lg italic mt-2" numberOfLines={1}>
                {movie?.tagline}
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="px-4">
          {/* Rating and Info */}
          <View className="flex-row justify-between items-center mt-4 bg-white/5 p-4 rounded-2xl">
            <View className="items-center">
              <View className="flex-row items-center">
                <Ionicons name="star" size={24} color="#FFD700" />
                <Text className="text-white text-xl font-bold ml-1">
                  {movie?.vote_average?.toFixed(1)}
                </Text>
              </View>
              <Text className="text-gray-400 text-sm mt-1">Rating</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">
                {movie?.runtime}min
              </Text>
              <Text className="text-gray-400 text-sm mt-1">Duration</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">
                {new Date(movie?.release_date).getFullYear()}
              </Text>
              <Text className="text-gray-400 text-sm mt-1">Year</Text>
            </View>
          </View>

          {/* Genres */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mt-6"
          >
            {movie?.genres?.map((genre: any) => (
              <View 
                key={genre.id} 
                className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl mr-3"
              >
                <Text className="text-white font-semibold">{genre.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Overview */}
          <View className="mt-8">
            <Text className="text-white text-2xl font-bold mb-4">Overview</Text>
            <Text className="text-gray-300 leading-6 text-base">
              {movie?.overview}
            </Text>
          </View>

          {/* Production Companies */}
          <View className="mt-8">
            <Text className="text-white text-2xl font-bold mb-4">Production</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {movie?.production_companies?.map((company: any) => (
                <View 
                  key={company.id} 
                  className="mr-4 items-center bg-white/5 p-4 rounded-2xl w-32"
                >
                  {company.logo_path ? (
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w200${company.logo_path}` }}
                      className="w-24 h-24 bg-white/10 rounded-xl"
                      resizeMode="contain"
                    />
                  ) : (
                    <View className="w-24 h-24 bg-white/10 rounded-xl items-center justify-center">
                      <Text className="text-white text-center px-2">{company.name}</Text>
                    </View>
                  )}
                  <Text className="text-white text-center mt-2 text-sm" numberOfLines={2}>
                    {company.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Additional Details */}
          <View className="mt-8 bg-white/5 rounded-2xl p-4 space-y-3">
            <Text className="text-white text-2xl font-bold mb-2">Details</Text>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Status</Text>
              <Text className="text-white font-medium">{movie?.status}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Budget</Text>
              <Text className="text-white font-medium">
                ${movie?.budget?.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Revenue</Text>
              <Text className="text-white font-medium">
                ${movie?.revenue?.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Collection */}
          {movie?.belongs_to_collection && (
            <TouchableOpacity className="mt-8 mb-10">
              <Text className="text-white text-2xl font-bold mb-4">Collection</Text>
              <View className="rounded-2xl overflow-hidden relative">
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.backdrop_path}` }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  className="absolute bottom-0 w-full h-full"
                />
                <View className="absolute bottom-0 w-full p-4">
                  <Text className="text-white text-xl font-bold">
                    {movie.belongs_to_collection.name}
                  </Text>
                  <Text className="text-gray-300 mt-1">View collection →</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;