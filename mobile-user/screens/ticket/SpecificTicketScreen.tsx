import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GradientHeader from '../../components/GradientHeader';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const ticket = {
  id: 1,
  courseLevel: 'N5',
  ticketId: '#10124',
  ticketTitle: 'Doubts in basic ma & ga usage - L20',
  ticketDescription:
    'Lorem ipsum dolor sit amet. Non molestias omnis 33 sint galisum et cumque ratione. Est similique quis ut repellendus voluptas eos quia dolores ad dolores dignissimos aut minima facilis ut consequuntur nihil et magni assumenda. Qui atque veritatis aut velit officiis est quam consequatur.',
  date: '09 Jul 2025',
  time: '14:09',
  status: 'progress',
};

const replyTicket = {
  id: 1,
  title: 'N5 staff',
  date: '09 Jul 2025',
  time: '14:09',
  description: 'Kindly find the attached document for more examples.',
};

const SpecificTicketScreen = () => {
  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="#10124" returnPath="Ticket" />
      <ScrollView style={styles.container}>
        <View style={[styles.ph35, styles.mb45]}>
          <View
            style={[
              styles.flex,
              styles.flexRow,
              styles.justifyCenter,
              styles.itemsCenter,
              ticket.status === 'completed'
                ? styles.bgLightBlue
                : styles.bgPink,
              styles.h30,
              styles.w90,
              styles.mt20,
              styles.r10,
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
              {ticket.status === 'completed' ? 'Completed' : 'In Progress'}
            </Text>
          </View>

          <View style={[styles.mv10]}>
            <Text style={[styles.fs18, styles.mt10]}>{ticket.ticketTitle}</Text>
            <View style={[styles.flex, styles.flexRow, styles.mt10]}>
              <Text style={[styles.textGray]}>{ticket.date} </Text>
              <Text style={[styles.textGray]}>{ticket.time}</Text>
            </View>
            <Text style={[styles.fs16, styles.mt20, styles.lineHeight23]}>
              {ticket.ticketDescription}
            </Text>
          </View>

          <View style={[styles.mt20]}>
            <Image
              source={require('../../assets/sample_ticket_image.png')}
              style={[styles.h170, styles.wFull, styles.r10]}
            />
          </View>

          <View style={[styles.mt60, styles.divider]} />

          <View style={[styles.mv10]}>
            <Text style={[styles.fs18]}>{replyTicket.title}</Text>
            <View style={[styles.flex, styles.flexRow, styles.mt10]}>
              <Text style={[styles.textGray]}>{replyTicket.date} </Text>
              <Text style={[styles.textGray]}>{replyTicket.time}</Text>
            </View>
            <Text style={[styles.fs16, styles.mt20, styles.lineHeight23]}>
              {replyTicket.description}
            </Text>
          </View>

          <View>
            <View style={[styles.mt20]}>
              <Image
                source={require('../../assets/sample_ticket_image.png')}
                style={[styles.h170, styles.wFull, styles.rtr10, styles.rtl10]}
              />
            </View>
            <View
              style={[
                styles.flex,
                styles.flexRow,
                styles.justifyBetween,
                styles.bgGray,
                styles.p15,
                styles.rbl10,
                styles.rbr10,
              ]}
            >
              <Text>downlad_ticket.pdf</Text>
              <TouchableOpacity>
                <AntDesignIcons name="download" size={20} color={'#000000'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SpecificTicketScreen;

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
    color: '#cac9c9ff',
  },
  textRed: { color: '#B53133' },
  textWhite: { color: '#ffffff' },
  smallFont: { fontSize: 12 },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#9B9B9B',
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
  mt60: { marginTop: 60 },
  mv10: {
    marginVertical: 10,
  },
  mv20: {
    marginVertical: 20,
  },
  p15: {
    padding: 15,
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
  ph35: { paddingHorizontal: 35 },
  r5: {
    borderRadius: 5,
  },
  r10: {
    borderRadius: 10,
  },
  rtr10: {
    borderTopRightRadius: 10,
  },
  rtl10: {
    borderTopLeftRadius: 10,
  },
  rbr10: {
    borderBottomRightRadius: 10,
  },
  rbl10: {
    borderBottomLeftRadius: 10,
  },
  border2: { borderWidth: 2 },
  borderRed: { borderColor: '#B53133' },
  bgWhite: { backgroundColor: '#ffffff' },
  bgRed: {
    backgroundColor: '#B53133',
  },
  bgPink: { backgroundColor: '#f0d6d6' },
  bgLightBlue: { backgroundColor: '#ccd5e0' },
  bgGray: { backgroundColor: '#ddd9d9ff' },
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
  h170: { height: 170 },
  w80: { width: 80 },
  w90: { width: 90 },
  w100: { width: 100 },
  wFull: { width: '100%' },

  lineHeight23: {
    lineHeight: 23,
  },
});
