import * as React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction} from 'components';
import Images from 'assets/images';

const ForgotPassword = React.memo(() => {
  const {goBack} = useNavigation();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={<Image source={Images.logo} />}
        accessoryLeft={
          <NavigationAction
            icon="arrow_left"
            status="placeholder"
            size="giant"
          />
        }
      />
      <Content>
        <Image
          source={Images.auth.frame}
          // @ts-ignore
          style={styles.img}
        />
        <Text category="h2" center marginBottom={16}>
          Forgot Password
        </Text>
        <Text category="body" center marginBottom={16} marginHorizontal={32}>
          Don’t worry, you can use magic link continue your login!
        </Text>
        <Input
          accessoryLeft={<Icon pack="assets" name="envelope" />}
          placeholder="Your email"
          style={styles.input}
        />
        <Button children={'Sign In'} style={styles.button} onPress={goBack} />
      </Content>
      <Text
        center
        category="h6"
        status="primary"
        marginBottom={8}
        onPress={goBack}>
        New Account!
      </Text>
    </Container>
  );
});

export default ForgotPassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  img: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  content: {},
  input: {
    marginHorizontal: 32,
  },
  button: {
    marginTop: 24,
    marginHorizontal: 32,
  },
});
