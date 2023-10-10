import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  Input,
  Button,
} from '@ui-kitten/components';

import {Container, Content, Text, HStack, VStack} from 'components';
import Images from 'assets/images';

const SignUp01 = React.memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const width_page = 295 * (width / 375);
  const SignIn = () => {
    return (
      <Content style={[styles.content, {width: width_page, borderRadius: 16}]}>
        <Layout level="9" style={styles.layout}>
          <Image source={Images.auth.hand} />
          <Text category="h3" marginTop={32}>
            Hi Guys!
          </Text>
          <Text category="body" opacity={0.5} marginBottom={24}>
            Welcome back to system!
          </Text>
          <Input placeholder="Username" style={styles.input} />
          <Input placeholder="Password" secureTextEntry/>
          <Button
            children={'Sign In'}
            style={styles.buttonSubmit}
            onPress={goBack}
          />
          <TouchableOpacity style={styles.smiley}>
            <Icon pack="assets" name="smiley" />
          </TouchableOpacity>
          <Text category="callout" marginTop={40}>
            Forgot Password?
          </Text>
        </Layout>
      </Content>
    );
  };
  const Signup = () => {
    return <Content style={[styles.content, {width: width_page}]}></Content>;
  };
  return (
    <Container style={styles.container}>
      <HStack>
        <VStack
          justify="space-between"
          mr={12}
          style={{height: height - top - bottom - 24}}>
          {/* @ts-ignore */}
          <Image source={Images.logo} style={styles.logo} />
          <VStack>
            <VStack mb={24} onPress={goBack}>
              <Icon pack="assets" name="fb" />
            </VStack>
            <TouchableOpacity onPress={goBack}>
              <Icon pack="assets" name="gg" />
            </TouchableOpacity>
          </VStack>
        </VStack>
        <VStack style={{flex: 1}}>
          <HStack itemsCenter mb={40} alignSelfCenter>
            <Text
              uppercase
              category="h6"
              center
              opacity={selectedIndex === 0 ? 1 : 0.5}
              marginRight={24}
              onPress={() => {
                setSelectedIndex(0);
              }}>
              {'sign up'}
            </Text>
            <Text
              onPress={() => {
                setSelectedIndex(1);
              }}
              uppercase
              category="h6"
              center
              opacity={selectedIndex === 1 ? 1 : 0.5}>
              {'sign in'}
            </Text>
          </HStack>
          {selectedIndex === 1 ? <SignIn /> : <Signup />}
        </VStack>
      </HStack>
      <Text category="callout" center status="primary" onPress={goBack}>
        Continue with Guest
      </Text>
    </Container>
  );
});

export default SignUp01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flexGrow: 1,
  },
  logo: {
    width: 32,
    height: 32,
  },
  layout: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 40,
    borderRadius: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonSubmit: {
    flex: 1,
    marginVertical: 24,
    width: '100%',
  },
  smiley: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
