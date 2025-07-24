import { StyleSheet, Text, View, Image, BackHandler, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import React from 'react';
import { Link } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Toast } from 'toastify-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormField from '../../components/FormFactory/FormField';
import BackDrop from '../../components/BackDrop';
import ReuGradientButton from '../../components/ReuGradientButton';
import { useCallback } from 'react';
import { loginUser } from './authSlice';
import { useFocusEffect } from '@react-navigation/native';
import { toastAndroid } from '../../utils/Utils';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.auth.loading);

  const handleLogin = async (values: any) => {
    try {
      const response = await dispatch(loginUser(values)).unwrap();
      if (response.status === 200) {
        toastAndroid(response.data.message || 'Login successful')
        // Toast.success(response.data.message || 'Login successful');
      } else {
        toastAndroid('An unexpected error occurred')
        // Toast.error('An unexpected error occurred');
      }
    } catch (err: any) {
      toastAndroid(err || 'An unexpected error occurred')
      // Toast.error(err || 'An unexpected error occurred');
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      ),
  });

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={['#002D62', '#002147']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
      <Image
        source={require('../../assets/auth/registerScreenHeaderImg.png')}
        style={styles.registerHeaderImage}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.registerTextContainer}>
          <Text style={styles.registerText}>Login to your account</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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

              <View style={styles.inputContainer}>
                <FormField
                  formik={formikProps}
                  fieldProps={{
                    name: 'password',
                    placeholder: 'Password',
                    fieldType: 'textbox-outlined',
                    required: true,
                    type: 'password',
                  }}
                  key={'Password'}
                />
              </View>
              <View style={styles.forgotPasswordContainer}>
                <Link
                  screen="Forgot-Password"
                  params={{}}
                  style={[styles.registerLinkText, { color: '#B53133' }]}
                >
                  Forgot Password?
                </Link>
              </View>

              <View style={styles.submitBtnContainer}>
                <ReuGradientButton
                  label="Sign In"
                  onPress={() => formikProps.handleSubmit()}
                  gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.loginTextContainer}>
          <View>
            <Text style={styles.accountText}>Already have an account?</Text>
            <Link
              screen="RegisterType"
              params={{}}
              style={[styles.loginLinkText, { color: '#B53133' }]}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </View>
      {loading && <BackDrop />}
    </LinearGradient>
     </ScrollView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  topImage: {
    position: 'absolute',
    height: 150,
    width: 150,
    resizeMode: 'contain',
    top: '4%',
    right: '2%',
  },
  registerHeaderImage: {
    height: 100,
    width: 150,
    borderRadius: 50,
    // elevation: 3,
    marginTop: '35%',
    marginBottom: 40,
  },
  registerHeaderImage2Container: {
    position: 'absolute',
    left: '43%',
    top: -20,
  },
  registerHeaderImage2: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  registerText: {
    fontSize: 18,
    width: '60%',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 600,
  },
  registerTextContainer: {
    // marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 6,
    width: 300,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitBtnContainer: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  btnContainer: {
    marginTop: 100,
    paddingHorizontal: 40,
  },
  joinOrganizationTextContainer: {
    marginTop: 20,
  },
  loginTextContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  accountText: {
    textAlign: 'center',
  },
  loginLinkText: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 5,
  },
  forgotPasswordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  registerLinkText: {
    marginLeft: 5,
  },
});
