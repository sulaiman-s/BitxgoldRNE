import * as React from "react";
import { Image, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Layout,
  StyleService,
  useStyleSheet,
  Button,
  useTheme,
} from "@ui-kitten/components";

import { Text, HStack, Container, VStack } from "components";
import Images from "assets/images";

const Success = React.memo(
  (
    //@ts-ignore
    { visible, hanldeBack }
  ) => {
    const themes = useTheme();
    const { goBack } = useNavigation();

    const styles = useStyleSheet(themedStyles);

    return (
      <Modal
        style={styles.container}
        //@ts-ignore
        visible={visible}
      >
        <Layout style={{ paddingHorizontal: 24, marginTop: 60 }}>
          <VStack itemsCenter>
            <Text category="h1">Success</Text>
            <Text
              marginTop={8}
              category="body"
              center
              style={{ color: themes["color-basic-300"] }}
            >
              Request Processed Successfully.
            </Text>
          </VStack>

          <Image
            source={Images.be_strong.success}
            resizeMode="cover"
            // @ts-ignore
            style={styles.image}
          />

          <Text
            center
            category="body"
            style={{ color: themes["color-basic-600"] }}
          >
            Check your wallet
          </Text>
          <Button
            //@ts-ignore
            onPress={hanldeBack}
            children="Back to homepage"
            style={{
              width: 188,
              height: 48,
              marginTop: 28,
              alignSelf: "center",
            }}
          />
        </Layout>
      </Modal>
    );
  }
);
export default Success;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  image: {
    width: 330,
    height: 324,
    marginTop: 32,
    marginBottom: 60,
  },
});
