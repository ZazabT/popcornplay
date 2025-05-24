import { images } from "@/constants/images";
import { Image, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center bg-[#0f0D23]">
      <Image source={images.bg}/>
    </View>
  );
}
