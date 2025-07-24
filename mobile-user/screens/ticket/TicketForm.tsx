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
import { Formik } from 'formik';
import FormField from '../../components/FormFactory/FormField';
import ReuGradientButton from '../../components/ReuGradientButton';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';

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

const TicketForm = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.containerWrapper}>
          <GradientHeader title="Create Ticket" returnPath="Ticket" />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
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
                  course:null,
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
                          name: 'course',
                          placeholder: 'Select',
                          fieldType: 'select-outlined',
                          required: true,
                        }}
                        key={'course'}
                      />
                    </View>

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

                    <View style={[styles.mt60]}>
                      <ReuGradientButton
                        label="Create Ticket"
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
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default TicketForm;

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
