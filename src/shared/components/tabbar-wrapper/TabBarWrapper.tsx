import React, { useEffect, useState, } from 'react';
import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from "../index";
// import Styles from './TabBar.style';
// import Icon from '../../assets/icons/CustomIcon';
// import { MappedElement, getLayoutDirection } from "../../utils/methods";
// import { themes } from "../../theme/colors";
// import { CText } from "../../uiComponents";
// import posed from "react-native-pose";
// import '../../utils/i18n/lan';
import * as NavigationService from "react-navigation-helpers";
import { useSelector } from 'react-redux';
import Styles from './style';
import Icon from 'react-native-dynamic-vector-icons';
import { themes } from 'assets/theme';
import { SCREENS } from '@shared-constants';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 5;
// const SpotLight = posed.View({
//     route0: { x: 0 },
//     route1: { x: getLayoutDirection() ? -tabWidth : tabWidth },
//     route2: { x: getLayoutDirection() ? -tabWidth * 2 : tabWidth * 2 },
//     route3: { x: getLayoutDirection() ? -tabWidth * 3 : tabWidth * 3 },
//     route4: { x: getLayoutDirection() ? -tabWidth * 4 : tabWidth * 4 },
//     route5: { x: getLayoutDirection() ? -tabWidth * 5 : tabWidth * 5 },
// });

function TabBar(props:any) {
    // const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('ar');
    const reduxState = useSelector(({ auth, root, language }) => {
        return {
            loading: false,
            data: false,
            language: language?.language?.lan

        };
    });


    const {  state } = props;
    console.log("🚀 ~ file: TabBarWrapper.tsx:46 ~ TabBar ~ props:", props)
    console.log("🚀 ~ file: TabBarWrapper.tsx:46 ~ TabBar ~ state:", state)

  

    const [stateIndex, updateStateIndex] = useState(0);
    console.log("🚀 ~ file: TabBarWrapper.tsx:52 ~ TabBar ~ stateIndex:", stateIndex)

    const tabName = ['home', 'store'];

    useEffect(() => {
        let currentRouteName = getCurrentRouteName(state)?.toLowerCase();
        if (tabName.includes(currentRouteName)) {
            updateStateIndex(tabName?.indexOf(currentRouteName))
        }
    }, [state]);

    const getCurrentRouteName = (data) => {
        const routeName = data && data.routes[data.index].state
        ? data.routes[data.index].state.routes[data.routes[data.index].state.index].name
        : data ? data.routes[data.index].name : data.params?.screen || 'Chatlist';
        return routeName
    };

    const getTabBarVisibility = (data) => {
        return true;
    };
    const navigation = useNavigation();
    const routes = [
        {
            name: 'Home',
            key: 'home',
            icon: 'home',
            onPress: () => navigation.navigate('Home'),
            fontSize: 32,
            marginTop: -40,
            type: "antdesign"
        },
        {
            name: 'Search',
            key: 'store',
            icon: 'search1',
            onPress: () => navigation.navigate('Chatscreen'),
            fontSize: 30,
            type: "antdesign"

        },
        // {
        //     name: 'Cart',
        //     key: 'cart',
        //     icon: 'shopping-basket',
        //     onPress: () => navigation.navigate('Cart', {
        //         screen: 'cart',
        //         initial: false
        //     }),
        //     // onPress: () =>  navigation.navigate('Cart'),
        //     fontSize: 30,
        //     type: "fontisto"

        // },
        // {
        //     name: 'Location',
        //     key: 'location',
        //     icon: 'location-outline',
        //     onPress: () => navigation.navigate('Location'),
        //     fontSize: 30,
        //     type: "ionicon"

        // },
        // {
        //     name: 'Profile',
        //     key: 'profile',
        //     icon: 'user',
        //     onPress: () => navigation.navigate('Profile'),
        //     fontSize: 30,
        //     type: "antdesign"

        // },
    ];

    if (!getTabBarVisibility(state)) { return null }
    const MappedElement = ({ data, renderElement, empty }: any) => {
        if (data && data.length) {
            return data.map((obj:string, index:number, array:string[] ) => renderElement(obj, index, array));
        }
        return empty ? empty() : null;
    };


    return (
        <SafeAreaView style={Styles.tabContainer}>
            <View style={Styles.absoluteFillObject} />
            <View style={Styles.tabInnerContainer}>
                <MappedElement
                    data={routes}
                    renderElement={(route, i) => {
                        console.log("🚀 ~ file: TabBarWrapper.tsx:158 ~ TabBar ~ route:", route)
                        const isRouteActive = route.key === getCurrentRouteName(state)?.toLowerCase();
                        console.log("🚀 ~ file: TabBarWrapper.tsx:144 ~ TabBar ~ isRouteActive:", isRouteActive)
                        return (
                            <TouchableOpacity key={i} onPress={route.onPress} style={Styles.tab}>
                                <Icon
                                    name={route.icon}
                                    style={[Styles.tabIcon, { fontSize: route.fontSize, color: isRouteActive ? themes.colors.black : themes.colors.grey }]}
                                    color={ themes.colors.grey}
                                    type={route.type}
                                    size={route.fontSize}
                                />
                                <Text style={Styles.tabText}>{route.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default React.memo(TabBar)
