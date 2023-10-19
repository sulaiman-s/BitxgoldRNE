import React from "react";
import { Modal, View, TouchableOpacity, Dimensions } from "react-native";
import Text from "./Text";
import { Button } from "@ui-kitten/components";
const InfoModel = (props) => {
  const { height, width } = Dimensions.get("window");

  const renderContent = () => {
    if (props.type === "confirmation") {
      return (
        <View>
          <Text
            style={{
              fontFamily: "AlbertSans-Bold",
              fontSize: 16,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {props.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.onCancel}
              style={{
                width: 125,
                height: 45,
                backgroundColor: "white",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                elevation: 1,
              }}
            >
              <Text style={{ fontFamily: "AlbertSans-Regular", fontSize: 16 }}>
                cancel
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 125,
                borderRadius: 10,
              }}
            >
              <Button
                children={() => (
                  <Text category="subhead" style={{ color: "white" }}>
                    {props.btnName}
                  </Text>
                )}
                onPress={props.onConfirm}
                style={{ elevation: 1 }}
              />
            </View>
          </View>
        </View>
      );
    } else if (props.type === "success") {
      return (
        <View>
          <Text
            style={{
              fontSize: 8,
              fontFamily: "AlbertSans-Bold",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {props.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                width: 125,
                borderRadius: 10,
                elevation: 1,
              }}
            >
              <Button
                children={() => <Text category="subhead">{props.btnName}</Text>}
                onPress={props.onSccess}
              />
            </View>
          </View>
        </View>
      );
    } else if (props.type === "error") {
      return (
        <View>
          <Text
            style={{
              fontFamily: "AlbertSans-Bold",
              fontSize: 18,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {props.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                width: 125,
                borderRadius: 10,
                elevation: 1,
              }}
            >
              <Button
                children={() => <Text category="subhead">{props.btnName}</Text>}
                onPress={props.onClose}
              />
            </View>
          </View>
        </View>
      );
    }
  };

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
            width: width - 60,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};

export default InfoModel;
