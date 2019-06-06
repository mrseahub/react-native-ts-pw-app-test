import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

export interface RegScreenProps {
}

class RegScreen extends React.Component<RegScreenProps, any> {
  render() {
    return (
      <View>
         <Text>RegScreen</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegScreen);