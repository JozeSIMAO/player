import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import color from '../misc/color'

export default function OptionModal( {visible, onClose, currentItem, onPlayPress, onPlayListPress}) {
    const {filename} = currentItem;

  return (
    <>
        <StatusBar hidden/>
        <Modal animationType='slide' transparent visible={visible}>
            <View style={styles.modal}>
                <Text style={styles.title}
                numberOfLines={2}

                >{filename}</Text>
                <View style={styles.optionContainer}>
                    <TouchableWithoutFeedback onPress={onPlayPress}>
                        <Text style={styles.option}>Play</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Text style={styles.option} onPress={onPlayListPress}>Add to Queue</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBg}/>
            </TouchableWithoutFeedback>
        </Modal>
    </>
  )
}

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        color: color.FONT_MEDIUM,
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing: 1,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG
    }
})