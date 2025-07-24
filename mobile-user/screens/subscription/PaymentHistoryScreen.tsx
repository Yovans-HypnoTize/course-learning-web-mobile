import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import GradientHeader from '../../components/GradientHeader';
import ReuCard from '../../components/ReuCard';
import { Picker } from '@react-native-picker/picker';

interface MockData {
  id: number;
  courseLevel: string;
  planType: string;
  date: string;
  time: string;
  amount: string;
  status: 'completed' | 'failed';
}

const mockData: MockData[] = [
  {
    id: 1,
    courseLevel: 'N5',
    planType: 'Monthly',
    date: '09 Jul 2025',
    time: '14:08',
    amount: '1000',
    status: 'completed',
  },
  {
    id: 2,
    courseLevel: 'N4',
    planType: 'Monthly',
    date: '09 Jul 2025',
    time: '14:08',
    amount: '1000',
    status: 'completed',
  },
  {
    id: 3,
    courseLevel: 'N2',
    planType: 'Monthly',
    date: '09 Jul 2025',
    time: '14:08',
    amount: '1000',
    status: 'failed',
  },
  {
    id: 4,
    courseLevel: 'N1',
    planType: 'Monthly',
    date: '09 Jul 2025',
    time: '14:08',
    amount: '1000',
    status: 'completed',
  },
];

const PaymentHistoryScreen = () => {
  const [selectedFilterValue, setSelectedFilterValue] = useState();
  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="Payment History" returnPath="Subscription" />
      <ScrollView style={styles.container}>
        <View style={styles.ph20}>
          <ReuCard>
            <View style={{ backgroundColor: '#F5F5F5' }}>
              <Picker
                selectedValue={selectedFilterValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedFilterValue(itemValue)
                }
              >
                <Picker.Item label="Last 3 months" value="3" />
                <Picker.Item label="Last 6 months" value="6" />
              </Picker>
            </View>
            {mockData.map((item: MockData, index: number) => (
              <View
                key={index}
                style={[styles.rowHorizontallySpaceBetween, styles.p20]}
              >
                <View style={[styles.rowVerticallyCentered]}>
                  <View
                    style={[
                      item.status === 'failed' ? styles.bgRed : styles.bgBlue,
                      styles.cardAvatar,
                      styles.flexRowCentered,
                    ]}
                  >
                    <Text
                      style={[
                        item.status === 'failed'
                          ? styles.textRed
                          : styles.textBlue,
                        styles.title,
                      ]}
                    >
                      {item.courseLevel}
                    </Text>
                  </View>
                  <View style={[styles.ml15]}>
                    <Text style={[styles.title]}>{item.planType}</Text>
                    <Text style={styles.textGray}>
                      {item.date}
                      {item.time}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.title, styles.textRight]}>
                    ₹ {item.amount}
                  </Text>
                  <View
                    style={[
                      item.status === 'failed' ? styles.bgRed : styles.bgBlue,
                      styles.badge,
                      styles.flexRowCentered,
                      styles.mt5,
                    ]}
                  >
                    <Text
                      style={[
                        item.status === 'failed'
                          ? styles.textRed
                          : styles.textBlue,
                        styles.smallFont,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ReuCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentHistoryScreen;

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
  mv10: {
    marginVertical: 10,
  },
  p20: {
    padding: 20,
  },
  fw700: {
    fontWeight: 700,
  },
  fw600: { fontWeight: 600 },
  ph20: { paddingHorizontal: 20 },
  bgBlue: {
    backgroundColor: '#ccd5e0',
  },
  bgRed: {
    backgroundColor: '#ffdad6',
  },
  flexRowCentered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowVerticallyCentered: { flexDirection: 'row', alignItems: 'center' },
  rowHorizontallySpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 600,
    fontSize: 18,
  },
  badge: { width: 85, height: 25, borderRadius: 50 },
  textRight: {
    textAlign: 'right',
  },
  cardAvatar: { height: 50, width: 50, borderRadius: 10 },
});
