import MovieCard from '@/components/movieCard';
import PersonCard from '@/components/personCard';
import SearchInput from '@/components/searchInput';
import TvCard from '@/components/tvCard';
import { searchAll } from '@/services/api';
import useFetch from '@/services/useFetch';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchData, loading, error, callApi, reset } = useFetch(() => searchAll({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length >= 1) {
        console.log('Searching for:', searchQuery);
        callApi();
        
      } else {
        reset();
      }
    }, 800); // Increased debounce time for better performance
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const movies = searchData?.filter((item: { media_type: string }) => item.media_type === 'movie') || [];
  const tvShows = searchData?.filter((item: { media_type: string }) => item.media_type === 'tv') || [];
  const persons = searchData?.filter((item: { media_type: string }) => item.media_type === 'person') || [];

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={['#1A0012', '#0A001F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute w-full h-full"
        locations={[0.2, 0.8]}
      />

      <View className="px-5 flex-1">
        {/* Main Header */}
        <View className="mt-12 space-y-6">
          <View>
            <Text className="text-white text-3xl font-bold">
              {searchQuery ? `Results for "${searchQuery}"` : 'Search'}
            </Text>
            <Text className="text-gray-400 text-base mt-2">
              {loading ? 'Searching...' :
                searchQuery ? `Found ${movies.length} movies, ${tvShows.length} shows, ${persons.length} people` :
                  'Explore movies, TV shows and people'
              }
            </Text>
          </View>

          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search movies, shows, people..."
          />
        </View>

        {loading ? (
          <ActivityIndicator color="white" size="large" className="mt-20" />
        ) : error ? (
          <Text className="text-red-500 text-center mt-10">{error.message}</Text>
        ) : searchData?.length === 0 && searchQuery ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-2xl font-semibold text-center">No results found</Text>
            <Text className="text-gray-400 text-base text-center mt-3">Try different keywords</Text>
          </View>
        ) : (
          <FlatList
            data={movies}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard {...item} />
            )}

            ListHeaderComponent={() => (
              <>
                {persons.length > 0 && (
                  <View className="mt-10">
                    <View className="flex-row items-center justify-between mb-6">
                      <Text className="text-white text-2xl font-bold">Popular People</Text>
                      <Text className="text-gray-400 text-base">{persons.length} found</Text>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingRight: 20 }}
                    >
                      {persons.map((person: any) => (
                        <PersonCard key={person.id} {...person} />
                      ))}
                    </ScrollView>
                  </View>
                )}
                {movies.length > 0 && (
                  <View className="mt-10 mb-6">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-white text-2xl font-bold">Movies</Text>
                      <Text className="text-gray-400 text-base">{movies.length} found</Text>
                    </View>
                  </View>
                )}
              </>
            )}
            ListFooterComponent={() => (
              tvShows.length > 0 && (
                <View className="mt-10 mb-6">
                  <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-white text-2xl font-bold">TV Shows</Text>
                    <Text className="text-gray-400 text-base">{tvShows.length} found</Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                  >
                    {tvShows.map((show: any) => (
                      <TvCard key={show.id} {...show} />
                    ))}
                  </ScrollView>
                </View>
              )
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Search;