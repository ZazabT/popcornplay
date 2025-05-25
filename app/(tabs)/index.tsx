import SearchInput from "@/components/searchInput";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
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
          contentContainerStyle={{paddingBottom: 100}}
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

          {/* Search Bar */}
          <View className="mt-8">
            <SearchInput/>
          </View>
          {/* Categories */}
          {/* <View className="mt-8">
            <Text className="text-white text-xl font-semibold mb-4">Categories</Text>
            
          </View> */}

          {/* Trending Movies */}
          {/* <View className="mt-8">
            <Text className="text-white text-xl font-semibold mb-4">Trending Now</Text>
           
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
