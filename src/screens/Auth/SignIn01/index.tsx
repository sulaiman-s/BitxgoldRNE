import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Input,
  Button,
  Icon,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from 'components';
import Images from 'assets/images';
import useToggle from 'hooks/useToggle';

const SignIn01 = React.memo(() => {
  const {width} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [show, setShow] = useToggle(false);
  const size = 156 * (width / 375);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={()=>
          <Image
            source={Images.logo}
            //@ts-ignore
            style={styles.logo}
          />
        }
        accessoryRight={()=>
          <HStack>
            <NavigationAction
              icon="headphones"
              size="giant"
              status="light-salmon"
            />
            <NavigationAction
              icon="messenger"
              size="giant"
              status="light-salmon"
            />
          </HStack>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <VStack mh={24} mt={20}>
          <Text category="h3">Welcome Back</Text>
          <Input placeholder="Username" style={styles.input} />
          <Input
            placeholder="Password"
            secureTextEntry={!show}
            style={styles.input}
            accessoryRight={
              <TouchableOpacity onPress={setShow}>
                <Icon
                  pack="assets"
                  name={show ? 'eye' : 'eye_close'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            }
          />
          <HStack mt={20} itemsCenter>
            <Text marginRight={40} category="subhead">
              Forgot Password?
            </Text>
            <Button children={'Sign In'} style={styles.signInButton} />
          </HStack>
        </VStack>
      </Content>
      <Layout style={styles.bottom}>
        <HStack wrap>
          {data.map((item, i) => {
            return (
              <VStack
                level="9"
                mb={16}
                border={16}
                key={i}
                ph={16}
                pv={24}
                style={{width: size, height: size}}>
                <Image
                  source={item.image}
                  //@ts-ignore
                  style={styles.img}
                />
                <Text maxWidth={156 * (width / 375)}>{item.title}</Text>
              </VStack>
            );
          })}
        </HStack>
        <Text category="callout" center marginBottom={8}>
          Create An Account!
        </Text>
      </Layout>
    </Container>
  );
});

export default SignIn01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  logo: {
    width: 48,
    height: 48,
  },
  content: {},
  input: {
    marginTop: 16,
  },
  signInButton: {
    flex: 1,
  },
  img: {
    width: 48,
    height: 48,
  },
  bottom: {
    backgroundColor: '#E5CABF',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  icon: {
    tintColor: 'text-placeholder-color',
    width: 20,
    height: 20,
  },
});
const data = [
  {id: '1', title: 'Your portfolios investment', image: Images.auth.folder},
  {id: '2', title: 'Make complex financial', image: Images.auth.shield},
  {id: '3', title: 'Grow up you portfolios', image: Images.auth.target},
  {id: '4', title: 'Saving more cashflow', image: Images.auth.piggybank},
];
