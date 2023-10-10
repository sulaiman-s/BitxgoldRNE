import React from "react";
import { StyleSheet } from "react-native";
import {
  BottomNavigation,
  BottomNavigationProps,
  BottomNavigationTab,
  Icon,
  IconElement,
} from "@ui-kitten/components";
// import { navigate } from "navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";

const PersonIcon = (props: any): IconElement => (
  <Icon {...props} name="person-outline" />
);

const TimerIcon = (props: any): IconElement => (
  <Icon {...props} name="clock-outline" />
);

const HomeIcon = (props: any): IconElement => (
  <Icon {...props} name="home-outline" />
);

const WalletIcon = (props: any): IconElement => (
  <Icon {...props} name="credit-card-outline" />
);

const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const BottomTab = (): React.ReactElement => {
  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();
  const navigation = useNavigation();
  return (
    <>
      <BottomNavigation style={styles.bottomNavigation} {...topState}>
        <BottomNavigationTab title="Home" icon={HomeIcon} />
        <BottomNavigationTab
          title="Wallet"
          icon={WalletIcon}
          onPress={() => navigation.navigate("Crypto", { screen: "Wallet" })}
        />
        <BottomNavigationTab title="Stake" icon={TimerIcon} />
        <BottomNavigationTab title="Profile" icon={PersonIcon} />
      </BottomNavigation>

      {/* <BottomNavigation style={styles.bottomNavigation} {...bottomState}>
        <BottomNavigationTab icon={PersonIcon} />
        <BottomNavigationTab icon={BellIcon} />
        <BottomNavigationTab icon={EmailIcon} />
      </BottomNavigation> */}
    </>
  );
};
export default BottomTab;
const styles = StyleSheet.create({
  bottomNavigation: {
    height: 40,
    marginBottom: 19,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: "text-white-color",
    marginLeft: 16,
  },
});
