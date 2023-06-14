import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import RNRestart from 'react-native-restart';

import {ErrorIcon} from 'Icons';
import {AppText} from 'Components';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }
  componentDidCatch(error, errorInfo) {
    // deal with errorInfo if needed
  }

  handleAppCrash = () => {
    RNRestart.Restart();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <View style={styles.content}>
            <ErrorIcon color={'red'} size={60} />
            <AppText variant="medium" size={34}>
              Oops, Something Went Wrong
            </AppText>
            <AppText variant="bold" size={28}>
              The app ran into a problem and could not continue. We apologise
              for any inconvenience this has caused! Press the button below to
              restart the app. Please contact us if this issue persists.
            </AppText>
            <Button
              onPress={() => this.handleAppCrash()}
              style={styles.buttonStyle}>
              Restart the application
            </Button>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  buttonStyle: {
    marginVertical: 15,
  },
});
