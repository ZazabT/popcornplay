import MovieCard from '@/components/movieCard';
import SearchInput from "@/components/searchInput";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));

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
          <ActivityIndicator
            size={"large"}
            color={"#fff"}
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <View className="mt-10 mx-4 p-6 bg-[rgba(255,255,255,0.05)] rounded-3xl items-center">
            <View className="w-16 h-16 mb-4 rounded-full bg-[rgba(255,59,48,0.1)] items-center justify-center">
              <Text className="text-4xl">⚠️</Text>
            </View>
            <Text className="text-white text-lg font-bold text-center">
              Oops! Something went wrong
            </Text>
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
            data={movies}
            keyExtractor={(movie) => movie.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
            }}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingHorizontal: 20,
            }}
            ListHeaderComponent={() => (
              <>

                {/* User Profile Section */}
                <View className='mt-8 flex-row items-center justify-between px-1'>
                  {/* User Name and Greeting */}
                  <View>
                    <Text className="text-gray-400 text-sm font-medium">Welcome back</Text>
                    <Text className="text-white text-2xl font-bold mt-1">Hello, Tizazab</Text>
                  </View>

                  {/* User Profile */}
                  <TouchableOpacity
                    className="active:opacity-80"
                  >
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
                {/* Search for your favorite movies and tv shows */}
                <View className="mt-8">
                  <SearchInput />
                  <Text className="text-white text-xl font-semibold mb-4 mt-8">Latest Movies</Text>
                </View>

              </>
            )}
            renderItem={({ item }) => <MovieCard {...item} />}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
