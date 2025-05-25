import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, View } from 'react-native'

const TabContainer = ({ focused, icon, title } : any) => {
  if (focused) {
    return (
      <View className="items-center">
        <View className="flex-row items-center justify-center gap-2">
          <Image source={icon} className="w-[24px] h-[24px]" style={{ tintColor: '#fff' }} />
        </View>
        <View className="h-1 w-1 bg-white rounded-full mt-2" />
      </View>
    )
  } else {
    return (
      <View className="items-center justify-center">
        <Image source={icon} className="w-[20px] h-[20px]" style={{ tintColor: 'rgba(255,255,255,0.5)' }} />
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
        backdropFilter: 'blur(50px)',
        height: 60,
        marginBottom: 20,
        marginHorizontal: 50,
        paddingHorizontal: 15,
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
        borderRadius: 20,
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
