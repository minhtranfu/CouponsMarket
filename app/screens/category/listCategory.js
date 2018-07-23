import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { FontIcons } from '../../assets/icons'
import { UIConstants } from '../../config/appConstants'
import categoryApi from '../../api/categoryApi'

export class ListCategory extends React.Component {
  static navigationOptions = {
    title: 'All Category'.toUpperCase()
  }

  constructor(props) {
    super(props);
    this.state = {
      dimensions: undefined,
      categories: []
    }
  }

  componentDidMount() {
    this.loadcategories()
  }

  async loadcategories() {
    const categories = await categoryApi.getAll()

    this.setState({
      categories
    })
  }

  _onLayout = event => {
    if (this.state.height)
      return;
    let dimensions = event.nativeEvent.layout;
    this.setState({dimensions})
  };

  _getEmptyCount(size) {
    const { categories } = this.state
    let rowCount = Math.floor((this.state.dimensions.height - 20) / size);
    return rowCount * 3 - categories.length;
  };

  render() {
    const { navigate } = this.props.navigation
    const { categories } = this.state
    let items = <View/>

    if (this.state.dimensions) {
      let size = this.state.dimensions.width / 3;
      let emptyCount = this._getEmptyCount(size);

      items = categories.map(function (category, index) {
        return (
          <RkButton rkType='tile'
                    style={{height: size, width: size, backgroundColor: '#fff'}}
                    key={index}
                    onPress={() => {
                      navigate('Category', category)
                    }}>
            <Image source={{uri: `${UIConstants.ApiHost}${category.image}`}} style={styles.icon} />
            <RkText rkType='small'>{category.name}</RkText>
          </RkButton>
        )
      });

      for (let i = 0; i < emptyCount; i++) {
        items.push(<View key={'empty' + i} style={[{height: size, width: size}, styles.empty]}/>)
      }
    }

    return (
      <ScrollView
        style={styles.root}
        onLayout={this._onLayout}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10
  }
}));
