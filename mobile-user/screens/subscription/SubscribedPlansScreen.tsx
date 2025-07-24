import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GradientHeader from '../../components/GradientHeader';
import ReuCard from '../../components/ReuCard';
import { useNavigation } from '@react-navigation/native';

const plans = [
  {
    id: 1,
    courseLevel: 'N5',
    planType: 'Monthly',
    price: 1000,
    expirationDate: '17/07/2025',
    expired: false,
    expirationDays: 28,
  },
  {
    id: 2,
    courseLevel: 'N4',
    planType: '3 Months',
    price: 4000,
    expirationDate: '07/07/2025',
    expired: true,
    expirationDays: 0,
  },
  {
    id: 3,
    courseLevel: 'N3',
    planType: '3 Months',
    price: 7000,
    expirationDate: '05/07/2025',
    expired: true,
    expirationDays: 2,
  },
];

const mockRenewPlan = {
  course: {
    courseLevel: 'N1',
    id: 1,
    title: 'Advance',
  },
  plan: {
    id: 1,
    planDescription: 'basic plan',
    planName: 'Basic',
    planSelection: 3,
    price: 999.99,
    status: null,
    userCounts: null,
  },
};

const SubscribedPlansScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="Your Plans" returnPath="Subscription" />
      <ScrollView style={styles.container}>
        <View style={styles.ph20}>
          {plans.map((plan, index) => (
            <ReuCard
              containerClass={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                marginBottom: 5,
              }}
              key={`your_plans_${index}`}
            >
              <Text style={[styles.fw700, styles.textRed, styles.fs18]}>
                {plan.courseLevel}
              </Text>
              <View
                style={[
                  styles.flex,
                  styles.flexRow,
                  styles.justifyBetween,
                  styles.itemsCenter,
                  styles.mt5,
                ]}
              >
                <Text style={[styles.fs18, styles.fw700]}>{plan.planType}</Text>
                <Text style={[styles.fs25, styles.fw700]}>₹ {plan.price}</Text>
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
                <Text>Renews on {plan.expirationDate}</Text>
                {plan.expired === false ? (
                  <Text style={[styles.textRed]}>
                    {plan.expirationDays} days left
                  </Text>
                ) : (
                  <Text style={[styles.textRed]}>
                    {plan.expirationDays === 0
                      ? 'expires today'
                      : `expired ${plan.expirationDays} days ago`}
                  </Text>
                )}
              </View>
              {plan.expired && (
                <View
                  style={[
                    styles.flex,
                    styles.flexRow,
                    styles.itemsCenter,
                    styles.justifyCenter,
                    styles.mt20,
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.flex,
                      styles.flexRow,
                      styles.itemsCenter,
                      styles.justifyCenter,
                      styles.r5,
                      styles.border2,
                      styles.borderRed,
                      styles.bgWhite,
                      styles.h40,
                      styles.w150,
                    ]}
                    onPress={() => {
                      navigation.navigate('ManagePlan');
                    }}
                  >
                    <Text style={[styles.textRed, styles.fs18, styles.fw600]}>
                      Manage
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.flex,
                      styles.flexRow,
                      styles.itemsCenter,
                      styles.justifyCenter,
                      styles.r5,
                      styles.bgRed,
                      styles.h40,
                      styles.w150,
                      styles.ml15,
                    ]}
                    onPress={() => {
                      navigation.navigate('RenewPlan', {
                        selectedPlans: [mockRenewPlan],
                      });
                    }}
                  >
                    <Text style={[styles.textWhite, styles.fs18, styles.fw600]}>
                      Renew
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ReuCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscribedPlansScreen;

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
  fs25: { fontSize: 25 },
  fw700: {
    fontWeight: 700,
  },
  fw600: { fontWeight: 600 },
  ph20: { paddingHorizontal: 20 },
  r5: {
    borderRadius: 5,
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
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  h40: { height: 40 },
  w150: { width: 150 },
});
