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
  useState,
} from 'react';
import * as Progress from 'react-native-progress';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getDataFromCookie } from '../../utils/Utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUser } from '../account/accountSlice';
import ReuCard from '../../components/ReuCard';
import {
  getPreviewCourses,
  getSubscribedCourses,
  getSubscriptionStatus,
} from './homeSlice';
import { globalStyles } from '../../styles/style';

const PreviewCourseCard = ({ item, handlePreviewCourse,handlePreviewEnrollPress }: any) => {
  console.log('preview course item', item);
  return (
    <ReuCard
      containerClass={{ position: 'relative', overflow: 'hidden' }}
      key={item.id}
    >
      <View style={styles.previewCourseContainer}>
        <Text style={styles.previewDiagonalLabelText}>FREE L1</Text>
      </View>
      <TouchableOpacity
        style={[styles.flexRowBetween, styles.p20]}
        onPress={() => handlePreviewCourse(item)}
      >
        <View>
          <Text style={[styles.fw700, styles.fs16]}>
            {item.courseLevel} {item.title}
          </Text>
          <View style={[styles.flexRow, styles.mt5]}>
            <Text>{item.lessons} Lessons </Text>
            <Text style={styles.textGray}>({item.hours} hrs)</Text>
          </View>
          <TouchableOpacity style={styles.enrollBtn} onPress={handlePreviewEnrollPress}>
            <Text style={[styles.textRed, styles.fw700]}>Enroll now</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require('../../assets/courseCardImg.png')}
            style={styles.previewCardImage}
          />
        </View>
      </TouchableOpacity>
    </ReuCard>
  );
};

const SubscribedCourseCard = ({
  item,
  status,
  handleSubscribedCourse,
}: any) => {
  const isPending = status === 'pending';
  const isExpired = status === 'expired';
  console.log('---------------------', item);
  return (
    <ReuCard
      containerClass={{ overflow: 'hidden' }}
      key={`subscribed_course_${item.id}`}
    >
      <TouchableOpacity
        disabled={isExpired}
        style={[
          styles.flexRow,
          styles.itemsCenter,
          styles.p20,

          isExpired
            ? styles.bgGray
            : isPending
            ? styles.bgWhite
            : styles.bgDarkRed,

          (isPending || isExpired) && styles.elevation3,
        ]}
        onPress={() => handleSubscribedCourse(item)}
      >
        <View
          style={[
            styles.flexRow,
            styles.itemsCenter,
            styles.justifyCenter,
            styles.r10,
            styles.h60w60,
            isExpired
              ? styles.bgLightGray
              : isPending
              ? styles.bgRed
              : styles.bgWhite,
          ]}
        >
          <Text
            style={[
              styles.fs20,
              styles.fw800,
              isExpired ? styles.textDarkGray : styles.textRed,
            ]}
          >
            {' '}
            {item.courseLevel}
            {isExpired && '!'}
          </Text>
        </View>
        <View style={styles.ml20}>
          <Text
            style={[
              styles.fs18,
              styles.fw800,
              isExpired
                ? styles.textDarkGray
                : isPending
                ? styles.textRed
                : styles.textWhite,
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.fs16,
              isExpired
                ? styles.textDarkGray
                : isPending
                ? styles.textDark
                : styles.textWhite,
            ]}
          >
            0/{item.lessons} Lessons
          </Text>
          <View style={styles.mv10}>
            <Progress.Bar
              progress={65 / 100}
              width={250}
              height={5}
              color={isExpired ? '#a0a0a0' : isPending ? '#d0d0d0' : '#fff'}
            />
          </View>
        </View>
      </TouchableOpacity>
    </ReuCard>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const subscriptionStatus = useAppSelector(
    state => state.home.subscriptionStatus,
  );
  const previewCourseList = useAppSelector(
    state => state.home.previewCourseList,
  );
  const subscribedCourseList = useAppSelector(
    state => state.home.subscribedCourseList,
  );
  // const safeSubscriptionStatus = false;
  const safeSubscriptionStatus =
    subscriptionStatus?.data?.data?.subscriptionsStatus ?? false;

  const [token, setToken] = useState<string | null>(null);
  const [refreshtoken, setRefreshToken] = useState<string | null>(null);
  const userDetails = useAppSelector(state => state.account.userDetails);

  const checkTokenAvailable = async () => {
    const accessToken = await getDataFromCookie('access_token');
    const refreshToken = await getDataFromCookie('refresh_token');
    setToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const handlePreviewCourse = (item: any) => {
    navigation.navigate('PreviewLesson', {
      lessonDetails: item,
    });
  };

  const handleSubscribedCourse = (item: any) => {
    navigation.navigate('Lessons', { courseDetails: item });
  };

  const handlePreviewEnrollPress = () => {
    navigation.navigate('Subscription');
  }

  useEffect(() => {
    checkTokenAvailable();
    console.log('access token available', token);
  }, [token]);

  useLayoutEffect(() => {
    dispatch(getUser());
    dispatch(getSubscriptionStatus());
  }, []);

  useEffect(() => {
    if (safeSubscriptionStatus) {
      dispatch(getSubscribedCourses());
    } else {
      dispatch(getPreviewCourses());
    }
  }, [safeSubscriptionStatus]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={styles.containerWrapper}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#002147', '#002D62']}
          style={styles.headerContainer}
        >
          <Text
            style={[styles.navItemText, globalStyles.mt5, globalStyles.ml10]}
          >
            Hello,{' '}
            {(userDetails?.data?.data?.firstname &&
              userDetails.data.data.firstname.charAt(0).toUpperCase() +
                userDetails.data.data.firstname.slice(1).toLowerCase()) ||
              'User'}
          </Text>
          <Text style={[styles.welconeText, globalStyles.ml10]}>
            Welcome to your learning journey
          </Text>

          <ReuCard
            containerClass={{
              height: 120,
              width: 340,
              position: 'absolute',
              bottom: -60,
              right: '10%',
            }}
          >
            <TouchableOpacity>
              <View style={styles.lastActivityCardWrapper}>
                <View style={styles.lastActivityCardContainer}>
                  <FontAwesome5 name="play" color={'#fff'} />
                </View>
                <View style={styles.lastAcitivityTextContainer}>
                  <Text style={[styles.textBlue, styles.fw800, styles.fs18]}>
                    Start exploring our free course previews
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ReuCard>
        </LinearGradient>

        <View style={styles.courseWrapper}>
          {safeSubscriptionStatus ? (
            <>
              <Text style={[styles.fw700, styles.fs18, globalStyles.mt10]}>
                Your Courses
              </Text>

              <View>
                {subscribedCourseList?.data?.data.map(
                  (item: any, index: number) => (
                    <SubscribedCourseCard
                      key={index}
                      item={item}
                      status={'pending'}
                      handleSubscribedCourse={handleSubscribedCourse}
                    />
                  ),
                )}
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.fw700, styles.fs18]}>Courses</Text>

              <View>
                {previewCourseList?.data?.data.map(
                  (item: any, index: number) => (
                    <PreviewCourseCard
                      key={index}
                      item={item}
                      handlePreviewCourse={handlePreviewCourse}
                      handlePreviewEnrollPress={handlePreviewEnrollPress}
                    />
                  ),
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  navItemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
  },
  navItemImg: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
  },
  navItemText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  // headerTabContainer: {
  //   marginTop: 15,
  //   backgroundColor: '#F2F2F2',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   paddingVertical: 5,
  //   borderWidth: 1,
  //   borderColor: '#d0d0d0',
  //   borderRadius: 10,
  // },
  // headerTabBtn: {
  //   marginHorizontal: 3,
  //   width: 115,
  //   height: 40,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  // },
  // headerTabItemText: {
  //   fontSize: 16,
  // },
  courseContainerWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  courseContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,
    borderColor: '#d0d0d0',
    boxShadow: '2px 5px 2px rgba(0,0,0,0.2)',
    marginTop: 12,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 130,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    marginBottom: 7,
  },
  courseAvatarLabel: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
    elevation: 3,
    boxShadow: '2px 1px 2px rgba(0,0,0,0.2)',
  },
  courseAvatarLabelText: { fontSize: 18, fontWeight: 'bold' },
  statusIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '10%',
  },
  statusIcon: {
    height: 35,
    width: 35,
  },
  courseContentContainer: {
    marginLeft: 10,
  },
  courseContentBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseContentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
  },
  courseTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // courseDescriptionText: {
  //   fontSize: 16,
  // },
  progressBarContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressPercentage: {
    color: '#6B7280',
  },
  progressBar: {
    borderColor: '#E5E7EB',
    // backgroundColor: '#E5E7EB',
  },
  lastWatchedContentWrapper: {
    paddingHorizontal: 10,
  },
  lastWatchedHeaderText: { fontSize: 20, fontWeight: 'bold' },
  lastWatchedCardWrapper: { marginTop: 15, marginBottom: 40 },
  lastWatchedCardContainer: {
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 5,
  },
  lastWatchedVideoContainer: {
    backgroundColor: '#A9A9A9',
    height: 150,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  lastWatchedVideoIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  lastWatchedCardVideoContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  lastWatchedCardVideoContentHeader: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastWatchedCardVideoContentDescription: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastWatchedCardVideoProgress: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fs16: { fontSize: 16 },
  fs18: { fontSize: 18 },
  fs20: { fontSize: 20 },
  fw700: { fontWeight: 700 },
  fw800: { fontWeight: 800 },
  p20: { padding: 20 },
  mt5: { marginTop: 5 },
  ml20: { marginLeft: 20 },
  mv10: { marginVertical: 10 },
  r10: {
    borderRadius: 10,
  },
  textDark: {
    color: '#000000',
  },
  textWhite: {
    color: '#ffffff',
  },
  textBlue: {
    color: '#192F54',
  },
  textGray: {
    color: '#9B9B9B',
  },
  textRed: {
    color: '#B53133',
  },
  textDarkGray: { color: '#6e6e6e' },
  bgRed: {
    backgroundColor: '#ffdad6',
  },
  bgDarkRed: {
    backgroundColor: '#B53133',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
  },
  bgGray: {
    backgroundColor: '#f5f4f4ff',
  },
  bgLightGray: {
    backgroundColor: '#f0f0f0',
  },
  elevation3: { elevation: 3 },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: { display: 'flex', flexDirection: 'row' },
  itemsCenter: { alignItems: 'center' },
  justifyCenter: { justifyContent: 'center' },
  h60w60: {
    height: 60,
    width: 60,
  },

  headerContainer: {
    height: 200,
    paddingVertical: 40,
    paddingHorizontal: 20,
    position: 'relative',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  welconeText: { color: '#fff', fontSize: 16, fontWeight: 500, marginTop: 5 },
  courseWrapper: {
    marginTop: 75,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  lastActivityCardWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastActivityCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B53133',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  lastAcitivityTextContainer: {
    width: '55%',
    marginHorizontal: 15,
  },
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
  previewDiagonalLabelText: { color: '#fff', fontWeight: 700 },
  enrollBtn: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#B53133',
    padding: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  previewCardImage: { height: 90, width: 90 },
});
