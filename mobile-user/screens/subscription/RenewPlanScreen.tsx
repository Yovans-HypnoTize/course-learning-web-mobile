import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ReuCard from '../../components/ReuCard';
import ReuGradientButton from '../../components/ReuGradientButton';
import GradientHeader from '../../components/GradientHeader';
import { useAppDispatch } from '../../redux/hooks';
import { subscribePlans } from './subscriptionSlice';
import { toastAndroid } from '../../utils/Utils';
import { useNavigation } from '@react-navigation/native';

const Card = ({ currentData }: any) => {
  return (
    <ReuCard containerClass={{ paddingHorizontal: 20, paddingVertical: 20 }}>
      <View style={styles.cardPlanDetailWrapper}>
        <View style={[styles.cardAvatar, styles.flexRowCentered]}>
          <Text style={[styles.textRed, styles.cardTextBold]}>
            {currentData.course.courseLevel}
          </Text>
        </View>
        <View style={styles.cardCourseDetailContainer}>
          <Text style={[styles.textRed, styles.cardTextBold]}>
            {currentData.plan.planName}
          </Text>
          <View style={styles.flexRow}>
            <Text>200 Lessons</Text>
            <Text style={styles.ml5}>(80 hrs)</Text>
          </View>
        </View>
      </View>

      <View style={styles.rowHorizontallyCentered}>
        <View style={styles.divider} />
      </View>

      <View style={styles.cardPlanDetailsContainer}>
        <View>
          <Text style={styles.fw700}>
            {currentData.plan.planType} ({currentData.course.courseLevel})
          </Text>
          <Text style={[styles.mt5, styles.textGray]}>
            {currentData.plan.planDescription}
          </Text>
        </View>
        <View>
          <Text style={styles.cardAmountText}>₹ {currentData.plan.price}</Text>
        </View>
      </View>
    </ReuCard>
  );
};

const RenewPlanScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { selectedPlans } = route.params;
  const dispatch = useAppDispatch();

  const totalAmount = selectedPlans
    .reduce((acc: number, item: any) => {
      return acc + Number(item.plan.price);
    }, 0)
    .toFixed(2);

  const handlePayment = async () => {
    const formattedPlans = selectedPlans.map((item: any) => ({
      courseId: item.course.id,
      planId: item.plan.id,
    }));

    const data = {
      selectedPlans: formattedPlans,
      paymentStatus: true,
    };
    console.log('selected plan from handle payment', data);
    try {
      const response = await dispatch(subscribePlans(data)).unwrap();
      if (response.data.status === 201) {
        navigation.navigate('Subscription');
        toastAndroid(response.data.message || 'Subscription Successfull');
        console.log('subscription response', response);
      } else {
        toastAndroid('Unexpected error occurred');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="Renew Plan" returnPath="SubscribedPlans" />
      <ScrollView style={styles.container}>
        <View style={styles.ph20}>
          <Text style={[styles.mt10, styles.title]}>
            Selected Plan{selectedPlans.length > 1 && 's'}
          </Text>

          {selectedPlans.length > 0 &&
            selectedPlans.map((item: any, index: number) => {
              return <Card key={index} currentData={item} />;
            })}

          <ReuCard
            containerClass={{ paddingHorizontal: 15, paddingVertical: 15 }}
          >
            <Text
              style={[
                styles.textBlue,
                styles.textBold,
                styles.fw600,
                styles.mv10,
              ]}
            >
              Order Summary:
            </Text>
            {selectedPlans.map((currentItem: any, index: number) => {
              return (
                <View key={index}>
                  <View style={styles.rowHorizontallySpaceBetween}>
                    <Text style={[styles.textBlue, styles.fw600]}>
                      Selected Plan: {index + 1}
                    </Text>
                    <Text style={[styles.textBlue, styles.fw600]}>
                      Monthly ({currentItem.course.courseLevel})
                    </Text>
                  </View>
                  <View
                    style={[styles.rowHorizontallySpaceBetween, styles.mt10]}
                  >
                    <View>
                      <Text style={[styles.textBlue, styles.fw600]}>
                        Amount
                      </Text>
                      <Text style={[styles.mt5, styles.textGray]}>
                        Renews date 02/02/2025
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.textBlue, styles.title]}>
                        ₹ {currentItem.plan.price}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rowHorizontallyCentered}>
                    <View style={styles.divider} />
                  </View>
                </View>
              );
            })}

            <View style={[styles.rowHorizontallySpaceBetween]}>
              <Text style={[styles.title, styles.textRed]}>Total Amount</Text>
              <Text style={[styles.title, styles.textRed]}>
                ₹ {totalAmount}
              </Text>
            </View>
          </ReuCard>
        </View>

        <>
          <View style={styles.payBtnContainer}>
            <ReuGradientButton
              label="Pay Now"
              onPress={handlePayment}
              gradientColors={['#B53133', '#B53133']}
            />
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default RenewPlanScreen;

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
    // fontSize: 16,
  },
  textRed: { color: '#B53133' },
  divider: {
    width: '95%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
  ml5: {
    marginLeft: 5,
  },
  mt5: { marginTop: 5 },
  mt10: {
    marginTop: 10,
  },
  mv10: {
    marginVertical: 10,
  },
  fw700: {
    fontWeight: 700,
  },
  fw600: { fontWeight: 600 },
  ph20: { paddingHorizontal: 20 },

  payBtnContainer: { marginHorizontal: 20, marginTop: 40, marginBottom: 50 },
  flexRowCentered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowHorizontallyCentered: { flexDirection: 'row', justifyContent: 'center' },
  rowHorizontallySpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardTextBold: {
    fontWeight: 700,
    fontSize: 16,
  },
  cardPlanDetailWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardAvatar: {
    backgroundColor: '#f0d6d6',
    padding: 5,
    borderRadius: 5,
    height: 55,
    width: 55,
  },
  cardCourseDetailContainer: {
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardPlanDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardAmountText: {
    fontWeight: 800,
    fontSize: 18,
  },
  flexRow: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
  },
});
