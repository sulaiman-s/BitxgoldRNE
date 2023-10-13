import * as React from "react";
import { Image, ImageBackground } from "react-native";
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
import { useLayout } from "hooks";
import { navigate } from "navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "reduxKit/reducers/slices";
import { unwrapResult } from "@reduxjs/toolkit";

const SignIn02 = React.memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { height, width, top, bottom } = useLayout();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const [activeTab, setAtivedTab] = React.useState(0);

  const handleLogin = () => {
    //@ts-ignore
    dispatch(login({ email, password }))
      .then(unwrapResult)
      //@ts-ignore
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.auth.background_01}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
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
          </VStack>

          <VStack mt={40}>
            <Image
              source={Images.logo}
              // @ts-ignore
              style={styles.logo}
            />
          </VStack>

          <VStack mt={40}>
            <Input
              placeholder="Email"
              style={styles.input}
              accessoryLeft={<Icon pack="assets" name="user" />}
              onChangeText={(t) => setEmail(t)}
            />
            <Input
              placeholder="Password"
              style={styles.input}
              accessoryLeft={<Icon pack="assets" name="lock" />}
              onChangeText={(t) => setPassword(t)}
            />
            <Button
              children={"Sign In"}
              style={styles.buttonSignIn}
              onPress={handleLogin}
            />
          </VStack>
          <VStack mt={18} alignSelfCenter>
            <Text category="subhead" marginBottom={32}>
              Create a new{" "}
              <Text
                category="subhead"
                status="primary"
                onPress={() => navigate("SignUp")}
              >
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
    alignSelf: "center",
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
