import MovieCard from '@/components/movieCard';
import SearchInput from "@/components/searchInput";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies(
    {
      query: ""
    }
  ));
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#0f0D23', '#0f0D23']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute w-full h-full opacity-95"
      />

      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          {/* <View className="flex-row items-center justify-center mt-10">
            <Image source={icons.logo} className="w-12 h-10"/>
          </View> */}

          {/* Welcome Text */}
          <View className="mt-8">
            <Text className="text-white text-3xl font-bold">Welcome Back!</Text>
            <Text className="text-gray-400 mt-2">Explore your favorite movies and series</Text>
          </View>


          {
            moviesLoading ? (
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


              <View className="mt-8">
                <SearchInput />
                <View className="mt-8">
                  <Text className="text-white text-xl font-semibold mb-4">Latest Movies</Text>
                  <FlatList
                  data={movies}
                    keyExtractor={(movie) => movie.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent : 'flex-start'
                    }}
                    renderItem={({ item }) => (
                     <MovieCard {...item}/>
                    )}
                  />
                </View>
              </View>
            )
          }

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
