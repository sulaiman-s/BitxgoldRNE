import * as React from "react";
import { ColorValue, Image, TouchableOpacity, View } from "react-native";
import { useLayout } from "hooks";
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Layout,
  Icon,
  useTheme,
} from "@ui-kitten/components";

import { Ionicons } from "@expo/vector-icons";

import { Container, Content, Text, NavigationAction } from "components";
import Images from "assets/images";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "reduxKit/reducers/slices";
import { useNavigation } from "@react-navigation/native";
import { UIManager } from "react-native";
import { Platform } from "react-native";
import { LayoutAnimation } from "react-native";
import InfoModel from "components/InfoModel";

interface Props {
  id: number;
  title: string;
  icon: string;
  color: ColorValue | string;
  tintColor: ColorValue | string;
  handle: Function;
}
interface ItemProps {
  item: Props;
  onPress?(): void;
}

const Profile02 = React.memo(() => {
  const { navigate } = useNavigation();
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  //@ts-ignore
  const { user_name, email, contact } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const [showData, setShowData] = React.useState(false);
  const theme = useTheme();
  const data = [
    {
      id: 1,
      title: "Transaction History",
      icon: "grid_four",
      color: "#949398",
      tintColor: "text-white-color",
      handle: function () {
        //@ts-ignore
        navigate("History");
      },
    },
    // {
    //   id: 2,
    //   title: "Buy",
    //   icon: "grid_four",
    //   color: "#949398",
    //   tintColor: "text-white-color",
    //   handle: function () {
    //     //@ts-ignore
    //     navigate("Buy");
    //   },
    // },

    // {
    //   id: 4,
    //   title: "Sell",
    //   icon: "grid_four",
    //   color: "#949398",
    //   tintColor: "text-white-color",
    //   handle: function () {
    //     //@ts-ignore
    //     navigate("Sell");
    //   },
    // },
    // {
    //   id: 5,
    //   title: "Stake",
    //   icon: "grid_four",
    //   color: "#949398",
    //   tintColor: "text-white-color",
    //   handle: function () {
    //     //@ts-ignore
    //     navigate("Stakee");
    //   },
    // },
    // {
    //   id: 5,
    //   title: "Withdraw",
    //   icon: "grid_four",
    //   color: "#949398",
    //   tintColor: "text-white-color",
    //   handle: function () {
    //     //@ts-ignore
    //     navigate("Withdraw");
    //   },
    // },
    // {
    //   id: 0,
    //   title: "Edit Profile",
    //   icon: "target",
    //   color: "#FBF0EA",
    //   tintColor: "text-primary-color",
    //   handle: function () {
    //     console.log(this.id, "clicked");
    //   },
    // },
    // {
    //   id: 2,
    //   title: "Change Password",
    //   icon: "shield",
    //   color: "#215190",
    //   tintColor: "text-white-color",
    //   handle: function () {
    //     console.log(this.id, "clicked");
    //   },
    // },
    {
      id: 3,
      title: "Log Out",
      icon: "switch",
      color: "#C06363",
      tintColor: "text-white-color",
      handle: function () {
        console.log(this.id, "clicked");
      },
    },
  ];

  const RenderItem = React.useCallback(({ item, onPress }: ItemProps) => {
    const [show, setShow] = React.useState(false);

    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    if (item?.id == 1) {
      return (
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            //@ts-ignore

            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setShow(!show);
            }}
          >
            <Layout style={styles.item} level="2">
              <View style={styles.flexRow}>
                <View style={[styles.icon, { backgroundColor: item.color }]}>
                  <Icon
                    pack="assets"
                    name={item.icon}
                    //@ts-ignore
                    style={{ tintColor: theme[item.tintColor] }}
                  />
                </View>
                <Text
                  marginTop={23}
                  marginLeft={8}
                  children={item.title}
                  category="callout"
                />
              </View>
              <Ionicons
                name={!show ? "chevron-forward" : "chevron-down"}
                size={24}
                color="black"
              />
            </Layout>
          </TouchableOpacity>
          {show && (
            <View style={styles.dropDownMainBox}>
              <TouchableOpacity
                style={styles.dropDownBox}
                //@ts-ignore
                onPress={() => navigate("Buy")}
              >
                <Text style={styles.dropDownBoxText}>- Buy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropDownBox}
                //@ts-ignore
                onPress={() => navigate("Sell")}
              >
                <Text style={styles.dropDownBoxText}>- Sell</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropDownBox}
                //@ts-ignore
                onPress={() => navigate("Stakee")}
              >
                <Text style={styles.dropDownBoxText}>- Stake</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropDownBox}
                //@ts-ignore
                onPress={() => navigate("Withdraw")}
              >
                <Text style={styles.dropDownBoxText}>- Withdraw</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          //@ts-ignore
          onPress={() => {
            if (item.title == "Log Out") setVisible(!visible);
            else {
              item.handle();
            }
          }}
        >
          <Layout style={styles.item} level="2">
            <View style={styles.flexRow}>
              <View style={[styles.icon, { backgroundColor: item.color }]}>
                <Icon
                  pack="assets"
                  name={item.icon}
                  //@ts-ignore
                  style={{ tintColor: theme[item.tintColor] }}
                />
              </View>
              <Text
                marginTop={23}
                marginLeft={8}
                children={item.title}
                category="callout"
              />
            </View>
            <Icon
              pack="assets"
              name={"caret_right"}
              style={[{ tintColor: theme["text-basic-color"] }]}
            />
          </Layout>
        </TouchableOpacity>
      );
    }
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={() => (
          <Text category="callout" status="basic">
            Profile
          </Text>
        )}
        accessoryLeft={() => (
          <View style={styles.topNav}>
            <NavigationAction icon="arrow_left" status="primary" size="giant" />
          </View>
        )}
      />
      <Content contentContainerStyle={styles.content} scrollEventThrottle={16}>
        <View>
          <View style={styles.viewAvatar}>
            <Avatar
              source={Images.avatar.avatar10}
              /* @ts-ignore */
              style={styles.avatar}
            />
            <View>
              <Text
                children={user_name}
                marginLeft={12}
                status="basic"
                category="callout"
                style={{ fontSize: 24 }}
              />
              <Text
                children={email}
                marginTop={12}
                category="subhead"
                status="snow"
                marginLeft={12}
              />
            </View>
          </View>
        </View>
        {data.map((item, index) => (
          <View style={{ paddingHorizontal: 24 }} key={index}>
            <RenderItem
              //@ts-ignore
              item={item}
            />
          </View>
        ))}
      </Content>
      <InfoModel
        visible={visible}
        type="confirmation"
        title="Log Out Confirmation"
        btnName="ok"
        onConfirm={() => dispatch(logout())}
        onCancel={() => setVisible(!visible)}
      />
    </Container>
  );
});

export default Profile02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  animatedTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAvatar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 32,
    marginBottom: 32,
  },
  content: {
    paddingBottom: 120,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 24,
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 2,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    width: 32,
    height: 32,
    marginTop: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginTop: 16,
    justifyContent: "space-between",
    paddingRight: 16,
  },
  icon: {
    borderRadius: 16,
    padding: 12,
    margin: 10,
  },
  dropDownMainBox: {
    backgroundColor: "#F7F9FC",
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
  dropDownBox: {
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  dropDownBoxText: {
    // textAlign: "center",
    paddingLeft: "1%",
    backgroundColor: "#F7F9FC",
  },
});
