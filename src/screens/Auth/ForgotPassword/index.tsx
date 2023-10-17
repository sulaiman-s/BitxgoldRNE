import * as React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Input,
  Icon,
  Button,
  Spinner,
} from "@ui-kitten/components";

import { Container, Content, Text, NavigationAction } from "components";
import Images from "assets/images";
import { baseURL } from "utils/axiosInstance";
import axios from "axios";
import SuccessModel from "components/SuccessModel";

const ForgotPassword = React.memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<any>();
  const [loader, setLoader] = React.useState(false);
  const [showsuccess, setShowSuccess] = React.useState(false);
  const handleVerification = async () => {
    setLoader(true);
    const { data } = await axios.post(baseURL + "/api/auth/email-verify", {
      email: email,
      type: "forgot",
    });
    if (data?.status === true) {
      setLoader(false);
      setShowSuccess(true);
    } else {
      setLoader(false);
      setError(data?.message);
    }
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={() => <Text category="callout">Forgot Password</Text>}
        accessoryLeft={() => (
          <NavigationAction
            icon="arrow_left"
            status="placeholder"
            size="giant"
          />
        )}
      />
      <Content>
        <Image
          source={Images.auth.frame}
          // @ts-ignore
          style={styles.img}
        />
        <Text category="h2" center marginBottom={16}>
          Forgot Password
        </Text>
        <Text category="body" center marginBottom={16} marginHorizontal={32}>
          Follow the instructions on the link sent to your email!.
        </Text>
        <Input
          accessoryLeft={<Icon pack="assets" name="envelope" />}
          placeholder="Your email"
          style={styles.input}
          onChangeText={(t) => {
            setEmail(t);
            setError(null);
          }}
        />
        {error ? (
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
          children={"Get Reset Link"}
          style={styles.button}
          onPress={handleVerification}
          accessoryRight={loader ? <Spinner size="small" /> : undefined}
        />
      </Content>
      <SuccessModel
        modalVisible={showsuccess}
        name={"Buy"}
        msg={`Reset Link Sent Successfully`}
        isName={true}
        // isbank={true}
        isSubmit={true}
        onPress={() => {
          setShowSuccess(!showsuccess);
          goBack();
        }}
      />
      {/* <Text
        center
        category="h6"
        status="primary"
        marginBottom={8}
        onPress={goBack}
      >
        New Account!
      </Text> */}
    </Container>
  );
});

export default ForgotPassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  img: {
    alignSelf: "center",
    marginBottom: 40,
  },
  content: {},
  input: {
    marginHorizontal: 32,
  },
  button: {
    marginTop: 24,
    marginHorizontal: 32,
  },
});
