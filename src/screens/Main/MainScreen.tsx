import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

export interface MainScreenProps {
}

class MainScreen extends React.Component<MainScreenProps, any> {
  render() {
    return (
      <View>
         <Text>MainScreen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);