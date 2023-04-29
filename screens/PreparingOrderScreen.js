import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';

export default function PreparingOrderScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("DeliveryScreen");
        }, 4000);
    }, [])


    return (
        <SafeAreaView className="bg-white flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../assets/orderLoading.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96"
            />

            <Animatable.Text

                animation="slideInUp"
                iterationCount={1}
                className="text-lg my-10 text-[#00ccbb] font-bold text-center"
            >
                Waiting for Restaurant to accept your order!
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate={true} color="#00ccbb" />
        </SafeAreaView>
    )
}