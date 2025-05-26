import MovieCard from '@/components/movieCard';
import SearchInput from "@/components/searchInput";
import TvCard from '@/components/tvCard';
import { fetchMovies, fetchTvShows } from "@/services/api";
import useFetch from "@/services/useFetch";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ['All', 'Action', 'Comedy', 'Drama', 'Horror'];

export default function Index() {
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));
  const { data: tvShows, loading: tvLoading } = useFetch(() => fetchTvShows({ query: "" }));

  const [showAllMovies, setShowAllMovies] = useState(false);
  const [showAllTv, setShowAllTv] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const displayedMovies = showAllMovies ? movies : movies?.slice(0, 9);
  const displayedTvShows = showAllTv ? tvShows : tvShows?.slice(0, 4);

  const router = useRouter();

  // Memoize the ListHeaderComponent
  const ListHeader = useMemo(() => (
    <>
      {/* User Info */}
      <View className="mt-8 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-400 text-sm font-medium">Welcome back</Text>
          <Text className="text-white text-2xl font-bold mt-1">Hello, Tizazab</Text>
        </View>
        <TouchableOpacity>
          <View className="items-center justify-center">
            <View className="w-16 h-16 rounded-full p-[1.5px]">
              <View className="w-full h-full rounded-full bg-[#1A0012] items-center justify-center border-2 border-[#1A0012]">
                <View className="w-full h-full rounded-full overflow-hidden">
                  <LinearGradient
                    colors={['#FF1B6B', '#7209B7']}
                    className="w-full h-full items-center justify-center"
                  >
                    <Text className="text-white text-xl font-bold">T</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="mt-8">
        <SearchInput
        onpress={() => {
          router.push("/search");
        }}
        />
      </View>

      {/* Categories */}
      <View className="mt-8">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-xl font-semibold">Categories</Text>
          <TouchableOpacity>
            <Text className="text-gray-400 text-sm font-medium">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full mr-3 ${activeCategory === category ? 'bg-white/30' : 'bg-white/10'}`}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold">{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Latest Movies */}
      <View className="mt-8">
        <Text className="text-white text-xl font-semibold mb-4">Latest Movies</Text>
      </View>
    </>
  ), [activeCategory]); 

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#1A0012', '#0A001F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute w-full h-full"
        locations={[0.2, 0.8]}
      />

      <SafeAreaView className="flex-1">
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#fff" className="mt-10 self-center" />
        ) : moviesError ? (
          <View className="mt-10 mx-4 p-6 bg-[rgba(255,255,255,0.05)] rounded-3xl items-center">
            <View className="w-16 h-16 mb-4 rounded-full bg-[rgba(255,59,48,0.1)] items-center justify-center">
              <Text className="text-4xl">⚠️</Text>
            </View>
            <Text className="text-white text-lg font-bold text-center">Oops! Something went wrong</Text>
            <Text className="text-gray-400 text-sm text-center mt-2 px-4">
              {moviesError?.message || 'Unable to fetch movies at the moment'}
            </Text>
            <TouchableOpacity
              className="mt-6 bg-white/10 px-8 py-3 rounded-full flex-row items-center"
              onPress={() => window.location.reload()}
            >
              <Text className="text-white font-semibold">Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={displayedMovies}
            keyExtractor={(movie) => movie.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
            ListHeaderComponent={ListHeader}
            renderItem={({ item }) => <MovieCard {...item} />}
            ListFooterComponent={() => (
              <View>
                {/* Movies See All Button */}
                {movies?.length > 9 && (
                  <View className="mt-4 items-end">
                    <TouchableOpacity
                      className="bg-white/10 rounded-full px-6 py-2 flex-row items-center"
                      onPress={() => setShowAllMovies(!showAllMovies)}
                      activeOpacity={0.8}
                    >
                      <Text className="text-white text-sm font-medium mr-1">
                        {showAllMovies ? 'Show Less' : 'View All Movies'}
                      </Text>
                      <Text className="text-white text-sm">
                        {showAllMovies ? '↑' : '↓'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* TV Shows Section */}
                <View className="mt-10">
                  <Text className="text-white text-xl font-semibold mb-4">Popular TV Shows</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                  >
                    {tvLoading ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      displayedTvShows?.map((show : any) => <TvCard key={show.id} {...show} />)
                    )}
                  </ScrollView>

                  {/* TV Shows See All Button */}
                  {tvShows?.length > 4 && (
                    <View className="mt-4 items-end">
                      <TouchableOpacity
                        className="bg-white/10 rounded-full px-6 py-2 flex-row items-center"
                        onPress={() => setShowAllTv(!showAllTv)}
                        activeOpacity={0.8}
                      >
                        <Text className="text-white text-sm font-medium mr-1">
                          {showAllTv ? 'Show Less' : 'View All Shows'}
                        </Text>
                        <Text className="text-white text-sm">
                          {showAllTv ? '↑' : '↓'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
