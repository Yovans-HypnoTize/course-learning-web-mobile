import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ReuCard from '../../components/ReuCard';
import GradientHeader from '../../components/GradientHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getLessonsByCourseId, getSubscribedCourses } from './courseSlice';
import Video, { VideoRef } from 'react-native-video';
import { getDataFromCookie, storeDataInCookie } from '../../utils/Utils';

const CourseCard = ({ item, handleCourse }: any) => {
  console.log('preview course item', item);
  return (
    <ReuCard
      containerClass={{ position: 'relative', overflow: 'hidden' }}
      key={item.id}
    >
      {(item.status === 'renewal' || item.status === 'enroll') && (
        <View style={styles.previewCourseContainer}>
          <Text style={[styles.textWhite, styles.fw700]}>FREE L1</Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.p20, styles.flex, styles.flexRow, styles.justifyBetween]}
        onPress={() => handleCourse(item)}
      >
        <View>
          <Text style={[styles.fw700, styles.fs16]}>
            {item.courseLevel} {item.title}
          </Text>
          <View style={[styles.flexRow, styles.mt5]}>
            <Text>{item.lessons} Lessons </Text>
            <Text style={styles.textGray}>({item.hours} hrs)</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.w120,
              styles.h50,
              styles.flex,
              styles.flexRow,
              styles.justifyCenter,
              styles.itemsCenter,
              styles.r10,
              styles.p5,
              styles.mt20,
              styles.bgGray,
              item.status === 'enroll' && styles.border2,
              item.status === 'enroll' && styles.borderRed,
              item.status === 'enroll' && styles.bgWhite,
              item.status === 'enrolled' && styles.bgPink,
            ]}
          >
            <Text
              style={[
                styles.fw700,
                item.status === 'enroll'
                  ? styles.textRed
                  : item.status === 'enrolled'
                  ? styles.textRed
                  : styles.textGray,
              ]}
            >
              {item.status === 'enroll' ? 'Enroll Now' : 'Enrolled'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require('../../assets/courseCardImg.png')}
            style={styles.previewCardImage}
          />
        </View>
      </TouchableOpacity>
      {item.status === 'renewal' && (
        <View
          style={[
            styles.bgRed,
            styles.flex,
            styles.flexRow,
            styles.justifyCenter,
            styles.itemsCenter,
            styles.pv15,
          ]}
        >
          <Text style={[styles.textWhite, styles.fw700, styles.fs16]}>
            RENEW SUBSCRIPTION
          </Text>
        </View>
      )}
    </ReuCard>
  );
};

const CourseScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const subscribedCourseList = useAppSelector(
    state => state.course.subscribedCourseList,
  );
  const lessonListByCourse = useAppSelector(
    state => state.course.lessonListByCourse,
  );

  useEffect(() => {
    dispatch(getSubscribedCourses());
  }, []);

  useEffect(() => {
    console.log('response from course screen', subscribedCourseList);
  }, [subscribedCourseList]);

  useEffect(() => {
    lessonListByCourse?.data?.data;
  }, [lessonListByCourse]);

  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="Course" returnPath="Home" />
      <ScrollView style={styles.flex1}>
        <View style={styles.container}>
          <View style={styles.mt10}>
            <Text style={[styles.fw600, styles.fs20]}>Your Courses</Text>
            <View
              style={[
                styles.flex,
                styles.flexRow,
                styles.flexWrap,
                styles.justifyStart,
                styles.ph10,
              ]}
            >
              {subscribedCourseList?.data?.data?.length > 0 ? (
                subscribedCourseList?.data?.data.map(
                  (course: any, index: number) => (
                    <ReuCard
                      containerClass={{
                        width: '30%',
                        height: 60,
                        marginVertical: 10,
                        marginRight: 20,
                        backgroundColor: '#B53133',
                      }}
                      key={index}
                    >
                      <TouchableOpacity
                        onPress={() => {}}
                        style={[
                          styles.flex,
                          styles.flexRow,
                          styles.justifyCenter,
                          styles.itemsCenter,
                          styles.hFull,
                        ]}
                      >
                        <Text
                          style={[styles.fs18, styles.fwBold, styles.textWhite]}
                        >
                          {course.courseLevel}
                        </Text>
                      </TouchableOpacity>
                    </ReuCard>
                  ),
                )
              ) : (
                <Text>No Data Available</Text>
              )}
            </View>
          </View>

          <View style={styles.mv10}>
            <Text style={[styles.fs20, styles.fw600]}>Courses</Text>

            {subscribedCourseList?.data?.data?.length > 0 ? (
              subscribedCourseList?.data?.data.map(
                (course: any, index: number) => (
                  <CourseCard
                    item={course}
                    handleCourse={() => {
                      console.log(course.id);
                      navigation.navigate('Lessons', { courseDetails: course });
                    }}
                    key={`course_${index}`}
                  />
                ),
              )
            ) : (
              <Text style={styles.ml15}>No Data Available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  containerWrapper: { flex: 1, backgroundColor: 'rgba(255,255,255,0.5)' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 5,
  },

  flex: { display: 'flex' },
  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyCenter: { justifyContent: 'center' },
  justifyStart: { justifyContent: 'flex-start' },
  itemsCenter: { alignItems: 'center' },
  flexWrap: { flexWrap: 'wrap' },

  // courseLevelCardWrapper: {
  //   marginTop: 12,
  //   paddingVertical: 15,
  //   paddingHorizontal: 20,
  //   height: 130,
  //   marginHorizontal: 5,
  //   backgroundColor: '#fff',
  //   marginBottom: 7,
  // },
  // courseLevelContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // courseContainerWrapper: {
  //   marginTop: 10,
  //   marginBottom: 100,
  // },
  // courseProgressContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginVertical: 10,
  // },
  // courseProgressPercentageLaebl: {
  //   color: '#B53133',
  // },
  // courseContainer: {
  //   position: 'relative',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   borderRadius: 15,
  //   borderColor: '#d0d0d0',
  //   boxShadow: '2px 5px 2px rgba(0,0,0,0.2)',
  //   marginTop: 12,
  //   alignItems: 'center',
  //   paddingHorizontal: 10,
  //   height: 100,
  //   marginHorizontal: 5,
  //   backgroundColor: '#fff',
  //   marginBottom: 7,
  // },
  // courseAvatarLabel: {
  //   backgroundColor: 'gray',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 50,
  //   width: 50,
  //   borderRadius: 50,
  //   marginRight: 10,
  //   elevation: 3,
  //   boxShadow: '2px 1px 2px rgba(0,0,0,0.2)',
  // },
  // courseAvatarLabelText: { fontSize: 18, fontWeight: 'bold' },

  // courseContentContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // courseContentBody: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // courseContentWrapper: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   width: '85%',
  // },
  // courseTitleText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },

  // courseDescriptionText: {
  //   fontSize: 16,
  // },
  // progressBarContainer: {
  //   marginVertical: 10,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // progressPercentage: {
  //   color: '#6B7280',
  //   fontSize: 16,
  //   marginLeft: 5,
  // },
  // progressPercentageText: {
  //   marginLeft: 130,
  // },
  // progressBar: {
  //   borderColor: '#E5E7EB',
  //   backgroundColor: '#E5E7EB',
  // },
  // courseIconContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // forwardIconContainer: {
  //   marginLeft: 20,
  // },

  fs20: { fontSize: 20 },
  fw600: { fontWeight: 600 },
  // coursesHeaderText: {
  //   fontWeight: 600,
  //   fontSize: 20,
  // },
  // dropDownContainer: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   width: 210,
  //   padding: 0,
  //   height: 40,
  //   margin: 0,
  //   justifyContent: 'center',
  //   overflow: 'hidden',
  //   backgroundColor: '#f5f5f5',
  // },
  // dropDownPicker: {
  //   height: 60,
  //   color: '#B53133',
  // },

  // courseCard: {
  //   marginTop: 20,
  //   borderWidth: 1,
  //   borderColor: 'rgba(229, 230, 237, 0.7)',
  //   boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
  //   borderRadius: 15,
  //   backgroundColor: '#fff',
  // },

  previewCourseContainer: {
    position: 'absolute',
    right: '-6%',
    backgroundColor: '#B53133',
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
    top: 20,
    zIndex: 1,
  },
  // previewDiagonalLabelText: { color: '#fff', fontWeight: 700 },
  // enrollBtn: {
  //   borderWidth: 2,
  //   borderRadius: 10,
  //   borderColor: '#B53133',
  //   padding: 5,
  //   marginTop: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 100,
  // },
  previewCardImage: { height: 90, width: 90 },

  r10: { borderRadius: 10 },
  border2: { borderWidth: 2 },
  borderRed: { borderColor: '#B53133' },
  h50: { height: 35 },
  hFull: { height: '100%' },
  w120: { width: 120 },
  mt10: { marginTop: 10 },
  mt20: { marginTop: 20 },
  p5: { padding: 5 },
  p20: {
    padding: 20,
  },
  ph10: { paddingHorizontal: 10 },
  pv15: {
    paddingVertical: 15,
  },
  fs16: {
    fontSize: 16,
  },
  ml15: { marginLeft: 15 },
  mt5: {
    marginTop: 5,
  },
  mv10: { marginVertical: 10 },
  fs18: { fontSize: 18 },
  fwBold: { fontWeight: 'bold' },
  fw700: {
    fontWeight: 700,
  },
  textGray: {
    color: '#9B9B9B',
  },
  textRed: {
    color: '#B53133',
  },
  textWhite: { color: '#ffffff' },
  bgPink: {
    backgroundColor: '#ffdad6',
  },
  bgRed: {
    backgroundColor: '#B53133',
  },
  bgGray: {
    backgroundColor: '#f5f4f4ff',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
  },
});
