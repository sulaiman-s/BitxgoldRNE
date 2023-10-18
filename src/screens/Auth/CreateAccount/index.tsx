import React, { memo } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Input, TopNavigation, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import AnimatedStep from "../elements/AnimatedStep";
import NavigationAction from "components/NavigationAction";
import { SceneMap, TabView } from "react-native-tab-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useLayout from "hooks/useLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import { baseURL } from "utils/axiosInstance";
import Loader from "components/Loader";
import SuccessModel from "components/SuccessModel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerData, updateRegData } from "reduxKit/reducers/slices";

const CreateAccount = memo(() => {
  const { goBack } = useNavigation();
  const { width, bottom } = useLayout();
  const [index, setIndex] = React.useState<number>(0);
  const dispatch = useDispatch();
  const { user_name, contact, email, password } = useSelector(
    //@ts-ignore
    (state) => state.userReg
  );
  const [requestFlow, setRequestFlow] = React.useState<string>("");
  const [loader, setLoader] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [err, setError] = React.useState<any>(null);

  const ErrorMessage = (
    //@ts-ignore
    { error, visible }
  ) => {
    if (!visible || !error) return null;
    return (
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
    );
  };

  async function checkReferCode(referalAddress: any) {
    setRequestFlow("Verifying Refer Code...");
    const requestBody = {
      wallet_address: referalAddress,
    };
    await axios
      .post(baseURL + "/api/bonusrefer/check", requestBody)
      .then((res) => {
        if (res.data.status) {
          signUp(referalAddress);
        } else {
          setLoader(false);
          setError("Invalid Refer Code.");
        }
      });
  }
  async function signUp(refer_code: any) {
    setRequestFlow("Processing Registration...");
    try {
      const postData = {
        user_name: user_name,
        email: email,
        contact: contact,
        password: password,
      };
      const response = await axios.post(
        `${baseURL}/api/auth/register`,
        postData
      );
      if (response.data.status) {
        setRequestFlow("Updating Refer...");
        const requestBody = {
          user_id: response.data.user_id,
          refer_code: refer_code,
        };
        const resp = await axios.post(
          `${baseURL}/api/bonusrefer/`,
          requestBody
        );
        console.log(resp.data, "res");
        if (resp.data === "Refere Added Successfully.") {
          //@ts-ignore
          await axios
            .post(`${baseURL}/api/refer/`, requestBody)
            .then((respo) => {
              if (respo.data.status) {
                setLoader(false);
                setShowSuccess(true);
              } else {
                setLoader(false);
                setError(respo.data.message);
              }
            });
        } else {
          setLoader(false);
          setError(resp.data.message);
        }
      } else {
        setLoader(false);
        setError(response.data.message);
      }
    } catch (error: any) {
      setLoader(false);
      setError(error.message);
    }
  }

  const handleNext = ({ username, contact, email }: any) => {
    dispatch(
      registerData({ username: username, contact: contact, email: email })
    );
    setIndex(index + 1);
  };

  const handleNext1 = ({ password }: any) => {
    dispatch(updateRegData({ password: password }));
    setIndex(index + 1);
  };

  const handleNext2 = async (refer_code: any) => {
    setLoader(true);
    try {
      await checkReferCode(refer_code);
    } catch (error: any) {
      setLoader(false);
      setError(error.message);
    }
  };

  const Tab1 = React.useCallback(() => {
    let schema = Yup.object().shape({
      username: Yup.string()
        .required()
        .min(4)
        .matches(RegExp("[^0-9]"), "Add minimum one alphabet")
        .label("UserName"),
      contact: Yup.string().required().min(11).max(14).label("phone number"),
      email: Yup.string().required().email().label("Email"),
    });
    return (
      <KeyboardAwareScrollView
        style={styles.content}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{ fontFamily: "AlbertSans-Bold", fontSize: 24 }}
          center
          marginBottom={32}
        >
          Create an account
        </Text>
        <Formik
          initialValues={{
            username: "",
            contact: "",
            email: "",
          }}
          onSubmit={(values) => handleNext(values)}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <Input
                placeholder="Username"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="user" />}
                onChangeText={handleChange("username")}
                onBlur={() => setFieldTouched("username")}
              />
              <ErrorMessage
                error={errors.username}
                visible={touched.username}
              />
              <Input
                placeholder="Email"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="email" />}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                keyboardType="email-address"
              />
              <ErrorMessage error={errors.email} visible={touched.email} />
              <Input
                placeholder="Phone"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="phone" />}
                onChangeText={handleChange("contact")}
                onBlur={() => setFieldTouched("contact")}
                keyboardType="phone-pad"
              />
              <ErrorMessage error={errors.contact} visible={touched.contact} />
              <Button
                children="NEXT STEP"
                style={styles.button}
                //@ts-ignore
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }, [index]);
  const Tab2 = React.useCallback(() => {
    let schema = Yup.object().shape({
      password: Yup.string()
        .required()
        .min(8)
        .label("Password")
        .matches(
          RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),
          "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        ),
      confirmPassword: Yup.string()
        .required()
        .label("ConfirmPassword")
        .oneOf([Yup.ref("password"), ""], "Password must match"),
    });
    const [show, setShow] = React.useState(false);
    const passwordShow = () => setShow(!show);
    //@ts-ignore
    const renderIcon = (props): React.ReactElement => (
      <TouchableWithoutFeedback onPress={passwordShow}>
        <Icon
          {...props}
          name={show ? "eye-off" : "eye"}
          style={{ height: 20, width: 20 }}
        />
      </TouchableWithoutFeedback>
    );
    return (
      <KeyboardAwareScrollView
        style={styles.content}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{ fontFamily: "AlbertSans-Bold", fontSize: 24 }}
          center
          marginBottom={32}
        >
          Set a Password
        </Text>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => handleNext1(values)}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <Input
                placeholder="Password"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="lock" />}
                accessoryRight={renderIcon}
                secureTextEntry={show ? false : true}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              <ErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <Input
                placeholder="Confirm Password"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="shield" />}
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => setFieldTouched("confirmPassword")}
                secureTextEntry
              />
              <ErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              <Button
                children="NEXT STEP"
                style={styles.button}
                //@ts-ignore
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }, [index]);
  const Tab3 = React.useCallback(() => {
    let schema = Yup.object().shape({
      refer_code: Yup.string().required().min(14).label("Refer Code"),
    });
    return (
      <KeyboardAwareScrollView
        style={styles.content}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{ fontFamily: "AlbertSans-Bold", fontSize: 24 }}
          center
          marginBottom={32}
        >
          Add a Referral
        </Text>
        <Formik
          initialValues={{
            refer_code: "",
          }}
          onSubmit={({ refer_code }) => {
            setError(null);
            handleNext2(refer_code);
          }}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <Text
                category="h8"
                marginBottom={32}
                selectable
                selectionColor={"yellow"}
              >
                If you don't have any referral address please use this :
                <Text category="h8" selectable={true}>
                  0x97A760EeD672A22c0B782F813F30598B8f994038
                </Text>
              </Text>
              <Input
                placeholder="Referar code"
                style={styles.input}
                accessoryLeft={<Icon pack="assets" name="person" />}
                onChangeText={handleChange("refer_code")}
                onBlur={() => setFieldTouched("refer_code")}
                // value={
                //   referCode.length > 0
                //     ? referCode
                //     : "0x97A760EeD672A22c0B782F813F30598B8f994038"
                // }
              />
              <ErrorMessage
                error={errors.refer_code}
                visible={touched.refer_code}
              />
              <Button
                children="Submit"
                style={styles.button}
                //@ts-ignore
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }, []);

  const renderScene = SceneMap({
    first: Tab1,
    second: Tab2,
    third: Tab3,
  });
  const [routes] = React.useState([
    { key: "first", title: "" },
    { key: "second", title: "" },
    { key: "third", title: "" },
  ]);
  return (
    <Container useSafeArea>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={() => {
          return (
            <NavigationAction
              icon={"xcircle"}
              status="placeholder"
              size="giant"
            />
          );
        }}
      />
      <AnimatedStep style={styles.animatedStep} step={index} />
      <Text
        category="callout"
        center
        marginTop={39}
        status="placeholder"
        marginBottom={8}
      >
        Step 0{index + 1}.
      </Text>
      <TabView
        lazy
        lazyPreloadDistance={2000}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        overScrollMode="never"
        onIndexChange={setIndex}
        initialLayout={{ width }}
        style={styles.container}
        renderTabBar={() => null}
        swipeEnabled={false}
      />
      {err ? (
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            marginHorizontal: 15,
            color: "red",
          }}
        >
          {err}
        </Text>
      ) : null}
      <Loader visible={loader} txt={requestFlow} />
      <SuccessModel
        modalVisible={showSuccess}
        name={"Buy"}
        msg={`Account Registered Successfully.`}
        isName={true}
        // isbank={true}
        isSubmit={true}
        onPress={() => {
          setShowSuccess(!showSuccess);
          goBack();
        }}
      />
    </Container>
  );
});

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  topNav: {
    marginHorizontal: 12,
  },
  input: {
    marginBottom: 16,
  },
  input01: {
    flex: 1,
    marginRight: 16,
  },
  inputPhone: {
    marginVertical: 20,
  },
  content: {
    marginHorizontal: 24,
  },
  flexRow: {
    flexDirection: "row",
  },
  animatedStep: {
    marginTop: 28,
  },
  layout: {
    flexDirection: "row",
    marginBottom: 24,
  },
  button: {
    marginTop: 32,
    marginHorizontal: 12,
  },
});
