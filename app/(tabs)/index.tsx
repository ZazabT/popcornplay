import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View className="flex-1 bg-[#0f0D23]">
      <Image source={images.bg} className="absolute w-full h-full" resizeMode="cover"/>
      
      <SafeAreaView className="flex-1">
        <ScrollView 
          className="flex-1 px-5" 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{paddingBottom: 100}}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mt-4">
            <Image source={icons.logo} className="w-12 h-10"/>
            <TouchableOpacity>
              <Image source={icons.arrow} className="w-6 h-6" tintColor="#fff"/>
            </TouchableOpacity>
          </View>

          {/* Welcome Text */}
          <View className="mt-8">
            <Text className="text-white text-3xl font-bold">Welcome Back!</Text>
            <Text className="text-gray-400 mt-2">Explore your favorite movies and series</Text>
          </View>

          {/* Search Bar */}
          <TouchableOpacity className="flex-row items-center bg-[#ffffff15] mt-8 p-4 rounded-2xl">
            <Image source={icons.search} className="w-5 h-5" tintColor="#666"/>
            <Text className="text-gray-400 ml-3">Search movies, series...</Text>
          </TouchableOpacity>

          {/* Categories */}
          <View className="mt-8">
            <Text className="text-white text-xl font-semibold mb-4">Categories</Text>
            {/* Add your categories here */}
          </View>

          {/* Trending Movies */}
          <View className="mt-8">
            <Text className="text-white text-xl font-semibold mb-4">Trending Now</Text>
            {/* Add your movie list here */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
