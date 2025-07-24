// import {
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { getUser } from './accountSlice';
// import { removeStoredItemInCookie, toastAndroid } from '../../utils/Utils';
// import { handleSignOut, logoutUser } from '../auth/authSlice';
// import { Toast } from 'toastify-react-native';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import UploadActionModal from './UploadActionModal';

// const AccountScreen = () => {
//   const dispatch = useAppDispatch();
//   const userDetails = useAppSelector(state => state.account.userDetails);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [profileImage, setProfileImage] = useState<any>(null);

//   const handleLogout = async () => {
//     try {
//       const response = await dispatch(logoutUser()).unwrap();
//       if (response.status === 200) {
//         await removeStoredItemInCookie('access_token');
//         await removeStoredItemInCookie('refresh_token');
//         dispatch(handleSignOut());
//         toastAndroid('Logout successful')
//         // Toast.success('Logout successful');
//       } else {
//         toastAndroid('An unexpected error occurred')
//         // Toast.error('An unexpected error occurred');
//       }
//     } catch (err: any) {
//       toastAndroid(err || 'An unexpected error occurred')
//       // Toast.error(err || 'An unexpected error occurred');
//     }
//   };

//   const handleModalVisibility = () => {
//     setModalVisible(!modalVisible);
//   };

//   const handleSetProfileImage = (img: any) => {
//     setProfileImage(img);
//   };

//   useEffect(() => {
//     dispatch(getUser());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log('user details', userDetails);
//   }, [userDetails]);

//   useEffect(() => {
//     console.log('account screen profile image = ', profileImage);
//   }, [profileImage]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerTextContiner}>
//         <Text style={styles.headerText}>My Profile</Text>
//       </View>

//       <View style={styles.profileContainer}>
//         <Image
//           source={
//             profileImage !== null
//               ? { uri: profileImage }
//               : require('../../assets/fakeUserImage.jpg')
//           }
//           style={styles.userImage}
//         />

//         <View style={styles.userDetailContainer}>
//           <Text style={styles.userNameText}>
//             {(userDetails?.data?.data?.firstname &&
//               userDetails.data.data.firstname.charAt(0).toUpperCase() +
//                 userDetails.data.data.firstname.slice(1).toLowerCase()) ||
//               'N/A'}
//           </Text>
//           <Text style={styles.subText}>
//             Email: {userDetails?.data?.data?.email || 'N/A'}
//           </Text>
//           <Text style={styles.subText}>
//             Mobile: {userDetails?.data?.data?.phoneNo || 'N/A'}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.submenuContainer}>
//         <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
//           <SimpleLineIcons name={'logout'} size={25} color={'red'} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>

//       <UploadActionModal
//         modalVisible={modalVisible}
//         handleModalVisibility={handleModalVisibility}
//         handleSetProfileImage={handleSetProfileImage}
//       />
//     </SafeAreaView>
//   );
// };

// export default AccountScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: 'rgba(255,255,255,0.5)',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   headerTextContiner: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//   },
//   headerText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
//   profileContainer: {
//     position: 'relative',
//     backgroundColor: '#F9F6EE',
//     padding: 15,
//     borderRadius: 7,
//     marginVertical: 10,
//   },
//   userImage: {
//     height: 60,
//     width: 60,
//     borderRadius: 30,
//   },
//   userEditImage: {
//     position: 'absolute',
//     top: 43,
//     left: 45,
//     height: 30,
//     width: 30,
//     borderRadius: 50,
//     backgroundColor: '#ffffff',
//   },
//   editIcon: {
//     padding: 4,
//   },
//   userDetailContainer: {
//     marginVertical: 10,
//   },
//   userNameText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
//   subText: {
//     fontSize: 15,
//   },
//   submenuContainer: {
//     marginTop: 50,
//     marginLeft: 15,
//   },
//   logoutContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoutText: {
//     fontSize: 20,
//     color: 'red',
//     marginLeft: 15,
//   },
// });

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientHeader from '../../components/GradientHeader';
import ReuCard from '../../components/ReuCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handleSignOut, logoutUser } from '../auth/authSlice';
import { removeStoredItemInCookie, toastAndroid } from '../../utils/Utils';
import { getUser } from './accountSlice';
import { Formik } from 'formik';
import FormField from '../../components/FormFactory/FormField';
import ReuGradientButton from '../../components/ReuGradientButton';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup'

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

const AccountScreen = () => {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(state => state.account.userDetails);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>(null);

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser()).unwrap();
      if (response.status === 200) {
        await removeStoredItemInCookie('access_token');
        await removeStoredItemInCookie('refresh_token');
        dispatch(handleSignOut());
        toastAndroid('Logout successful');
        // Toast.success('Logout successful');
      } else {
        toastAndroid('An unexpected error occurred');
        // Toast.error('An unexpected error occurred');
      }
    } catch (err: any) {
      toastAndroid(err || 'An unexpected error occurred');
      // Toast.error(err || 'An unexpected error occurred');
    }
  };

  const handleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const handleSetProfileImage = (img: any) => {
    setProfileImage(img);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('user details', userDetails);
  }, [userDetails]);

  useEffect(() => {
    console.log('account screen profile image = ', profileImage);
  }, [profileImage]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.containerWrapper}>
          <GradientHeader title="My Profile" returnPath="SubscribedPlans" />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={[styles.bgBlue, { height: 125, position: 'relative' }]}
            >
              <Image
                source={
                  profileImage !== null
                    ? { uri: profileImage }
                    : require('../../assets/fakeUserImage.jpg')
                }
                style={{
                  height: 125,
                  width: 125,
                  position: 'absolute',
                  bottom: '-45%',
                  right: '35%',
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={[
                styles.flex,
                styles.flexColumn,
                styles.itemsCenter,
                { marginTop: 90 },
              ]}
            >
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phoneNo: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={() => {}}
              >
                {formikProps => (
                  <View>
                    <View style={styles.inputContainer}>
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

                    <View style={[styles.flex, styles.flexRow, styles.mv7, styles.itemsCenter]}>
                      <View style={{ width: 240 }}>
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
                      <TouchableOpacity
                        style={[
                          styles.flex,
                          styles.flexRow,
                          styles.justifyCenter,
                          styles.itemsCenter,
                          styles.bgRed,
                          styles.r10,
                          styles.ml15,
                          { width: 60, height:50 },
                        ]}
                      >
                        <AntDesignIcons
                          name="edit"
                          size={30}
                          color={'#ffffff'}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.mt60]}>
                      <ReuGradientButton
                        label="Logout"
                        onPress={handleLogout}
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
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  containerWrapper: { flex: 1, backgroundColor: 'rgba(255,255,255,0.5)' },
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  textBlue: {
    color: '#192F54',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textGeneral: {
    color: '#1F2937',
    fontWeight: 500,
    fontSize: 16,
  },
  textGray: {
    color: '#9B9B9B',
  },
  textRed: { color: '#B53133' },
  textWhite: { color: '#ffffff' },
  smallFont: { fontSize: 12 },
  divider: {
    width: '95%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
  ml5: {
    marginLeft: 5,
  },
  ml15: {
    marginLeft: 15,
  },
  mb5: { marginBottom: 5 },
  mb25: { marginBottom: 25 },
  mt5: { marginTop: 5 },
  mt10: {
    marginTop: 10,
  },
  mt20: { marginTop: 20 },
  mt60: { marginTop: 60 },
  mv7: {
    marginVertical: 7,
  },
  mv10: {
    marginVertical: 10,
  },
  p20: {
    padding: 20,
  },
  fs18: { fontSize: 18 },
  fs16: {
    fontSize: 16,
  },
  fs22: { fontSize: 22 },
  fs25: { fontSize: 25 },
  fw700: {
    fontWeight: 700,
  },
  fw600: { fontWeight: 600 },
  ph20: { paddingHorizontal: 20 },
  r5: {
    borderRadius: 5,
  },
  r10: {
    borderRadius: 10,
  },
  border2: { borderWidth: 2 },
  borderRed: { borderColor: '#B53133' },
  bgWhite: { backgroundColor: '#ffffff' },
  bgBlue: { backgroundColor: '#192F54' },
  bgRed: {
    backgroundColor: '#B53133',
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
  },
  flex: { display: 'flex' },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  itemsCenter: { alignItems: 'center' },
  itemsEnd: { alignItems: 'flex-end' },
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  h50: { height: 50 },
  w50: { width: 50 },
  h80: { height: 80 },
  w80: { width: 80 },
  w100: { width: 100 },
  w200: { width: 200 },
  inputContainer: {
    marginVertical: 7,
    width: 320,
  },
});
