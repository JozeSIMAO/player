import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import { getAll } from 'react-native-get-music-files';

export class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [], // Initialize audioFiles state to store fetched data
      loading: true, // Initialize loading state
    };
  }

  async componentDidMount() {
    await this.getAll(); // Fetch audio files when component mounts
  }

  layoutProvider = new LayoutProvider(
    (i) => 'audio',
    (type, dim) => {
      dim.width = Dimensions.get('window').width;
      dim.height = 45;
    }
  );

  rowRenderer = (type, item) => {
    getAll();
    return (
      <AudioListItem title={item.filename}/>
    );
  }

  getAll = async () => {
    try {
      const audioFiles = await getAll({
        blured: false,
        artist: true,
        duration: true,
        genre: true,
        title: true,
        cover: true,
        minimumSongDuration: 10000,
      });
      console.log(audioFiles.artist);

      this.setState({ audioFiles, loading: false }); // Update state with fetched data
    } catch (error) {
      console.error(error);
      this.setState({ loading: false }); // Update loading state if there's an error
    }
  }

  render() {
    const { loading, audioFiles } = this.state;

    if (loading) {
      // Show loading indicator if data is being fetched
      return (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2; // Change this comparison logic according to your data
    }).cloneWithRows(audioFiles);

    return (
      <View style={styles.container}>
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={this.layoutProvider}
          rowRenderer={this.rowRenderer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioList;
