import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions,ScrollView, Animated, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { markers } from '../Data/mapData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const Map = () => {
    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);
    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;


    const initialMapState = {
        markers,
        categories: [
            {
                name: 'Fastfood Center',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
            },
            {
                name: 'Restaurant',
                icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Dineouts',
                icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Snacks Corner',
                icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Hotel',
                icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
            },
        ],
        region: {
            latitude: 36.802996977656115,
            longitude: 10.165610066850947,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        },
    };
    const [state, setState] = React.useState(initialMapState);
    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }
    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= markers.length) {
                index = markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = markers[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        },
                        350
                    );
                }
            }, 10);
        });
    });
    return (

        <View View style={styles.container} >
            <MapView ref={_map} style={styles.map} initialRegion={state.region} >
                {markers.map((marker, index) => {
                    return (
                        <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={styles.markerWrap}>
                                <Animated.Image
                                    source={require('../assets/map-marker.png')}
                                    style={styles.mark}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    )
                }
                )}
                {/* // <Marker key={index} style={styles.mark}
                    //     coordinate={
                    //         marker.coordinate
                    //     }
                    //     // image={require('../assets/map-marker.png')}
                    //     title="Test Title" description="Test Description">
                    //     <View style={styles.mark}>
                    //         <Image style={styles.mark} source={require('../assets/map-marker.png')} />
                    //     </View>
                    //     <Callout tooltip>
                    //         <View>
                    //             <View style={styles.bubble}>
                    //                 <Text style={styles.name}>Favourite Restaurant</Text>
                    //                 {/* <Text>Ashort description</Text> */}
                {/* <Image *
                    //                     style={styles.image}
                    //                     source={require('../assets/burger.jpg')}
                    //                 />
                    //             </View>
                    //             <View style={styles.arrowBorder} />
                    //             <View style={styles.arrow} />
                    //         </View>
                    //     </Callout>
                    // </Marker> */}
            </MapView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {state.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {markers.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={marker.image}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
                            <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.signIn, {
                                        borderColor: '#FF6347',
                                        borderWidth: 1
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#FF6347'
                                    }]}>Lire plus</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View >
    );
}
export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    // markerWrap: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width:50,
    //     height:50,
    //   },
    mark: {
        width: 40,
        height: 40,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 40,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 95,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
    // Callout bubble
    // bubble: {
    //     flexDirection: 'column',
    //     alignSelf: 'flex-start',
    //     backgroundColor: '#fff',
    //     borderRadius: 6,
    //     borderColor: '#ccc',
    //     borderWidth: 0.5,
    //     padding: 15,
    //     width: 150,
    // },
    // // Arrow betow the bubble
    // arrow: {
    //     backgroundColor: 'transparent',
    //     borderColor: 'transparent',
    //     borderTopColor: '#fff',
    //     borderWidth: 16,
    //     alignSelf: 'center',
    //     marginTop: -32,
    // },
    // arrowBorder: {
    //     backgroundColor: 'transparent',
    //     borderColor: 'transparent',
    //     borderTopColor: '#007a87',
    //     borderWidth: 16,
    //     alignSelf: 'center',
    //     marginTop: -0.5,
    //     // marginBottom:-15
    // },
    // // Character name
    // name: {
    //     fontSize: 16,
    //     marginBottom: 5,
    // },
    // // Character image
    // image: {
    //     width: 120,
    //     height: 80,
    // },
});


