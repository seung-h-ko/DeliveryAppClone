import { View, Text, SafeAreaView, StyleSheet, StatusBar, Platform, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    //when UI is loaded, hide navigation bar
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    useEffect(() => {
        sanityClient.fetch(
            `
                *[_type == "featured"] {
                    ...,
                    restaurants[]->{
                        ...,
                        dishes[]->,
                        type->{
                        name
                        }
                    },
                }
            `
        ).then((data) => {
            setFeaturedCategories(data);
        })
    }, [])

    return (
        <SafeAreaView style={styles.AndroidSafeArea} className="bg-white pt-5">
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>

                <UserIcon size={35} color="#00ccbb" />
            </View>

            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassIcon color="gray" size={20} />
                    <TextInput
                        placeholder='Restaurants and cuisines'
                        keyboardType='default'
                    />
                </View>
                <AdjustmentsHorizontalIcon color="#00ccbb" />
            </View>

            {/* Body */}
            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories */}
                <Categories />

                {/* Featured */}
                {featuredCategories?.map((category) => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>

        </SafeAreaView>
    )
}

//for Android
const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});