import * as React from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Input,
  Icon,
  Button,
  CheckBox,
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction, HStack} from 'components';
import Images from 'assets/images';

const SignUp03 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const [activeTab, setActiveTab] = React.useState(1);
  const [activeTerm, setActiveTerm] = React.useState(false);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={
          <Image
            source={Images.logo}
            //@ts-ignore
            style={styles.logo}
          />
        }
        accessoryLeft={
          <NavigationAction
            icon="arrow_left"
            status="light-salmon"
            size="giant"
          />
        }
      />

      <Content contentContainerStyle={styles.content}>
        <HStack justify="flex-start" mt={40} mb={32}>
          <Text
            marginRight={16}
            uppercase
            category="h6"
            opacity={activeTab == 0 ? 1 : 0.5}
            onPress={() => {
              setActiveTab(0);
            }}>
            Sign Up
          </Text>
          <Text
            uppercase
            category="h6"
            opacity={activeTab == 1 ? 1 : 0.5}
            onPress={() => {
              setActiveTab(1);
            }}>
            Sign In
          </Text>
        </HStack>
        {activeTab === 1 ? (
          <View>
            <Layout level="8" style={styles.layout}>
              <Input
                placeholder="Username"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="user" />}
              />
              <Input
                placeholder="Your email"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="email" />}
              />
              <Input
                placeholder="Password"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="lock" />}
              />
              <Input
                placeholder="Re Password"
                accessoryLeft={<Icon pack="assets" name="lock" />}
              />
              <Button children={'Sign Up Now'} style={styles.signup} />
            </Layout>
            <HStack>
              <Button
                status="secondary"
                children={'Facebook'}
                accessoryLeft={<Icon pack="assets" name="fb" />}
                style={styles.buttonFb}
              />
              <Button
                status="danger"
                children={'Google'}
                accessoryLeft={<Icon pack="assets" name="gg" />}
                style={styles.buttonGG}
              />
            </HStack>
            <HStack mt={40}>
              <CheckBox
                checked={activeTerm}
                onChange={setActiveTerm}
                status="primary"
              />
              <Text
                category="subhead"
                marginLeft={8}
                marginRight={32}
                opacity={0.5}>
                By continuing, you agree to TramKam UI KIT Term of Use and
                confirm that you have read Pricacy Policy.
              </Text>
            </HStack>
          </View>
        ) : (
          <></>
        )}
      </Content>
    </Container>
  );
});

export default SignUp03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  content: {
    marginHorizontal: 24,
  },
  layout: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
  },
  input: {
    marginBottom: 24,
  },
  signup: {
    marginTop: 32,
  },
  buttonGG: {
    flex: 1,
    marginLeft: 16,
  },
  buttonFb: {
    flex: 1,
  },
});
