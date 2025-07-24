import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // flex properties
  flex1: { flex: 1 },
  flex: { display: 'flex' },
  flexRow: { flexDirection: 'row' },
  flexCol: { flexDirection: 'column' },
  flexWrap: { flexWrap: 'wrap' },

  justifyBetween: { justifyContent: 'space-between' },
  justifyCenter: { justifyContent: 'center' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyEnd: { justifyContent: 'flex-end' },

  itemsCenter: { alignItems: 'center' },

  //position
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },

  //font size
  fs16: { fontSize: 16 },
  fs18: { fontSize: 18 },
  fs20: { fontSize: 20 },
  fs30: { fontSize: 30 },

  //font weight
  fw600: {
    fontWeight: 600,
  },
  fw700: {
    fontWeight: 700,
  },
  fwBold: { fontWeight: 'bold' },

  //padding
  p5: { padding: 5 },
  p10: { padding: 10 },
  p20: { padding: 20 },

  //padding bottom
  pb60: { paddingBottom: 60 },

  //padding horizontal
  ph8: { paddingHorizontal: 8 },
  ph20: { paddingHorizontal: 20 },

  //margin top
  mt5: { marginTop: 5 },
  mt10: { marginTop: 10 },
  mt20: { marginTop: 20 },
  mt150: { marginTop: 150 },

  //margin bottom
  mb100: { marginBottom: 100 },

  //margin left
  ml10: { marginLeft: 10 },

  //margin vertical
  mv5: { marginVertical: 5 },
  mv10: { marginVertical: 10 },
  mv20: { marginVertical: 20 },

  //margin horizontal
  mh5: { marginHorizontal: 5 },
  mh10: { marginHorizontal: 10 },

  //border
  border1: { borderWidth: 1 },
  border2: { borderWidth: 2 },

  //border color
  borderWhite: { borderColor: '#ffffff' },
  borderGreen: { borderColor: 'green' },
  borderGray: { borderColor: '#cccccc' },
  borderRed: { borderColor: '#B53133' },

  //border radius
  r5: { borderRadius: 5 },
  r10: { borderRadius: 10 },
  r13: { borderRadius: 13 },
  r50: { borderRadius: 50 },
  r100: { borderRadius: 100 },

  //line height
  lineHeight23: {
    lineHeight: 23,
  },

  //font color
  textGray: { color: '#9B9B9B' },
  textRed: { color: '#B53133' },
  textWhite: { color: '#ffffff' },
  textBlue: { color: '#192F54' },

  //background color
  bgPink: {
    backgroundColor: '#ffdad6',
  },
  bgRed: {
    backgroundColor: '#B53133',
  },
  bgGray: {
    backgroundColor: '#f5f4f4ff',
  },
  bgDarkGray: {
    backgroundColor: '#e6e4e4ff',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
  },
  bgDisabled: {
    backgroundColor: '#f3eeeea1',
  },

  //height
  h30: { height: 30 },
  h50: { height: 50 },
  h20Percent: { height: '20%' },
  h80Percent: { height: '80%' },
  hFull: { height: '100%' },

  //width
  w30: { width: 30 },
  w50: { width: 50 },
  w80: { width: 80 },
  wFull: { width: '100%' },
});
