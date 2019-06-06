import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

export interface AddTransScreenProps {
}

class AddTransScreen extends React.Component<AddTransScreenProps, any> {
  render() {
    return (
      <View>
         <Text>AddTransScreen</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTransScreen);