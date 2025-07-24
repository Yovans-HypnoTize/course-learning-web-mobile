import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, BackHandler, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Video, { VideoRef } from 'react-native-video';
import { getLessonById, updateLessonPlaybackTime } from './courseSlice';
import GradientHeader from '../../components/GradientHeader';
import { formatURI } from '../../utils/Utils';
import { globalStyles } from '../../styles/style';
import ReuGradientButton from '../../components/ReuGradientButton';

const StreamVideoScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { params } = route.params;
  const id = params.currentVideoDetails.id;
  const courseId = params.currentVideoDetails.courseId;

  const lessonById = useAppSelector(state => state.course.lessonById);

  const playerRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  // const [paused, setPaused] = useState(true);

  const updatePlayback = () => {
    const data = {
      lessonId: id,
      courseId,
      data: {
        playBackTime: currentTime,
      },
    };
    console.log('calling update', data);
    dispatch(updateLessonPlaybackTime(data));
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
    setCurrentTime(lessonById?.data?.data?.playBackTime || 0);
  }, [lessonById]);

  useEffect(() => {
    const data = { id, courseId };
    dispatch(getLessonById(data));
  }, [params]);

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

  // 📌 Pause the video and call updatePlayback on unmount or blur
  useFocusEffect(
    useCallback(() => {
      return () => {
        playerRef.current?.pause();

        // updatePlayback();
      };
    }, []),
  );

  return (
    <View style={styles.containerWrapper}>
      <GradientHeader
        title={
          `${params.courseDetails.courseLevel} ${params.courseDetails.title}` ||
          ''
        }
        returnPath="Lessons"
        returnParams={{ courseDetails: params.courseDetails }}
        onBackPress={() => {
          playerRef.current?.pause();
          updatePlayback();
          navigation.navigate('Lessons', {
            courseDetails: params.courseDetails,
          });
        }}
      />

      <ScrollView style={styles.container}>
        <View
          style={[
            styles.flex,
            styles.flexRow,
            styles.justifyCenter,
            styles.mh5,
          ]}
        >
          <View style={styles.videoAspectRatio}>
            <Video
              ref={playerRef}
              source={{
                uri: formatURI(lessonById?.data?.data?.videoUrl) ?? '',
              }}
              style={styles.whFull}
              controls
              onPlaybackStateChanged={handlePlaybackStateChange}
              onProgress={handleProgress}
              onLoad={handleLoad}
              resizeMode="cover"
              paused
              key={`${lessonById?.data?.data?.id}_new-video`}
            />
          </View>
        </View>

        <View style={[styles.mb15, styles.ph17]}>
          <Text
            style={[styles.headerText, styles.videoHeaderText, styles.mb15]}
          >
            Description
          </Text>
          <Text
            style={[
              styles.lessonAlternateText,
              globalStyles.lineHeight23,
              globalStyles.textBlue,
            ]}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            necessitatibus quisquam recusandae ipsum, voluptate dolores adipisci
            enim maxime! Nobis dolorum consequuntur id temporibus quis porro at
            quibusdam nisi fugiat culpa.
          </Text>
        </View>

        <View style={[globalStyles.mt150, globalStyles.ph20]}>
          <ReuGradientButton
            gradientColors={['#9B9B9B', '#9B9B9B']}
            label="Take Assessment"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default StreamVideoScreen;

const styles = StyleSheet.create({
  containerWrapper: { flex: 1, backgroundColor: 'rgba(255,255,255,0.5)' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerBadgeContainer: { display: 'flex', flexDirection: 'row' },
  headerBadgeIconContainer: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#EEF2FF',
  },
  headerBadgetextContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    marginLeft: 15,
  },
  headerBadgeTextColor: { color: '#4F46E5' },
  videoHeaderText: { marginTop: 10 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  videoContainer: {
    height: 200,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#000',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayIconContainer: {
    padding: 5,
    backgroundColor: 'rgba(229, 230, 237, 0.5)',
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLoadingText: {
    color: '#fff',
    marginTop: 10,
    marginLeft: 15,
    fontWeight: 500,
  },
  lessonProgressWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(229, 230, 237, 0.5)',
    boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
    borderRadius: 15,
  },
  lessonProgressContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lessonProgressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonProgressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B53133',
  },
  lessonProgressBarContainer: { marginVertical: 10 },
  lessonProgressBar: {
    borderColor: '#E5E7EB',
    backgroundColor: '#E5E7EB',
    borderRadius: 50,
  },
  lessonAlternateText: { color: '#4B5563' },
  courseLessonTitle: { fontSize: 20, marginVertical: 15, fontWeight: 'bold' },
  courseLessonsWrapper: {
    marginBottom: 30,
  },
  courseGradientWrapper: {
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 3,
    marginVertical: 7,
  },
  courseGradientWrapperLocked: {
    borderWidth: 1,
    borderColor: 'rgb(210, 211, 212)',
  },
  courseGradientContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseGradientContentView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseGradientLeftIcon: {
    padding: 5,
    backgroundColor: 'rgba(229, 230, 237, 0.5)',
    borderRadius: 50,
  },
  courseGradientLeftIconLocked: {
    backgroundColor: 'rgb(220, 221, 225)',
  },
  courseGradientHeaderContentContainer: {
    marginLeft: 10,
    maxWidth: 200,
  },
  courseGradientHeaderContentTitle: {
    fontSize: 16,
    color: '#fff',
  },
  courseGradientHeaderContentDesc: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    flexWrap: 'wrap',
  },
  darkText: { color: '#000' },
  fontGeneral: { color: '#fff', fontSize: 16 },
  statusLocked: {
    color: 'gray',
  },
  progressContentLocked: {
    textAlign: 'right',
  },
  courseGradientDurationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  courseGradientBarContainer: {
    marginBottom: 10,
    marginTop: 13,
  },
  courseGradientBar: {
    borderColor: '#fff',
    backgroundColor: 'rgba(236, 236, 239, 0.6)',
    borderRadius: 50,
  },

  mb15: {
    marginBottom: 15,
  },
  ph17: {
    paddingHorizontal: 17,
  },
  mh5: {
    marginHorizontal: 5,
  },
  whFull: {
    width: '100%',
    height: '100%',
  },
  videoAspectRatio: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 14 / 9,
    height: 230,
    marginVertical: 15,
  },
  flex: {
    display: 'flex',
  },
  flexRow: { flexDirection: 'row' },
  justifyCenter: {
    justifyContent: 'center',
  },
  itemsCenter: {
    alignItems: 'center',
  },
});
