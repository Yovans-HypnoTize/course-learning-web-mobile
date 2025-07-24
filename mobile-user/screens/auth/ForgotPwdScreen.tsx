import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { forgotPassword } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigation } from '@react-navigation/native';
import FormField from '../../components/FormFactory/FormField';
import BackDrop from '../../components/BackDrop';
import { toastAndroid } from '../../utils/Utils';
import ReuGradientButton from '../../components/ReuGradientButton';

const ForgotPwdScreen = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.auth.loading);

  const handleForgotPassword = async (values: any) => {
    try {
      const response = await dispatch(forgotPassword(values)).unwrap();
      if (response.status === 200) {
        toastAndroid(
          response.data.message || 'OTP sent successfully to your email',
        );
        navigation.navigate("Otp-Verify", {email: values.email} )
        // Toast.success(
        //   response.data.message || 'OTP sent successfully to your email',
        // );
      } else {
        toastAndroid('An unexpected error occurred');
        // Toast.error('An unexpected error occurred');
      }
    } catch (err: any) {
      toastAndroid(err || 'An unexpected error occurred');
      // Toast.error(err || 'An unexpected error occurred');
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '80%',
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../assets/auth/registerScreenHeaderImg.png')}
          style={styles.forgotPwdHeaderImage}
        />
        <View style={styles.forgotLoginTextContainer}>
          <Text style={styles.forgotLoginText}>Forgot Password?</Text>
          <View>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 60,
                marginTop: 20,
              }}
            >
              Enter your email to get a verification code to reset your
              password.
            </Text>
          </View>
        </View>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {formikProps => (
            <View>
              <View style={styles.inputContainer}>
                <FormField
                  formik={formikProps}
                  fieldProps={{
                    name: 'email',
                    placeholder: 'Email',
                    fieldType: 'textbox-outlined',
                    required: true,
                    type: 'email',
                  }}
                  key={'Email'}
                />
              </View>

              <View style={styles.submitBtnContainer}>
                <ReuGradientButton
                  label="Send Code"
                  onPress={() => formikProps.handleSubmit()}
                  gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>

      <View
        style={{
          height: '20%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 60,
        }}
      >
        <View style={[styles.forgotPwdTextContainer, { marginBottom: 10 }]}>
          <Link
            screen="Otp-Verify"
            params={{}}
            style={styles.forgotPwdLinkText}
          >
            OTP Verify
          </Link>
        </View>

        <View style={styles.forgotPwdTextContainer}>
          <Text>Already have an account?</Text>
          <Link screen="Login" params={{}} style={styles.forgotPwdLinkText}>
            Sign In
          </Link>
        </View>
      </View>

      {loading && <BackDrop />}
    </View>
  );
};

export default ForgotPwdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  forgotPwdHeaderImage: {
    height: 100,
    width: 150,
    marginBottom: 20,
  },
  forgotLoginTextContainer: {
    marginTop: 20,
    marginBottom: 35,
  },
  forgotLoginText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 12,
    width: 300,
  },
  forgotPasswordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  submitBtnContainer: {
    marginTop: 20,
  },
  forgotPwdTextContainer: {
    // marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  forgotPwdLinkText: {
    marginLeft: 5,
    marginTop: 5,
    color: '#B53133',
    fontWeight: 700,
  },
});
