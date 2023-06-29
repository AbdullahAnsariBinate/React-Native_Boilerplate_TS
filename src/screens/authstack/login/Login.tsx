import React from 'react'
import { View, ScrollView, Pressable, Text, Alert } from "react-native"
import { Form } from './Form'
import authStyles from '../authStyles'
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from '@shared-constants'
import firestore from '@react-native-firebase/firestore';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { token } from '@services/redux/actions/token'
import LoadingWrapper from '@shared-components/loading-wrapper/loadingWrapper'


const Login: React.FC = () => {
    const [isShow, setIsShow] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const initialIconVal = useSharedValue(-80)
    const animateBottom = useSharedValue(-100)


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${initialIconVal.value}deg` },
            ]
        }
    })

    const animateBottomStyle = useAnimatedStyle(() => {
        return {
            bottom: animateBottom.value
        }
    }, [])
    React.useEffect(() => {
        initialIconVal.value = withSpring(0);
        animateBottom.value = withTiming(0, { duration: 600, easing: Easing.bounce })
    }, []);

    const handleSubmit = (values: any) => {
        setIsShow(true)
        firestore()
            .collection('Users')
            // Filter resultsr
            .where("email", '==', values.email)
            .get()
            .then(res => {
                if (res?._docs[0]?._data.password == values.password) {
                    AsyncStorage.setItem(
                        'USERID',
                        JSON.stringify(res?._docs[0]?._data),
                    );
                    dispatch(token(res?._docs[0]?._data?.userId))
                    setIsShow(false)
                }
            }).catch((err) => {
                console.log('user not found', err)
                setIsShow(false)
            });
        // NavigationService.push(SCREENS.REGISTER);
    }

    return (
        <>
            <LoadingWrapper show={isShow} name='Spinning Circles Loading Animation' source='https://assets5.lottiefiles.com/private_files/lf30_tcux3hw6.json' author='Abdullah' path={require('./../../appstack/chat/chatscreen/animation.json')} />
            <ScrollView>

                <View style={authStyles?.auth}>
                    <Animated.View style={[authStyles.logoView, animatedStyle]}>
                        <FastImage
                            source={imgs?.Logo}
                            style={authStyles.logo}
                            resizeMode="contain"
                        />
                    </Animated.View>
                    <Form
                        submit={handleSubmit}
                    // handleForgot={handleForgot}
                    // onLoginPress={() => navigation.navigate('login')}
                    />
                    <Animated.View style={[authStyles.bottomlink, animateBottomStyle]}>
                        <Text style={authStyles.bottomlinkText}>Don't have an account?</Text>
                        <Pressable onPress={() => NavigationService.push(SCREENS.REGISTER)}>
                            <Text style={authStyles.bottomlinkTextNav}>Register Now</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </ScrollView>
        </>
    )
}

export default Login

