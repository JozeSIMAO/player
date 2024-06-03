import React, { Component, createContext } from 'react';
import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            permissionGranted: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
        };
    }

    permissionAlert = () => {
        Alert.alert(
            'Permission Required',
            'This app needs to read audio files!',
            [
                {
                    text: 'I am ready',
                    onPress: () => this.getPermission(),
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Permission denied'),
                },
            ],
            { cancelable: false }
        );
    };

    getAudioFiles = async () => {
        try {
            const { dataProvider, audioFiles } = this.state;
            const media = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
                first: 50, // You can adjust this number to fetch more or fewer items
                sortBy: MediaLibrary.SortBy.creationTime,
            });
            this.setState({
                audioFiles: [...audioFiles, ...media.assets],
                dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]),
            });
        } catch (error) {
            console.error('Error fetching audio files:', error);
        }
    };

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.granted) {
            this.setState({ permissionGranted: true });
            this.getAudioFiles();
        } else if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

            if (status === 'granted') {
                this.setState({ permissionGranted: true });
                this.getAudioFiles();
            } else if (status === 'denied' && canAskAgain) {
                this.permissionAlert();
            } else {
                console.log('Permission denied permanently');
            }
        } else {
            console.log('Permission denied');
        }
    };

    componentDidMount() {
        this.getPermission();
    }

    render() {
        const { dataProvider, audioFiles } = this.state;

        return (
            <AudioContext.Provider value={{ audioFiles, dataProvider }}>
                {this.props.children}
            </AudioContext.Provider>
        );
    }
}

export default AudioProvider;
