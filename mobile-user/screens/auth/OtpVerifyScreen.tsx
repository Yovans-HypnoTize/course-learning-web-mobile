import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { otpVerify } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Toast } from 'toastify-react-native';
import * as Yup from 'yup';
import { Link, useNavigation } from '@react-navigation/native';
import BackDrop from '../../components/BackDrop';
import ReuGradientButton from '../../components/ReuGradientButton';
import { toastAndroid } from '../../utils/Utils';

const OtpVerifyScreen = ({route}:any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {email} = route.params;

  const loading = useAppSelector(state => state.auth.loading);

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs[index + 1].current?.focus();
    }

    if (!text && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');

    if (otp.includes('')) {
      toastAndroid('Please enter the complete OTP');
      return;
    }
    console.log("otp", otpCode)
    dispatch(otpVerify({ otpNo: otpCode  }))
      .unwrap()
      .then(response => {
        if (response.status === 200) {
          console.log("otp response", response.data.data)
          toastAndroid(response.data.message || 'OTP Verification successful');
          navigation.navigate("Reset-Password", {token : response.data.data})
        } else {
          toastAndroid('Verification failed');
        }
      })
      .catch(err => {
        toastAndroid(err?.message || 'An unexpected error occurred');
      });
  };

  // const handleOTP = async (values: any) => {
  //   try {
  //     const response = await dispatch(otpVerify(values)).unwrap();
  //     if (response.status === 200) {
  //       Toast.success(response.data.message || 'OTP Verification successful');
  //     } else {
  //       Toast.error('An unexpected error occurred');
  //     }
  //   } catch (err: any) {
  //     Toast.error(err || 'An unexpected error occurred');
  //   }
  // };

  // const validationSchema = Yup.object({
  //   otp: Yup.string().required('OTP is required'),
  // });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '80%',
          width: '100%',
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../assets/auth/registerScreenHeaderImg.png')}
          style={styles.otpVerifyHeaderImage}
        />
        <View style={styles.otpVerifyTextContainer}>
          <Text style={styles.otpText}>Verify Email</Text>
          <View>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 60,
                marginTop: 20,
              }}
            >
              Please enter the verification code sent to {email}
            </Text>
          </View>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputs[index]}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => handleChange(text, index)}
              value={digit}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <View style={styles.submitBtnContainer}>
          <ReuGradientButton
            label="Submit"
            onPress={handleSubmit}
            gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
          />
        </View>

        {/* <Formik
          initialValues={{ otp: '' }}
          validationSchema={validationSchema}
          onSubmit={handleOTP}
        >
          {formikProps => (
            <View>
              <View style={styles.inputContainer}>
                <FormField
                  formik={formikProps}
                  fieldProps={{
                    name: 'otp',
                    placeholder: 'Enter OTP',
                    fieldType: 'textbox-outlined',
                    required: true,
                    type: 'number',
                  }}
                  key={'otp'}
                />
              </View>

              <View style={styles.submitBtnContainer}>
                <ReuGradientButton
                  label="Submit"
                  onPress={() => formikProps.handleSubmit()}
                  gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
                />
              </View>
            </View>
          )}
        </Formik> */}
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
        <View style={[styles.cancelTextContainer, { marginBottom: 20 }]}>
          <Link
            screen="Reset-Password"
            params={{}}
            style={styles.registerLinkText}
          >
            Reset Password
          </Link>
        </View>

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

export default OtpVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
  },

  otpVerifyHeaderImage: {
    height: 100,
    width: 150,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 24,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 55,
    height: 55,
    textAlign: 'center',
    fontSize: 20,
  },
  otpVerifyTextContainer: {
    marginTop: 20,
    marginBottom: 35,
  },
  otpText: {
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
    width: '100%',
    paddingHorizontal: 20,
  },
  cancelTextContainer: {
    // marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  registerLinkText: {
    marginLeft: 5,
  },
  cancelLinkText: {
    marginTop: 5,
    color: '#B53133',
    fontWeight: 700,
  },
});
