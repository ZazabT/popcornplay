import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabContainer = ({ focused, icon, title } : any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex-row items-center px-6 py-3 rounded-full overflow-hidden min-w-[130px] min-h-[45px] justify-center gap-2 shadow-lg"
        imageStyle={{ borderRadius: 999 }}
      >
        <Image source={icon} className="w-[20px] h-[20px]" style={{ tintColor: '#000' }} />
        <Text className="text-sm text-black font-bold">{title}</Text>
      </ImageBackground>
    )
  } else {
    return (
      <View className="items-center justify-center p-3 rounded-full bg-[#1a1a2f]">
        <Image source={icon} className="w-[20px] h-[20px]" style={{ tintColor: '#666' }} />
      </View>
    )
  }
}

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarStyle: {
        backgroundColor: '#0f0D23',
        borderRadius: 30,
        height: 50,
        marginBottom: 20,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabContainer focused={focused} icon={icons.home} title={'Home'} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabContainer focused={focused} icon={icons.search} title={'Search'} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabContainer focused={focused} icon={icons.person} title={'Profile'} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabContainer focused={focused} icon={icons.save} title={'Saved'} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
