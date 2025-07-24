import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { resetPassword } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigation } from '@react-navigation/native';
import FormField from '../../components/FormFactory/FormField';
import BackDrop from '../../components/BackDrop';
import { toastAndroid } from '../../utils/Utils';
import ReuGradientButton from '../../components/ReuGradientButton';
import { globalStyles } from '../../styles/style';

const ResetPassword = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { token } = route.params;

  const loading = useAppSelector(state => state.auth.loading);

  const handleResetPassword = async (values: any) => {
    const data = {
      ...values,
      token: token,
    };
    try {
      const response = await dispatch(resetPassword(data)).unwrap();
      if (response.status === 200) {
        console.log('response', response);

        toastAndroid(response.data.message || 'Password reset successful');
        navigation.navigate('Login');
      } else {
        toastAndroid('An unexpected error occurred');
      }
    } catch (err: any) {
      toastAndroid(err || 'An unexpected error occurred');
    }
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          globalStyles.flex,
          globalStyles.flexCol,
          globalStyles.itemsCenter,
          globalStyles.justifyCenter,
          globalStyles.ph20,
          globalStyles.h80Percent,
        ]}
      >
        <Image
          source={require('../../assets/auth/registerScreenHeaderImg.png')}
          style={styles.resetHeaderImage}
        />

        <View style={styles.loginTextContainer}>
          <Text style={[globalStyles.fs30, globalStyles.fwBold]}>
            Reset Password
          </Text>
        </View>
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {formikProps => (
            <View>
              <View style={styles.inputContainer}>
                <FormField
                  formik={formikProps}
                  fieldProps={{
                    name: 'newPassword',
                    placeholder: 'Enter your password',
                    fieldType: 'textbox-outlined',
                    required: true,
                    type: 'password',
                  }}
                  key={'newPassword'}
                />
              </View>

              <View style={styles.inputContainer}>
                <FormField
                  formik={formikProps}
                  fieldProps={{
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    fieldType: 'textbox-outlined',
                    required: true,
                    type: 'password',
                  }}
                  key={'confirmPassword'}
                />
              </View>

              <View style={styles.submitBtnContainer}>
                <ReuGradientButton
                  label="Reset Password"
                  onPress={() => formikProps.handleSubmit()}
                  gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>

      <View
        style={[
          globalStyles.flex,
          globalStyles.flexCol,
          globalStyles.justifyEnd,
          globalStyles.h20Percent,
          globalStyles.pb60,
        ]}
      >
        <View style={styles.cancelTextContainer}>
          <Text>Already have an account?</Text>
          <Link screen="Login" params={{}} style={styles.cancelLinkText}>
            Sign In
          </Link>
        </View>
      </View>

      {loading && <BackDrop />}
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  resetHeaderImage: {
    height: 100,
    width: 150,
    marginBottom: 20,
  },
  loginTextContainer: {
    marginTop: 20,
    marginBottom: 35,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
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
  submitBtnStyles: {
    width: 300,
  },
  cancelTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cancelLinkText: {
    marginTop: 5,
    color: '#B53133',
    fontWeight: 700,
  },
});
