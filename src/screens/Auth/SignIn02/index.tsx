import * as React from 'react';
import {Image, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Icon,
  Button,
  Divider,
  Input,
} from '@ui-kitten/components';

import {Container, Content, Text, VStack, HStack, NavigationAction} from 'components';
import Images from 'assets/images';
import TabBar from 'components/TabBar';
import { useLayout } from 'hooks';
import { navigate } from 'navigation/RootNavigation';

const SignIn02 = React.memo(() => {
  const {goBack} = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const {height, width, top, bottom} = useLayout();

  const [activeTab, setAtivedTab] = React.useState(0);
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.auth.background_01}
        style={{
          width: "100%",
          height: '100%',
          }}
          resizeMode='cover'
        >
      {/* <TopNavigation
        style={styles.topNavigation}
        accessoryRight={()=>
          <Image
            source={require("../../../assets/images/logo/logo.png")}
            // @ts-ignore
            style={styles.logo}
          />
        }
      /> */}
      <Content contentContainerStyle={styles.content}>
        <VStack mh={28} mt={40}>
          <Text category="h3" marginBottom={4}>
            Sign In
          </Text>
          {/* <Text category="subhead" marginBottom={32}>
            Already have an account?{' '}
            <Text category="subhead" status="primary">
              Login
            </Text>
          </Text> */}
          {/* <TabBar
            style={styles.tabBar}
            onChangeTab={setAtivedTab}
            tabActive={activeTab}
            tabs={['Freelancer', 'Hirer']}
          /> */}
          {/* <Button
            children={'SIGN IN WITH FACEBOOK'}
            status="secondary"
            accessoryLeft={<Icon pack="assets" name="fb" />}
            style={styles.buttonSubmit}
            onPress={goBack}
          />
          <Button
            children={'SIGN IN WITH GOOGLE'}
            status="danger"
            accessoryLeft={<Icon pack="assets" name="gg" />}
            style={styles.buttonSubmit}
            onPress={goBack}
          /> */}
        </VStack>

        {/* <HStack itemsCenter mt={24} mb={48}>
          <Divider style={styles.divider} />
          <Text category="body" opacity={0.5}>
            Or Signup with Email
          </Text>
          <Divider style={styles.divider} />
        </HStack> */}

       <VStack mt={40}>
        <Image
            source={Images.logo}
            // @ts-ignore
            style={styles.logo}
          />
        </VStack> 

        <VStack  mt={40}>
        <Input placeholder="Email" style={styles.input} accessoryLeft={<Icon pack='assets' name='user'/>}/>
        <Input placeholder="Password" style={styles.input}accessoryLeft={<Icon pack='assets' name='lock'/>} />
        <Button children={'Sign In'} style={styles.buttonSignIn} onPress={()=>navigate("Crypto",{screen:'Home'})}/>
        </VStack>
        <VStack mt={18} alignSelfCenter>
          <Text category="subhead" marginBottom={32}>
            Create a new {' '}
            <Text category="subhead" status="primary" onPress={()=>navigate('SignUp')}>
            account
            </Text>
          </Text>
          </VStack>
      </Content>
      </ImageBackground>
    </Container>
  );
});

export default SignIn02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 300,
    height: 48,
    alignSelf:'center',
  },
  topNavigation: {
    marginHorizontal: 16,
  },
  content: {
    flexGrow: 1,
  },
  tabBar: {
    marginHorizontal: 52,
    marginBottom: 40,
  },
  buttonSubmit: {
    borderRadius: 99,
    marginBottom: 24,
    marginHorizontal: 8,
  },
  divider: {
    height: 1,
    width: '20%',
  },
  input: {
    marginBottom: 16,
    marginHorizontal: 32,
  },
  buttonSignIn: {
    marginHorizontal: 32,
    marginTop: 16,
  },
});
