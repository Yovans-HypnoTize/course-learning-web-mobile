import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import { Link, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { registerUser } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Toast } from 'toastify-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormField from '../../components/FormFactory/FormField';
import BackDrop from '../../components/BackDrop';
import ReuGradientButton from '../../components/ReuGradientButton';
import { toastAndroid } from '../../utils/Utils';

const RegisterScreen = () => {
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  const handleRegister = async (values: any, { resetForm }: any) => {
    try {
      const response = await dispatch(registerUser(values)).unwrap();
      if (response.status === 201) {
        resetForm();
        navigation.navigate('Login')
        toastAndroid(response.data.message || 'Registration successful')
        // Toast.success(response.data.message || 'Registration successful');
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
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    phoneNo: Yup.string()
      .matches(/^\d{10,15}$/, 'Enter a valid mobile number (10–15 digits)')
      .required('Mobile number is required'),
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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
                <Text style={styles.registerText}>Create your account</Text>
              </View>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phoneNo: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
              >
                {formikProps => (
                  <View>
                    <View style={styles.inputContainer}>
                      {/* <Text>Name</Text> */}
                      <FormField
                        formik={formikProps}
                        fieldProps={{
                          name: 'name',
                          placeholder: 'Full Name',
                          fieldType: 'textbox-outlined',
                          required: true,
                        }}
                        key={'name'}
                      />
                    </View>

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
                        key={'email'}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <FormField
                        formik={formikProps}
                        fieldProps={{
                          name: 'phoneNo',
                          placeholder: 'Mobile Number',
                          fieldType: 'textbox-outlined',
                          required: true,
                          type: 'number',
                        }}
                        key={'phoneNo'}
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
                        key={'password'}
                      />
                    </View>

                    <View style={styles.submitBtnContainer}>
                      <ReuGradientButton
                        label="Register"
                        onPress={() => formikProps.handleSubmit()}
                        gradientColors={[
                          '#D13D66',
                          '#B53133',
                          '#B53133',
                          '#B53133',
                        ]}
                      />
                    </View>
                  </View>
                )}
              </Formik>
              <View style={styles.loginTextContainer}>
                <View>
                  <Text style={styles.accountText}>
                    Already have an account?
                  </Text>
                  <Link
                    screen="Login"
                    params={{}}
                    style={[styles.loginLinkText, { color: '#B53133' }]}
                  >
                    Sign In
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

export default RegisterScreen;

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
    marginTop: '15%',
    marginBottom: 35,
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
    marginVertical: 3,
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
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
  },
  accountText: {
    textAlign: 'center',
  },
  loginLinkText: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 5,
  },
});
