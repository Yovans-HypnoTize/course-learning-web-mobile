import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import GradientHeader from '../../components/GradientHeader';
import ReuCard from '../../components/ReuCard';
import ReuGradientButton from '../../components/ReuGradientButton';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const tickets = [
  {
    id: 1,
    courseLevel: 'N5',
    ticketId: '#10124',
    ticketTitle: 'Doubts in basic ma & ga usage - L20',
    ticketDescription:
      'Qui distinctio nesciunt aut nobis ipsam et autem voluptatem quo placeat beatae aut mollitia vero sed ..',
    date: '09 Jul 2025',
    time: '14:09',
    status: 'progress',
  },
  {
    id: 2,
    courseLevel: 'N3',
    ticketId: '#10125',
    ticketTitle: 'Doubts in basic ma & ga usage - L20',
    ticketDescription:
      'Qui distinctio nesciunt aut nobis ipsam et autem voluptatem quo placeat beatae aut mollitia vero sed ..',
    date: '09 Jul 2025',
    time: '14:09',
    status: 'progress',
  },
  {
    id: 3,
    courseLevel: 'N4',
    ticketId: '#10266',
    ticketTitle: 'Doubts in basic ma & ga usage - L20',
    ticketDescription:
      'Qui distinctio nesciunt aut nobis ipsam et autem voluptatem quo placeat beatae aut mollitia vero sed ..',
    date: '09 Jul 2025',
    time: '14:09',
    status: 'completed',
  },
];

const TicketScreen = () => {
  const navigation = useNavigation<any>();
  const [showAll, setShowAll] = useState(true);
  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="Tickets" returnPath="Home" />
      <ScrollView style={styles.container}>
        <View>
          <View style={[styles.mv20, styles.ph20]}>
            <ReuGradientButton
              label="Create Ticket"
              onPress={() => {
                navigation.navigate('TicketForm');
              }}
              gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
            />
          </View>

          <View
            style={[
              globalStyles.flex,
              globalStyles.flexRow,
              styles.bgWhiteGray,
              globalStyles.p10,
              globalStyles.ml10,
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setShowAll(!showAll);
              }}
            >
              <FontAwesome5
                name={!showAll ? 'caret-right' : 'caret-down'}
                size={20}
                color={'#000000'}
              />
            </TouchableOpacity>
            <Text style={[styles.ml15]}>All</Text>
          </View>

          <View style={[styles.mb45, styles.ph20]}>
            {showAll &&
              tickets.map((ticket, index) => (
                <ReuCard key={`ticket_${index}`}>
                  <TouchableOpacity
                    style={[styles.p20]}
                    onPress={() => {
                      navigation.navigate('SpecificTicket');
                    }}
                  >
                    <View
                      style={[
                        styles.flex,
                        styles.flexRow,
                        styles.justifyBetween,
                      ]}
                    >
                      <View style={[styles.flex, styles.flexRow]}>
                        <View
                          style={[
                            styles.h50,
                            styles.w50,
                            styles.bgPink,
                            styles.justifyCenter,
                            styles.itemsCenter,
                            styles.r10,
                          ]}
                        >
                          <Text
                            style={[styles.fs18, styles.fw700, styles.textRed]}
                          >
                            {ticket.courseLevel}
                          </Text>
                        </View>
                        <View style={[styles.ml15]}>
                          <Text style={[styles.fw700]}>{ticket.ticketId}</Text>
                          <View style={[styles.flex, styles.flexRow]}>
                            <Text style={[styles.textGray]}>
                              {ticket.date}{' '}
                            </Text>
                            <Text>{ticket.time}</Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.flex,
                          styles.flexRow,
                          styles.justifyCenter,
                          styles.itemsCenter,
                          ticket.status === 'completed'
                            ? styles.bgLightBlue
                            : styles.bgPink,
                          styles.r5,
                          styles.w90,
                          styles.h30,
                        ]}
                      >
                        <Text
                          style={[
                            styles.fw600,
                            ticket.status === 'completed'
                              ? styles.textBlue
                              : styles.textRed,
                          ]}
                        >
                          {ticket.status === 'completed'
                            ? 'Completed'
                            : 'In Progress'}
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.mt10]}>
                      <Text style={[styles.fs18, styles.mt10]}>
                        {ticket.ticketTitle}
                      </Text>
                      <Text style={[styles.textGray, styles.mt10]}>
                        {ticket.ticketDescription}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ReuCard>
              ))}

            {tickets.length < 1 && (
              <View
                style={[
                  styles.flex,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.mt20,
                ]}
              >
                <Text style={styles.mt20}>No tickets availble</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TicketScreen;

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
  mb45: { marginBottom: 45 },
  mt5: { marginTop: 5 },
  mt10: {
    marginTop: 10,
  },
  mt20: { marginTop: 20 },
  mv10: {
    marginVertical: 10,
  },
  mv20: {
    marginVertical: 20,
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
  bgWhiteGray: { backgroundColor: '#F5F5F5' },
  bgRed: {
    backgroundColor: '#B53133',
  },
  bgPink: { backgroundColor: '#f0d6d6' },
  bgLightBlue: { backgroundColor: '#ccd5e0' },
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
  h30: { height: 30 },
  h50: { height: 50 },
  w50: { width: 50 },
  h80: { height: 80 },
  w80: { width: 80 },
  w90: { width: 90 },
  w100: { width: 100 },
});
