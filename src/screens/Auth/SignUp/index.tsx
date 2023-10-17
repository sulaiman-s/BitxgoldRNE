import * as React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Icon,
  Button,
  Divider,
  Input,
} from "@ui-kitten/components";

import {
  Container,
  Content,
  Text,
  VStack,
  HStack,
  NavigationAction,
} from "components";
import Images from "assets/images";
import TabBar from "components/TabBar";
import { navigate } from "navigation/RootNavigation";
import * as Yup from "yup";
import { Formik } from "formik";
const SignUp02 = React.memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const ErrorMessage = (
    //@ts-ignore
    { error, visible }
  ) => {
    if (!visible || !error) return null;
    return (
      <Text
        style={{
          fontSize: 14,
          textAlign: "center",
          marginHorizontal: 15,
          color: "red",
        }}
      >
        {error}
      </Text>
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryRight={() => (
          <Image
            source={Images.logo}
            // @ts-ignore
            style={styles.logo}
          />
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <VStack mh={28}>
          <Text category="h3" marginBottom={4}>
            Create an account
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
        <VStack mt={50}>
          <Input
            placeholder="Username"
            style={styles.input}
            accessoryLeft={<Icon pack="assets" name="user" />}
          />
          <Input
            placeholder="Email"
            style={styles.input}
            accessoryLeft={<Icon pack="assets" name="email" />}
          />
          <Input
            placeholder="Phone Number"
            style={styles.input}
            accessoryLeft={<Icon pack="assets" name="phone" />}
          />
          <Input
            placeholder="Password"
            style={styles.input}
            accessoryLeft={<Icon pack="assets" name="lock" />}
          />
          <Button children={"Sign In"} style={styles.buttonSignIn} />
        </VStack>
        <VStack mt={18} alignSelfCenter>
          <Text category="subhead" marginBottom={32}>
            Already have an account?{" "}
            <Text
              category="subhead"
              status="primary"
              onPress={() => navigate("SignIn")}
            >
              Login
            </Text>
          </Text>
        </VStack>
      </Content>
    </Container>
  );
});

export default SignUp02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 48,
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
    width: "20%",
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
