import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import GradientHeader from '../../components/GradientHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getLessonsByCourseId } from './courseSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import ReuCard from '../../components/ReuCard';
import { globalStyles } from '../../styles/style';

const LessonCard = ({ item, onPress }: { item: any; onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={[
        styles.courseContainer,
        item.flag === 'locked' && globalStyles.bgDisabled,
        item.flag === 'progress' && globalStyles.bgRed,
      ]}
      key={item.id}
      onPress={item.flag === 'locked' ? () => {} : onPress}
    >
      <View style={[globalStyles.flex, globalStyles.flexRow]}>
        <View
          style={[
            globalStyles.flex,
            globalStyles.flexRow,
            globalStyles.justifyCenter,
            globalStyles.itemsCenter,
            globalStyles.r5,
            globalStyles.mh10,
            globalStyles.p10,
            globalStyles.bgDarkGray,
          ]}
        >
          <Ionicons
            name="play"
            size={25}
            color={item.flag === 'progress' ? '#B53133' : '#000000'}
          />
        </View>
        <View style={globalStyles.ml10}>
          <Text
            style={[
              globalStyles.fs16,
              globalStyles.fw600,
              item.flag === 'progress' && globalStyles.textWhite,
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.textGray,
              item.flag === 'progress' && globalStyles.textWhite,
            ]}
          >
            {item.duration} min
          </Text>
        </View>
      </View>

      <View
        style={[
          globalStyles.flex,
          globalStyles.flexRow,
          globalStyles.justifyCenter,
          globalStyles.itemsCenter,
          globalStyles.r100,
          globalStyles.border2,
          globalStyles.h50,
          globalStyles.w50,
          globalStyles.borderGreen,
          globalStyles.mh5,
          item.flag === 'progress' && globalStyles.borderWhite,
        ]}
      >
        {item.flag !== 'progress' ? (
          <Ionicons
            name={item.flag === 'locked' ? 'lock-closed-outline' : 'checkmark'}
            size={28}
            color={
              item.flag === 'locked'
                ? 'gray'
                : item.flag === 'progress'
                ? '#ffffff'
                : 'green'
            }
          />
        ) : (
          <Text>100</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const LessonsScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { courseDetails } = route.params;

  const { id: courseId, courseLevel: courseTitle } = courseDetails;

  const lessonListByCourse = useAppSelector(
    state => state.course.lessonListByCourse,
  );

  const handleCoursePress = (item: any) => {
    navigation.navigate('StreamVideo', {
      params: { currentVideoDetails: item, courseDetails: courseDetails },
    });
  };

  const fetchLessons = async () => {
    await dispatch(getLessonsByCourseId(courseId));
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  useEffect(() => {
    console.log('lesson list', lessonListByCourse?.data?.data?.lessons);
  }, [lessonListByCourse]);

  return (
    <View style={globalStyles.flex1}>
      <GradientHeader title={courseTitle || 'N/A'} returnPath="Course" />
      <View style={styles.container}>
        <ScrollView
          style={globalStyles.flex1}
          showsVerticalScrollIndicator={false}
        >
          <ReuCard containerClass={{ marginBottom: 10 }}>
            <TouchableOpacity>
              <View style={[globalStyles.p20]}>
                <Text style={[globalStyles.fs18, globalStyles.fw600]}>
                  Take Assessment
                </Text>
                <View
                  style={[
                    globalStyles.flex,
                    globalStyles.flexRow,
                    globalStyles.itemsCenter,
                    globalStyles.mt20,
                  ]}
                >
                  <View
                    style={[
                      globalStyles.flex,
                      globalStyles.flexRow,
                      globalStyles.itemsCenter,
                      globalStyles.justifyCenter,
                      globalStyles.bgGray,
                      globalStyles.r10,
                      globalStyles.h50,
                      globalStyles.w80,
                    ]}
                  >
                    <Image
                      source={require('../../assets/take_assessment_img.png')}
                      style={[globalStyles.h30, globalStyles.w30]}
                    />
                  </View>
                  <View style={globalStyles.ml10}>
                    <Text style={globalStyles.fw600}>N3 Intermediate</Text>
                    <Text style={[globalStyles.mt5]}>
                      Lesson 20: Particles は vs ..
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[globalStyles.bgGray, globalStyles.p20]}>
                <View
                  style={[
                    globalStyles.flex,
                    globalStyles.flexRow,
                    globalStyles.justifyBetween,
                    globalStyles.itemsCenter,
                  ]}
                >
                  <Text>20/200 Lessons</Text>
                  <Text>10%</Text>
                </View>
                <View style={globalStyles.mt10}>
                  <Progress.Bar
                    progress={10 / 100}
                    width={320}
                    height={5}
                    color={'#B53133'}
                    style={[globalStyles.bgWhite, globalStyles.borderWhite]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </ReuCard>

          <View style={styles.courseContainerWrapper}>
            <Text style={styles.coursesHeaderText}>Lessons</Text>

            {lessonListByCourse?.data?.data?.lessons?.length > 0 ? (
              lessonListByCourse.data.data.lessons.map(
                (item: any, index: number) => (
                  <LessonCard
                    item={item}
                    onPress={
                      item.flag !== 'locked'
                        ? () => handleCoursePress(item)
                        : () => {}
                    }
                    key={`lesson_${index}`}
                  />
                ),
              )
            ) : (
              <Text
                style={[globalStyles.mt20, globalStyles.fs16, styles.textGray]}
              >
                No lessons available for this course.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LessonsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  courseContainerWrapper: {
    marginTop: 10,
    marginBottom: 30,
  },
  courseContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderColor: '#d0d0d0',
    boxShadow: '2px 5px 2px rgba(0,0,0,0.2)',
    marginTop: 12,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 100,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  coursesHeaderText: {
    fontSize: 20,
  },

  textGray: {
    color: '#9B9B9B',
  },
});
