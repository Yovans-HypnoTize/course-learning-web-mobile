import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { registerUser } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Toast } from 'toastify-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormField from '../../components/FormFactory/FormField';
import BackDrop from '../../components/BackDrop';
import ReuGradientButton from '../../components/ReuGradientButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { toastAndroid } from '../../utils/Utils';

type CourseLevelItems = {
  id: string;
  title: string;
  description: string;
};

type PlanItems = {
  id: string;
  title: string;
  description: string;
  amount: string;
  timePeriod: string;
};

const courseLevelItems: CourseLevelItems[] = [
  {
    id: 'n5',
    title: 'N5',
    description: 'Beginner',
  },
  {
    id: 'n4',
    title: 'N4',
    description: 'Elementary',
  },
  {
    id: 'n3',
    title: 'N3',
    description: 'Intermediate',
  },
  {
    id: 'n2',
    title: 'N2',
    description: 'Upper Intermediate',
  },
  {
    id: 'n1',
    title: 'N1',
    description: 'Advanced',
  },
  {
    id: 'all',
    title: 'All',
    description: 'Complete',
  },
];

const planItems: PlanItems[] = [
  {
    id: 'basic',
    title: 'Basic Plan',
    description: 'Essential features',
    amount: '₹999',
    timePeriod: '/month',
  },
  {
    id: 'premium',
    title: 'Premium Plan',
    description: 'Most popular choice',
    amount: '₹1,999',
    timePeriod: '/month',
  },
  {
    id: 'pro',
    title: 'Pro Plan',
    description: 'All features included',
    amount: '₹2,999',
    timePeriod: '/month',
  },
];

const Card = ({
  icon,
  title,
  bgColors,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  bgColors: string[];
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardHeaderContainer}>
        <LinearGradient
          colors={bgColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardHeaderIconContainer}
        >
          {icon}
        </LinearGradient>
        <Text style={styles.cardHeaderTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const ActiveLevelIndicator = ({
  bgColors,
  label,
  innerValue,
  completed = false,
}: {
  bgColors: string[];
  label: string;
  innerValue?: string;
  completed: boolean;
}) => {
  return (
    <View>
      <LinearGradient
        colors={bgColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.activeLevelIndicator}
      >
        {completed && (
          <Ionicons name={'checkmark-sharp'} size={27} color={'#fff'} />
        )}
        {!completed && (
          <Text style={styles.activeLevelIndicatorInnerText}>{innerValue}</Text>
        )}
      </LinearGradient>
      <Text style={styles.activeLevelIndicatorLabel}>{label}</Text>
    </View>
  );
};

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  const handleRegister = async (values: any, { resetForm }: any) => {
    try {
      const response = await dispatch(registerUser(values)).unwrap();
      if (response.status === 201) {
        resetForm();
        toastAndroid(response.data.message || 'Registration successful');
        // Toast.success(response.data.message || 'Registration successful');
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
    <View style={styles.container}>
      <View style={styles.navHeaderWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.navHeaderIcon}
        >
          <Ionicons name={'arrow-back'} size={25} color={'#fff'} />
        </TouchableOpacity>

        <Text style={styles.navHeaderText}>Register</Text>
      </View>
      <ScrollView>
        <View style={styles.activeLevelIndicatorWrapper}>
          <ActiveLevelIndicator
            bgColors={['#EC4899', '#B53133']}
            label="Selection"
            key={'1'}
            completed={true}
          />
          <View style={styles.activeLevelIndicatorStepperBorder} />
          <ActiveLevelIndicator
            bgColors={['#EC4899', '#B53133']}
            innerValue="2"
            label="Details"
            key={'2'}
            completed={false}
          />
          <View
            style={[
              styles.activeLevelIndicatorStepperBorder,
              // eslint-disable-next-line react-native/no-inline-styles
              { backgroundColor: 'gray' },
            ]}
          />
          <ActiveLevelIndicator
            bgColors={['#A9A9A9', '#A9A9A9']}
            innerValue="3"
            label="Payment"
            key={'3'}
            completed={false}
          />
        </View>

        <Card
          icon={<Ionicons name={'school'} size={25} color={'#fff'} />}
          title="Select Course Level"
          bgColors={['#EF4444', '#EC4899']}
        >
          <View style={styles.courseContentWrapper}>
            {courseLevelItems.map((course, index) => (
              <TouchableOpacity
                key={index}
                style={styles.courseContentContainer}
              >
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription}>
                  {course.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card
          icon={<FontAwesome6 name={'crown'} size={25} color={'#fff'} />}
          title="Choose Your Plan"
          bgColors={['#3B82F6', '#06B6D4']}
        >
          <View style={styles.planContentWrapper}>
            {planItems.map(plan => {
              return (
                <TouchableOpacity
                  style={styles.planContentContainer}
                  key={plan.id}
                >
                  <View>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planDescription}>
                      {plan.description}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.planTitle}>{plan.amount}</Text>
                    <Text style={styles.planDescription}>
                      {plan.timePeriod}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <Card
          icon={<Ionicons name={'person'} size={25} color={'#fff'} />}
          title="Personal Information"
          bgColors={['#22C55E', '#10B981']}
        >
          <Formik
            initialValues={{ name: '', email: '', phoneNo: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {formikProps => (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Name</Text>
                  <FormField
                    formik={formikProps}
                    fieldProps={{
                      name: 'name',
                      placeholder: 'Enter your name',
                      fieldType: 'textbox-outlined',
                      required: true,
                    }}
                    key={'name'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Email</Text>
                  <FormField
                    formik={formikProps}
                    fieldProps={{
                      name: 'email',
                      placeholder: 'Enter your email',
                      fieldType: 'textbox-outlined',
                      required: true,
                      type: 'email',
                    }}
                    key={'email'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Phone Number</Text>
                  <FormField
                    formik={formikProps}
                    fieldProps={{
                      name: 'phoneNo',
                      placeholder: 'Enter your phoneNo',
                      fieldType: 'textbox-outlined',
                      required: true,
                      type: 'number',
                    }}
                    key={'phoneNo'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Password</Text>
                  <FormField
                    formik={formikProps}
                    fieldProps={{
                      name: 'password',
                      placeholder: 'Enter your password',
                      fieldType: 'textbox-outlined',
                      required: true,
                      type: 'password',
                    }}
                    key={'password'}
                  />
                </View>

                {/* <View style={styles.submitBtnContainer}>
                <ReuGradientButton
                  label="Submit"
                  onPress={() => formikProps.handleSubmit()}
                  gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
                />
              </View> */}
              </View>
            )}
          </Formik>
        </Card>

        <Card
          icon={<Ionicons name={'person'} size={25} color={'#fff'} />}
          title="Order Summary"
          bgColors={['#A855F7', '#6366F1']}
        >
          <View style={styles.orderSummaryContentWrapper}>
            <View style={styles.orderSummaryCourseContainer}>
              <Text style={styles.orderSummaryContentTitle}>
                Selected Course:
              </Text>
              <Text style={styles.orderSummarySelectedItem}>-</Text>
            </View>
            <View style={styles.orderSummaryPlanContainer}>
              <Text style={styles.orderSummaryContentTitle}>Plan:</Text>
              <Text style={styles.orderSummarySelectedItem}>-</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.orderSummaryTotalContainer}>
              <Text style={styles.orderSummaryTotalTitle}>Total Amount:</Text>
              <Text style={styles.orderSummaryTotalValue}>₹0</Text>
            </View>
          </View>
        </Card>

        <View style={styles.payBtnContainer}>
          <ReuGradientButton
            label="Pay"
            onPress={() => {}}
            gradientColors={['#79A7DF', '#4672B6', '#4672B6', '#4672B6']}
          />
        </View>
      </ScrollView>

      {loading && <BackDrop />}
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    position: 'relative',
    backgroundColor: '#E5E7EB',
  },
  navHeaderWrapper: {
    backgroundColor: '#B53133',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navHeaderIcon: {
    marginLeft: 10,
    marginRight: 15,
  },
  navHeaderText: { color: '#fff', fontSize: 20 },

  courseContentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  courseContentContainer: {
    width: '30%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  courseTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
  courseDescription: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
  },

  planContentWrapper: {
    paddingHorizontal: 25,
    marginTop: 10,
    width: '100%',
  },
  planContentContainer: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTitle: { fontWeight: 'bold', fontSize: 18 },
  planDescription: {
    color: '#6B7280',
    fontSize: 15,
  },
  inputTitle: {
    fontSize: 15,
  },
  orderSummaryContentWrapper: {
    paddingHorizontal: 25,
    marginTop: 10,
    width: '100%',
  },
  orderSummaryCourseContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  orderSummaryPlanContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  orderSummaryTotalContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderSummaryContentTitle: { fontSize: 15, color: '#4B5563' },
  orderSummarySelectedItem: { fontSize: 15 },
  orderSummaryTotalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderSummaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667EEA',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 15,
  },
  cardWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
    elevation: 5,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 15,
  },
  cardHeaderContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderIconContainer: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 15,
  },
  cardHeaderTitle: { fontWeight: 'bold', fontSize: 20 },
  payBtnContainer: { marginHorizontal: 25, marginVertical: 20 },
  inputContainer: {
    marginVertical: 6,
    width: 310,
  },
  submitBtnContainer: {
    marginTop: 20,
    paddingHorizontal: 60,
  },
  activeLevelIndicatorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  activeLevelIndicator: {
    marginHorizontal: 10,
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLevelIndicatorInnerText: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activeLevelIndicatorLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  activeLevelIndicatorStepperBorder: {
    height: 5,
    width: 50,
    backgroundColor: '#B53133',
    marginHorizontal: 2,
    borderRadius: 2,
    marginTop: -25,
  },
});
