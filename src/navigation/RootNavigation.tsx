import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();
//@ts-ignore
export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function reset(name: any) {
  if (navigationRef.isReady()) {
    navigationRef?.resetRoot({
      index: 0,
      routes: [{ name: name }],
    });
  }
}
