import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

export interface LoginScreenProps {
}

class LoginScreen extends React.Component<LoginScreenProps, any> {
  render() {
    return (
      <View>
         <Text>LoginScreen</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
