import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import GradientHeader from '../../components/GradientHeader';
import ReuCard from '../../components/ReuCard';

const course = {
  id: 1,
  courseLevel: 'N5',
  title: 'Elementary',
  lessons: 200,
  duration: 80,
};

const plans = [
  {
    id: 1,
    courseLevel: 'N5',
    planType: 'Monthly',
    price: 1000,
    description: 'Renews on 17/07/2025',
    expired: false,
    expirationDays: 28,
    active: true,
  },
  {
    id: 2,
    courseLevel: 'N4',
    planType: '3 Months',
    price: 4000,
    description: 'Renews on 07/07/2025',
    expired: true,
    expirationDays: 0,
    active: false,
  },
  {
    id: 3,
    courseLevel: 'N3',
    planType: '3 Months',
    price: 7000,
    description: 'Renews on 05/07/2025',
    expired: true,
    expirationDays: 2,
    active: false,
  },
];

const ManagePlanScreen = () => {
  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="Manage Plan" returnPath="SubscribedPlans" />
      <ScrollView style={styles.container}>
        <View style={[styles.ph20, styles.mb25]}>
          <View>
            <Text style={[styles.fs25, styles.fw700, styles.textBlue]}>
              Selected Course
            </Text>
            <ReuCard>
              <View
                style={[
                  styles.bgRed,
                  styles.r10,
                  styles.flex,
                  styles.flexRow,
                  styles.p20,
                ]}
              >
                <View
                  style={[
                    styles.flex,
                    styles.flexRow,
                    styles.justifyCenter,
                    styles.itemsCenter,
                    styles.bgWhite,
                    styles.r10,
                    styles.h80,
                    styles.w80,
                  ]}
                >
                  <Text style={[styles.fs25, styles.fw700, styles.textRed]}>
                    {course.courseLevel}
                  </Text>
                </View>
                <View
                  style={[
                    styles.flex,
                    styles.flexColumn,
                    styles.justifyCenter,
                    styles.ml15,
                  ]}
                >
                  <Text style={[styles.textWhite, styles.fs18, styles.fw700]}>
                    {course.title}
                  </Text>
                  <View style={[styles.flex, styles.flexRow, styles.mt5]}>
                    <Text style={[styles.textWhite, styles.fs16, styles.fw600]}>
                      {course.lessons} Lessons{' '}
                    </Text>
                    <Text style={[styles.textWhite, styles.fs16, styles.fw600]}>
                      ({course.duration}hrs)
                    </Text>
                  </View>
                </View>
              </View>
            </ReuCard>
          </View>

          <Text
            style={[
              styles.mt20,
              styles.mb5,
              styles.fs25,
              styles.fw700,
              styles.textBlue,
            ]}
          >
            Select Plan
          </Text>
          {plans.map((plan, index) => (
            <ReuCard
              containerClass={{
                paddingHorizontal: 25,
                paddingVertical: 30,
                marginBottom: 5,
              }}
              key={`plans_${index}`}
            >
              <View
                style={[
                  styles.flex,
                  styles.flexRow,
                  styles.justifyBetween,
                  styles.itemsCenter,
                ]}
              >
                <View style={[styles.flex, styles.flexRow, styles.itemsCenter]}>
                  <Text style={[styles.fs22, styles.fw700]}>
                    {plan.planType}
                  </Text>
                  <Text
                    style={[styles.ml5, styles.fw700, styles.fs16, styles.mt5]}
                  >
                    {' '}
                    {plan.active && '(Current Plan)'}
                  </Text>
                </View>
                <Text style={[styles.fs25, styles.fw700, styles.textBlue]}>
                  ₹ {plan.price}
                </Text>
              </View>
              <View
                style={[
                  styles.flex,
                  styles.flexRow,
                  styles.justifyBetween,
                  styles.itemsCenter,
                  styles.mt5,
                ]}
              >
                <Text>{plan.description}</Text>
              </View>
            </ReuCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManagePlanScreen;

const styles = StyleSheet.create({
  containerWrapper: { flex: 1 },
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
});
