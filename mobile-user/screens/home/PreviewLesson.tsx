import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import GradientHeader from '../../components/GradientHeader';
import ReuCard from '../../components/ReuCard';
import ReuGradientButton from '../../components/ReuGradientButton';
import Video, { VideoRef } from 'react-native-video';
import Octicons from 'react-native-vector-icons/Octicons';
import ReuCarousel from '../../components/ReuCarousel';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPreviewLessonByCourseId,
  updatePreviewLessonPlaybackTime,
} from './homeSlice';
import { formatURI } from '../../utils/Utils';

interface DetailToKnow {
  id: number | string;
  imgUrl: string;
  title: string;
  description: string;
}

const imageMap: Record<string, any> = {
  previewLessonIcon1: require('../../assets/previewIcons/previewLessonIcon1.png'),
  previewLessonIcon2: require('../../assets/previewIcons/previewLessonIcon2.png'),
  previewLessonIcon3: require('../../assets/previewIcons/previewLessonIcon3.png'),
  previewLessonIcon4: require('../../assets/previewIcons/previewLessonIcon4.png'),
  previewLessonIcon5: require('../../assets/previewIcons/previewLessonIcon5.png'),
};

const detailsToKnow: DetailToKnow[] = [
  {
    id: 1,
    title: 'JLPT Certification',
    imgUrl: 'previewLessonIcon1',
    description: 'Recognized certificates for each completed level.',
  },

  {
    id: 2,
    title: 'Teaching Language',
    imgUrl: 'previewLessonIcon2',
    description: 'English',
  },
  {
    id: 3,
    title: 'Mandatory Assessment',
    imgUrl: 'previewLessonIcon3',
    description:
      'Each lesson consists a video with an assessment to unlock next lesson',
  },
  {
    id: 4,
    title: 'Can’t Skip any lesson',
    imgUrl: 'previewLessonIcon4',
    description:
      'Even you’re subscribed - you can access a lesson only if you pass the previous assessment. So You can’t skip any lecture.',
  },
  {
    id: 5,
    title: 'Monthly Subscription',
    imgUrl: 'previewLessonIcon5',
    description:
      'You can subscribe a course for a period of time. After that period, you have to renew your subcription to access the course.',
  },
];

const studentsTestimonials = [
  {
    id: 1,
    name: 'Pradeesh S',
    imgUrl: '',
    passout: '2024 Student',
    description:
      'Et autem voluptatem quo placeat beatae aut mollitia vero sed dolor porro in labore placeat beatae aut mollitia vero sed dolor porro in labore dolores.',
  },
  {
    id: 2,
    name: 'Rajesh K',
    imgUrl: '',
    passout: '2022 Student',
    description:
      'Et autem voluptatem quo placeat beatae aut mollitia vero sed dolor porro in labore placeat beatae aut mollitia vero sed dolor porro in labore dolores.',
  },
];

const courseDescription = [
  {
    id: 1,
    label:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui architecto deleniti adipisci quo sapiente reprehenderit ex officiis vero fugit nesciunt perspiciatis odio dolor modi aliquid eveniet nisi non, at ipsum.',
  },
  {
    id: 2,
    label:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui architecto deleniti adipisci quo sapiente reprehenderit ex officiis vero fugit nesciunt perspiciatis odio dolor modi aliquid eveniet nisi non, at ipsum.',
  },
  {
    id: 3,
    label:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui architecto deleniti adipisci quo sapiente reprehenderit ex officiis vero fugit nesciunt perspiciatis odio dolor modi aliquid eveniet nisi non, at ipsum.',
  },
  {
    id: 4,
    label:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui architecto deleniti adipisci quo sapiente reprehenderit ex officiis vero fugit nesciunt perspiciatis odio dolor modi aliquid eveniet nisi non, at ipsum.',
  },
];

const skills = [
  {
    id: 1,
    label: 'Basic Japanese text',
  },
  {
    id: 2,
    label: 'Japanese Calligraphy',
  },
  {
    id: 3,
    label: 'Basic Japanese grammar',
  },
];

const PreviewLesson = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { lessonDetails } = route.params;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const courseId = lessonDetails.id;

  const previewLessonByCourse = useAppSelector(
    state => state.home.previewLessonByCourse,
  );

  const playerRef = useRef<VideoRef>(null);
  // const [previewLessonDetails, setPreviewLessonDetails] = useState<any>();

  const [currentTime, setCurrentTime] = useState(0);

  const updatePlayback = () => {
    const data = {
      lessonId: previewLessonByCourse?.data?.data?.id,
      courseId: previewLessonByCourse?.data?.data?.courseId,
      data: {
        playBackTime: currentTime,
      },
    };
    console.log('calling update', data);
    dispatch(updatePreviewLessonPlaybackTime(data));
  };

  const handlePlaybackStateChange = ({ isPlaying, isSeeking }: any) => {
    if (!isPlaying && !isSeeking) {
      updatePlayback();
    }
  };

  const handleProgress = (progress: { currentTime: number }) => {
    console.log('current time', progress.currentTime);
    setCurrentTime(progress.currentTime);
  };

  const handleLoad = () => {
    if (currentTime > 0 && playerRef.current) {
      playerRef.current.seek(currentTime);
    }
  };

  useEffect(() => {
    setCurrentTime(previewLessonByCourse?.data?.data?.playBackTime || 0);
  }, [previewLessonByCourse]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        playerRef.current?.pause();
        // updatePlayback();
        return false;
      },
    );

    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        playerRef.current?.pause();
        // updatePlayback();
      };
    }, []),
  );

  useLayoutEffect(() => {
    // setPreviewLessonDetails(previewLessonByCourse?.data?.data);
    console.log('previewLessonByCourse', previewLessonByCourse?.data?.data);
  }, [previewLessonByCourse]);

  useEffect(() => {
    dispatch(getPreviewLessonByCourseId(courseId));
    console.log('Current video params', lessonDetails);
  }, [courseId]);

  return (
    <View style={styles.containerWrapper}>
      <GradientHeader
        title={`${lessonDetails.courseLevel} ${lessonDetails.title}`}
        returnPath="Home"
        onBackPress={() => {
          playerRef.current?.pause();
          updatePlayback();
          navigation.navigate('Home');
        }}
      />
      <ScrollView style={styles.container}>
        <View>
          <Text style={[styles.fw700, styles.fs18, styles.textBlue]}>
            {lessonDetails.courseLevel} {lessonDetails.title}
          </Text>
          <View style={[styles.flexRow, styles.mt5]}>
            <Text>
              {previewLessonByCourse?.data?.data?.lessons} Lesson{' '}
              {previewLessonByCourse?.data?.data?.lessons > 1 && 's'}{' '}
            </Text>
            <Text style={styles.textGray}>
              ({previewLessonByCourse?.data?.data?.hours} hrs)
            </Text>
          </View>
          <ReuGradientButton
            label="Enroll Now"
            onPress={() => {
              navigation.navigate('Subscription');
            }}
            gradientColors={['#B53133', '#B53133']}
            // eslint-disable-next-line react-native/no-inline-styles
            btnStyles={{ marginTop: 25, borderRadius: 10 }}
          />
        </View>
<Text>
        {JSON.stringify(formatURI(previewLessonByCourse?.data?.data?.url))}

</Text>
        <View style={styles.relative}>
          <View style={styles.videoAspectRation}>
            <Video
              ref={playerRef}
              source={{
                uri: formatURI(previewLessonByCourse?.data?.data?.url) ?? '',
              }}
              style={styles.fullWidthHeight}
              controls
              onPlaybackStateChanged={handlePlaybackStateChange}
              onProgress={handleProgress}
              onLoad={handleLoad}
              resizeMode="cover"
              paused
              onPlaybackRateChange={({ playbackRate }) => {
                console.log('Current Playback Rate:', playbackRate);
                if (playbackRate === 0) {
                  setIsVideoPlaying(false);
                  console.log('Video is paused');
                } else {
                  setIsVideoPlaying(true);
                  console.log('Video is playing');
                }
              }}
              key={`${
                previewLessonByCourse?.data?.data?.url ?? ''
              }_w3schools_new-video`}
            />
          </View>
          {!isVideoPlaying && (
            <View style={[styles.absolute, styles.top40, styles.left20]}>
              <Text style={[styles.fw600, styles.textWhite]}>
                Free 1 lesson preview + Free Assessment
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text style={[styles.fw700, styles.fs18, styles.textBlue]}>
            In this course - You will learn about:
          </Text>
          <View style={styles.mv10}>
            {courseDescription.map(course => (
              <View
                key={`course_${course.id}`}
                style={[styles.mb10, styles.flexRow]}
              >
                <View>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color={'#192F54'}
                    style={styles.mt5}
                  />
                </View>
                <View>
                  <Text
                    style={[styles.mh20, styles.lineHeight23, styles.textBlue]}
                  >
                    {course.label}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text style={[styles.fw700, styles.fs18, styles.textBlue]}>
            Skills you’ll Learn:
          </Text>
          <View style={[styles.flexRow, styles.mt10, styles.flexWrap]}>
            {skills.map(skill => (
              <View
                key={`skill_${skill.id}`}
                style={[
                  styles.bgRed,
                  styles.pv5,
                  styles.ph10,
                  styles.r5,
                  styles.m5,
                ]}
              >
                <Text style={[styles.textRed, styles.fs16, styles.fw600]}>
                  {skill.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View>
          <ReuCard>
            <TouchableOpacity style={[styles.pv15, styles.ph10]}>
              <Text style={[styles.fw700, styles.fs18, styles.textBlue]}>
                Details to know:
              </Text>
              <View style={[styles.mt10, styles.ph15, styles.pv5]}>
                {detailsToKnow.map(item => (
                  <View
                    style={[styles.flexRow, styles.mb10]}
                    key={`course_details_${item.id}`}
                  >
                    <View>
                      <Image
                        source={imageMap[item.imgUrl]}
                        style={styles.icon}
                      />
                    </View>
                    <View style={styles.ph15}>
                      <Text>{item.title}</Text>
                      <Text style={[styles.lineHeight23]}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          </ReuCard>
        </View>
        <View style={styles.mt20}>
          <Text style={[styles.fw700, styles.fs18, styles.textBlue]}>
            Students testimonials:
          </Text>

          <ReuCard containerClass={styles.rowJustifyCenter}>
            <ReuCarousel
              autoPlay={false}
              height={200}
              width={360}
              data={studentsTestimonials}
              renderItem={({ item }: any) => (
                <View style={styles.flex1}>
                  <View key={`testimonial_${item.id}`} style={styles.p20}>
                    <View style={styles.rowVerticallyCentered}>
                      <View style={styles.r50}>
                        <Image
                          source={require('../../assets/previewIcons/previewLessonIcon1.png')}
                          style={styles.testimonialImg}
                        />
                      </View>
                      <View style={styles.ml20}>
                        <Text style={[styles.textBlue, styles.fw600]}>
                          {item.name}
                        </Text>
                        <Text style={styles.textGray}>{item.passout}</Text>
                      </View>
                    </View>
                    <View style={[styles.p10, styles.mt20]}>
                      <Text style={[styles.textBlue, styles.lineHeight23]}>
                        “ {item.description} ”
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </ReuCard>
        </View>
        <ReuGradientButton
          label="Enroll Now"
          onPress={() => {
            navigation.navigate('Subscription');
          }}
          gradientColors={['#B53133', '#B53133']}
          btnStyles={styles.enrollNowContainer}
        />
      </ScrollView>
    </View>
  );
};

export default PreviewLesson;

const styles = StyleSheet.create({
  containerWrapper: { flex: 1 },
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
  },
  flex1: { flex: 1 },
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
  textWhite: {
    color: '#ffffff',
  },
  textRed: { color: '#B53133' },
  smallFont: { fontSize: 12 },
  divider: {
    width: '95%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
  fs16: { fontSize: 16 },
  fs18: { fontSize: 18 },
  m5: { margin: 5 },
  ml5: {
    marginLeft: 5,
  },
  ml15: {
    marginLeft: 15,
  },
  ml20: { marginLeft: 20 },
  mt5: { marginTop: 5 },
  mt10: {
    marginTop: 10,
  },
  mt20: { marginTop: 20 },
  mb10: { marginBottom: 10 },
  mv10: {
    marginVertical: 10,
  },
  mh20: { marginHorizontal: 20 },
  p10: {
    padding: 10,
  },
  p15: {
    padding: 15,
  },
  p20: {
    padding: 20,
  },
  pv5: { paddingVertical: 5 },
  pv15: { paddingVertical: 15 },
  fw700: {
    fontWeight: 700,
  },
  fw600: { fontWeight: 600 },
  ph10: { paddingHorizontal: 10 },
  ph20: { paddingHorizontal: 20 },
  ph15: { paddingHorizontal: 15 },
  r5: {
    borderRadius: 5,
  },
  r50: { borderRadius: 50 },
  bgBlue: {
    backgroundColor: '#ccd5e0',
  },
  bgRed: {
    backgroundColor: '#ffdad6',
  },
  flexRow: { display: 'flex', flexDirection: 'row' },
  flexRowCentered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowVerticallyCentered: { flexDirection: 'row', alignItems: 'center' },
  rowJustifyCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
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
  testimonialImg: { height: 30, width: 30 },
  enrollNowContainer: {
    marginVertical: 30,
    borderRadius: 10,
  },
  icon: { height: 27, width: 27 },
  flexWrap: {
    flexWrap: 'wrap',
  },
  videoAspectRation: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 14 / 9,
    height: 230,
    marginVertical: 30,
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  },
  lineHeight23: {
    lineHeight: 23,
  },
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  top40: { top: 40 },
  left20: { left: 20 },
});
