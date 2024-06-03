import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';

export class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => 'audio',
    (type, dim) => {
      dim.width = Dimensions.get('window').width;
      dim.height = 45;
    }
  );

  rowRenderer = (type, item) => {
    return (
      <AudioListItem title={item.filename}
      duration={item.duration}
      onOptionPress={() => {
        this.currentItem = item;
        this.setState({...this.state, optionModalVisible: true})
      }}/>
    );
  }

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          if (!dataProvider) {
            // Handle scenario when dataProvider is not available
            return <ActivityIndicator style={styles.loadingIndicator} />;
          }

          return (
            <Screen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModal
              onPlayPress={() => {
                this.context.playbackObj.loadAudio(this.currentItem.uri);
                this.context.playbackObj.play();
              }}
              onPlayListPress={() => {
                this.context.addToPlayList(this.currentItem);
              }}
              onPausePress={() => {
                this.context.playbackObj.pause();
              }}
              onRepeatPress={() => {
                this.context.playbackObj.setIsLoopingAsync(true);
              }}
              currentItem={this.currentItem}
              onClose={() => this.setState({...this.state, optionModalVisible: false})}
              visible={this.state.optionModalVisible}/>
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  audioItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  audioText: {
    fontSize: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioList;