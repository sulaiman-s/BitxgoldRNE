import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
  Icon,
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction, VStack} from 'components';
import Images from 'assets/images';
import useCountDownUtil from 'utils/useCountDownUtil';
import InputCodeOtp from '../elements/InputCodeOtp';

const Authenticate = React.memo(() => {
  const {goBack} = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const [time, reset] = useCountDownUtil(30);
  const [code, setCode] = React.useState('');
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={
          <NavigationAction icon="xcircle" status="placeholder" size="giant" />
        }
      />
      <Content>
        <VStack itemsCenter ph={24}>
          <Image source={Images.auth.auth} />
          <Text category="h3" marginVertical={8}>
            Authenticate Account
          </Text>
          <Text status="placeholder" category="body" marginBottom={24}>
            User authentication for each device ensures that the individual
            using the device is recognized by the company
          </Text>
          <InputCodeOtp
            style={styles.enterCode}
            {...{code, setCode}}
            codeLength={5}
            autoFocus
          />
          <Button children="Submit" style={styles.btnSubmit} onPress={goBack} />
          <TouchableOpacity style={styles.cooldown} onPress={reset}>
            <Icon pack="assets" name="refresh" style={styles.refes} />
            <Text
              status="placeholder"
              category="callout"
              marginLeft={8}
              children={`${time}s resend code`}
            />
          </TouchableOpacity>
        </VStack>
      </Content>
      <Text category="h6" center status="primary" marginBottom={8}>
        Create an Account!
      </Text>
    </Container>
  );
});

export default Authenticate;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  enterCode: {
    marginBottom: 32,
  },
  btnSubmit: {
    width: '100%',
  },
  cooldown: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  refes: {
    width: 16,
    height: 16,
    tintColor: 'text-placeholder-color',
  },
});
