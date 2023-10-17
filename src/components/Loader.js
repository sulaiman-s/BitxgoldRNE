import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import Text from "./Text";
import { Spinner } from "@ui-kitten/components";
const Loader = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000080",
        }}
      >
        <View
          style={{
            width: 300,
            height: 100,
            backgroundColor: props.bg ? props.bg : "white",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            // ...ConstantStyle.shadow,
          }}
        >
          <ActivityIndicator size="large" color={"#0000FF"} />
          {/* <Spinner
            size="large"
            status="control"
            style={{ borderColor: "#0000FF" }}
          /> */}
          <Text category="callout">
            {props.txt ? props.txt : "Please wait..."}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
