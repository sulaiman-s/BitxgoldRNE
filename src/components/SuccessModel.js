import React from "react";
import { Modal, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";
const SuccessModel = (props) => {
  const { height, width } = Dimensions.get("window");
  return (
    <Modal animationType="fade" transparent={true} visible={props.modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000cd",
        }}
      >
        <View
          style={{
            width: width - 60,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 4,
          }}
        >
          {props.isBank ? (
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "green",
                borderRadius: 50,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                top: -25,
                marginBottom: -25,
                elevation: 1,
              }}
            >
              <Ionicons name="checkmark-sharp" size={40} color={"white"} />
            </View>
          ) : null}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: props.isBank ? 10 : 20,
            }}
          >
            {props.isSubmit ? (
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "green",
                  borderRadius: 50,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  top: -25,
                  marginBottom: -25,
                  elevation: 1,
                }}
              >
                <Ionicons name="checkmark-sharp" size={40} color={"white"} />
              </View>
            ) : null}

            {props.customValue ? (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "grey",
                  textAlign: "center",
                }}
              >
                {props.customValue}
              </Text>
            ) : null}
            {props.isName ? (
              <Text
                style={{
                  fontFamily: "AlbertSans-Regular",
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 22,
                }}
              >
                {props.msg}
              </Text>
            ) : null}
            {props.isTitle ? (
              <Text
                style={{
                  fontFamily: "AlbertSans-Bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {props.title} ${props.value}{" "}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPress}
            style={{
              height: props.isBank ? 35 : 50,
              width: width - 125,
              borderRadius: 10,
              backgroundColor: "#0099FF",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: props.isBank ? 15 : 30,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "AlbertSans-Bold",
                fontSize: 18,
                color: "white",
              }}
            >
              {"ok"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default SuccessModel;
