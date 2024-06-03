import { Text, View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';

export default function AudioListItem ({ title,artist }) {

    return (
    <>
    <View style={styles.container}>
        <View style={styles.LeftContainer}>
            <View style={styles.thumbnail}>
                <Text style={styles.thumbnailText}>A</Text>
            </View>
            <View style={styles.TitleContainer}>
                <Text numberOfLines={1}>{title}</Text>
                <Text style={{fontSize: 12}}>{artist}</Text>
            </View>
        </View>
        <View style={styles.rightContainer}>
            <Entypo name="dots-three-vertical" size={20} color={color.FONT_MEDIUM} /> 
        </View>
    </View>
    
    </>
    )
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: width - 80,
        marginTop: 5,
    },
    LeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        flexBasis: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        height: 40,
        width: 40,
        backgroundColor: color.FONT_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: color.FONT,
    },
    TitleContainer: {
        width: width - 180,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        color: color.FONT,
    },
    separator: {
        width: width - 80,
        backgroundColor: "black",
        height: 0.5,
        alignSelf: 'center',
        marginTop: 5,
    }
})