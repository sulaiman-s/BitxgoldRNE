import * as React from "react";
import { Image } from "react-native";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Input,
  Icon,
  Button,
  Spinner,
} from "@ui-kitten/components";

import { Container, Content, Text, NavigationAction, HStack } from "components";
import Images from "assets/images";
import useCountDownUtil from "utils/useCountDownUtil";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { baseURL } from "utils/axiosInstance";
import SuccessModel from "components/SuccessModel";

const Verify = React.memo(({ route }: any) => {
  const styles = useStyleSheet(themedStyles);
  const [time, reset] = useCountDownUtil(30);
  const emailPass = route.params.email;
  const [email, setEmail] = React.useState(emailPass);
  const [error, setError] = React.useState<any>();
  const [loader, setLoader] = React.useState(false);
  const [showsuccess, setShowSuccess] = React.useState(false);

  const { goBack } = useNavigation();

  const handleVerification = async () => {
    setLoader(true);
    const { data } = await axios.post(baseURL + "/api/auth/email-verify", {
      email: email,
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
        accessoryRight={() => (
          <NavigationAction icon="xcircle" status="placeholder" size="giant" />
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <Image
          source={Images.auth.shield}
          //@ts-ignore
          style={styles.image}
        />
        <Text category="h2" marginBottom={16}>
          Verify User!
        </Text>
        <Text category="body" status="placeholder" marginBottom={32}>
          After clicking the confirm the verification link will be sent to your
          email!
        </Text>
        <Input
          placeholder="Code from email"
          accessoryLeft={<Icon pack="assets" name="email" />}
          style={styles.input}
          value={email}
          onChangeText={(t) => {
            setError(null);
            setEmail(t);
          }}
        />
        <Button
          children={"Confirm"}
          accessoryRight={<Icon pack="assets" name="caret_right" />}
          accessoryLeft={loader ? <Spinner size="small" /> : undefined}
          style={{ width: "70%", alignSelf: "center" }}
          onPress={handleVerification}
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
      </Content>
      <HStack itemsCenter mh={32} mb={8}></HStack>
      <SuccessModel
        modalVisible={showsuccess}
        name={"Buy"}
        msg={`Email Sent Successfully.`}
        isName={true}
        // isbank={true}
        isSubmit={true}
        onPress={() => {
          setShowSuccess(!showsuccess);
          goBack();
        }}
      />
    </Container>
  );
});

export default Verify;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
  },
  image: {
    alignSelf: "center",
    marginBottom: 32,
    height: 150,
    width: 150,
  },
  input: {
    marginBottom: 16,
  },
});
