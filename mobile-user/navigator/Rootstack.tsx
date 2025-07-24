import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getDataFromCookie, storeDataInCookie } from '../utils/Utils';
import {
  handleAuthTokenLoading,
  handleSignIn,
} from '../screens/auth/authSlice';
import RootDrawer from './RootDrawer';
import RegisterScreen from '../screens/auth/RegisterScreen2';
import ForgotPwdScreen from '../screens/auth/ForgotPwdScreen';
import ResetPassword from '../screens/auth/ResetPassword';
import OtpVerifyScreen from '../screens/auth/OtpVerifyScreen';
import OnboardingScreen from '../screens/Intro/OnboardingScreen';
import RegisterTypeScreen from '../screens/auth/RegisterTypeScreen';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(state => state.auth.isSignedIn);
  const isAuthTokenLoading = useAppSelector(
    state => state.auth.isAuthTokenLoading,
  );
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<any>(null);

  const checkIsAppFirstLaunch = async () => {
    const appData = await getDataFromCookie('isAppFirstLaunched');
    console.log(appData);

    if (appData == null) {
      setIsAppFirstLaunched(true);
      storeDataInCookie('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
  };

  useEffect(() => {
    checkIsAppFirstLaunch();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getDataFromCookie('access_token');
        if (token && token.trim() !== '') {
          dispatch(handleSignIn());
        }
      } catch (error) {
        console.error('Error checking token from storage:', error);
      } finally {
        dispatch(handleAuthTokenLoading());
      }
    };

    checkToken();
  }, []);

  if (isAuthTokenLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={'blue'} size={55} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Group>
          <Stack.Screen name="AppDrawer" component={RootDrawer} options={{}}/>
        </Stack.Group>
      ) : (
        <Stack.Group>
          {isAppFirstLaunched && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
            {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="RegisterType" component={RegisterTypeScreen} />
          <Stack.Screen name="Forgot-Password" component={ForgotPwdScreen} />
          <Stack.Screen name="Otp-Verify" component={OtpVerifyScreen} />
          <Stack.Screen name="Reset-Password" component={ResetPassword} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
