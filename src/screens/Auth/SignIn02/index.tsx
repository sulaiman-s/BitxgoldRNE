import * as React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Button,
  Input,
} from "@ui-kitten/components";

import { Container, Content, Text, VStack } from "components";
import Images from "assets/images";
import { useLayout } from "hooks";
import { navigate } from "navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { login } from "reduxKit/reducers/slices";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "components/Loader";

const SignIn02 = React.memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { height, width, top, bottom } = useLayout();
  const [error, setError] = React.useState<any>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const passwordShow = () => setShow(!show);

  //@ts-ignore
  const renderIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={passwordShow}>
      <Icon
        {...props}
        name={show ? "eye-off" : "eye"}
        style={{ height: 20, width: 20 }}
      />
    </TouchableWithoutFeedback>
  );

  const handleLogin = () => {
    setLoader(true);
    //@ts-ignore
    dispatch(login({ email, password }))
      .then(unwrapResult)
      .then((payload: any) => {
        setLoader(false);
      })
      //@ts-ignore
      .catch((error) => {
        setLoader(false);
        setError(error.message);
        if (error.message === "Email is not verified.") {
          navigate("verify", { email });
        }
      });
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <VStack mh={28} mt={40}>
          <Text style={{ fontFamily: "AlbertSans-Bold", fontSize: 24 }}>
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

        <VStack mt={90}>
          <Input
            placeholder="Email"
            style={styles.input}
            accessoryLeft={<Icon pack="assets" name="user" />}
            onChangeText={(t) => {
              setEmail(t);
              setError(null);
            }}
          />
          <Input
            placeholder="Password"
            style={styles.input}
            accessoryLeft={<Icon pack="assets" name="lock" />}
            accessoryRight={renderIcon}
            onChangeText={(t) => {
              setPassword(t);
              setError(null);
            }}
            secureTextEntry={show ? false : true}
          />
          {error != null ? (
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
          ) : null}
          <Button
            children={"Sign In"}
            style={styles.buttonSignIn}
            onPress={handleLogin}
          />
        </VStack>
        <VStack mt={18} mh={32}>
          <Text category="subhead" marginBottom={16}>
            Forgot password?{" "}
            <Text
              category="subhead"
              status="primary"
              onPress={() => navigate("ForgotPassword")}
            >
              Click here
            </Text>
          </Text>
          <Text category="subhead" marginBottom={16}>
            Don't have an account?{" "}
            <Text
              category="subhead"
              status="primary"
              onPress={() => navigate("SignUp")}
            >
              Register here
            </Text>
          </Text>
        </VStack>
        <Loader visible={loader} />
      </Content>
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
