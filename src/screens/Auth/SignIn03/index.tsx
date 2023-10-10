import * as React from 'react';
import {Image, ImageBackground, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Icon,
} from '@ui-kitten/components';

import {Text, HStack} from 'components';
import Images from 'assets/images';

const SignIn03 = React.memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const LinkButton = ({onPress, title}: {onPress(): void; title: string}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.link}>
        <Icon pack="assets" name="caret_right" style={styles.caretIcon} />
        <Text category="callout" status="primary" marginLeft={8}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Layout style={styles.container}>
      <ImageBackground
        source={Images.auth.background_02}
        style={{
          width: width,
          height: height,
          paddingHorizontal: 40,
          paddingTop: top + 40,
        }}>
        <Image
          source={Images.logo}
          //@ts-ignore
          style={styles.logo}
        />
        <Text category="h1">Changing the Face of Decentralized Finance.</Text>
        <Input placeholder="Enter ENS domain" style={styles.input} />
        <Button children={'Go Now!'} />
        <Button
          children={'Connect Wallet'}
          status="purple"
          style={styles.connect}
        />
        <LinkButton onPress={goBack} title="About us TramKam" />
        <LinkButton onPress={goBack} title="Understand our project?" />
        <LinkButton onPress={goBack} title="Contact us" />
        <HStack mt={40}>
          {IMG.map((item, i) => {
            return <Image source={item} key={i} />;
          })}
        </HStack>
      </ImageBackground>
    </Layout>
  );
});

export default SignIn03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  input: {
    marginVertical: 24,
  },
  connect: {
    marginTop: 16,
    marginBottom: 32,
  },
  caretIcon: {
    tintColor: 'text-primary-color',
  },
  link: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const IMG = [
  Images.auth.target,
  Images.auth.shield,
  Images.auth.folder,
  Images.auth.piggybank,
];
