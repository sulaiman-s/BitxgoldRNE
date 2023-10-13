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

import { Container, Content, Text, NavigationAction } from "components";
import Images from "assets/images";
import { useDispatch } from "react-redux";
import { logout } from "reduxKit/reducers/slices";

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
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  const theme = useTheme();
  const RenderItem = React.useCallback(({ item, onPress }: ItemProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        //@ts-ignore
        onPress={() => {
          if (item.title == "Log Out") dispatch(logout());
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
            {/* <NavigationAction
              icon="circles_four"
              status="primary"
              size="giant"
            /> */}
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
                children="Christy Mcdonald"
                marginLeft={12}
                status="basic"
                category="h4"
              />
              <Text
                children="ChristyMcdonal@gmail.com"
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
});
const data = [
  {
    id: 1,
    title: "Transaction History",
    icon: "grid_four",
    color: "#949398",
    tintColor: "text-white-color",
    handle: function () {
      console.log(this.id, "clicked");
    },
  },
  {
    id: 0,
    title: "Edit Profile",
    icon: "target",
    color: "#FBF0EA",
    tintColor: "text-primary-color",
    handle: function () {
      console.log(this.id, "clicked");
    },
  },
  {
    id: 2,
    title: "Change Password",
    icon: "shield",
    color: "#215190",
    tintColor: "text-white-color",
    handle: function () {
      console.log(this.id, "clicked");
    },
  },
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
