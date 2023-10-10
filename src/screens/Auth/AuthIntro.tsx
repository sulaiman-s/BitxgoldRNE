import * as React from "react";
import { FlatList } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
} from "@ui-kitten/components";

import { Container, NavigationAction } from "components";
import { AuthStackParamList } from "navigation/navigation-types";

interface ButtonProps {
  name: string;
  navigate: keyof AuthStackParamList;
}

const AuthIntro = React.memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const styles = useStyleSheet(themedStyles);

  const data: ButtonProps[] = [
    { name: "SignIn01", navigate: "SignIn01" },
    { name: "SignIn02", navigate: "SignIn02" },
    { name: "SignIn03", navigate: "SignIn03" },
    { name: "SignUp01", navigate: "SignUp01" },
    { name: "SignUp02", navigate: "SignUp02" },
    { name: "SignUp03", navigate: "SignUp03" },
    { name: "ForgotPassword", navigate: "ForgotPassword" },
    { name: "Verify", navigate: "Verify" },
    { name: "CreateAccount", navigate: "CreateAccount" },
    { name: "Authenticate", navigate: "Authenticate" },
  ];

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Authentication"}
        accessoryLeft={<NavigationAction status="placeholder" />}
      />
      <FlatList
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => {
          return (
            <Button
              status="primary"
              size='large'
              children={item.name}
              style={styles.button}
              onPress={() => {
                navigate(item.navigate);
              }}
            />
          );
        }}
      />
    </Container>
  );
});

export default AuthIntro;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
  },
  button: {
    marginBottom: 16,
    borderRadius: 16,
  },
});
