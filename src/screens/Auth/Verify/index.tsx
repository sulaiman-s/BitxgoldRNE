import * as React from 'react';
import {Image} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction, HStack} from 'components';
import Images from 'assets/images';
import useCountDownUtil from 'utils/useCountDownUtil';

const Verify = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const [time, reset] = useCountDownUtil(30);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={
          <NavigationAction icon="xcircle" status="placeholder" size="giant" />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <Image
          source={Images.auth.verify}
          //@ts-ignore
          style={styles.image}
        />
        <Text category="h2" marginBottom={16}>
          Verify User!
        </Text>
        <Text category="body" status="placeholder" marginBottom={32}>
          We have send code to your phonenumber and your email!
        </Text>
        <Input
          placeholder="Code from email"
          accessoryLeft={<Icon pack="assets" name="email" />}
          accessoryRight={() => (
            <Text category="subhead" status="primary">
              Resend
            </Text>
          )}
          style={styles.input}
        />
        <Input
          placeholder="Code from phonenumber"
          accessoryLeft={<Icon pack="assets" name="phone" />}
          accessoryRight={() => (
            <Text category="subhead" status="primary">
              Resend
            </Text>
          )}
          style={styles.input}
        />
      </Content>
      <HStack itemsCenter mh={32} mb={8}>
        <Text category="body" status="primary">
          Expried {time}
        </Text>
        <Button
          children={'Confirm'}
          accessoryRight={<Icon pack="assets" name="caret_right" />}
        />
      </HStack>
    </Container>
  );
});

export default Verify;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
});
