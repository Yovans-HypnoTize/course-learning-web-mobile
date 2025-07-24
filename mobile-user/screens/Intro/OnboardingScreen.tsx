import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ReuGradientButton from '../../components/ReuGradientButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#ffffff', white: '#fff', dark: 'black' };

const slides = [
  {
    id: 1,
    image: require('../../assets/intro-screen/introScreenImg1.png'),
    title: 'Learn Japanese',
    subTitle:
      'Master every level with structured video lessons, designed for smooth, step-by-step progress',
  },
  {
    id: 2,
    image: require('../../assets/intro-screen/introScreenImg2.png'),
    title: 'Take Quiz',
    subTitle:
      'Challenge yourself with lesson-end quizzes. Score maximum marks to unlock the next stage!',
  },
  {
    id: 3,
    image: require('../../assets/intro-screen/introScreenImg3.png'),
    title: 'Clarify Doubts',
    subTitle:
      'Raise a query anytime — our language pros are here to clarify all your Japanese learning doubts',
  },
];

const Slide = ({ item }) => {
  return (
    <View style={styles.slidesWrapper}>
      {/* <Image
        source={require('../../assets/intro-screen/introScreenHeaderImage_1.png')}
        style={styles.slideTopImage}
      /> */}
      <Image source={item.image} style={styles.slidesImage} />
      {item.title && (
        <Text style={[styles.title, { color: '#000' }]}>{item.title}</Text>
      )}
      <Text style={[styles.subTitle]}>{item.subTitle}</Text>
    </View>
  );
};

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = () => {
    return (
      <View style={styles.footerWrapper}>
        <View style={styles.footerContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                // eslint-disable-next-line react-native/no-inline-styles
                currentSlideIndex === index && {
                  backgroundColor: '#B53133',
                },
              ]}
            />
          ))}
        </View>
        <View style={styles.slidesBtnWrapper}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={styles.getStartedBtnContainer}>
              <ReuGradientButton
                label="GET STARTED"
                onPress={() => navigation.replace('Login')}
                gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
              />
            </View>
          ) : (
            <View style={styles.getStartedBtnContainer}>
              <ReuGradientButton
                label="Next"
                onPress={goNextSlide}
                gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
              />
            </View>
            // <View>
            //   <View style={styles.NextWrapper}>

            //     <TouchableOpacity onPress={goNextSlide}>
            //       <Ionicons
            //         name={'arrow-forward-circle'}
            //         size={50}
            //         color={'#B53133'}
            //       />
            //     </TouchableOpacity>
            //     {/* <View
            //     style={[styles.btn, styles.nextBtnContainer]}
            //   >

            //      <ReuGradientButton
            //     label="Next"
            //     onPress={goNextSlide}
            //     gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
            //     btnStyles={styles.nextBtn}
            //   />
            //   </View> */}
            //   </View>
            // </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skipSlides = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)']}
      // colors={['#FCE7F3', '#FAF5FF', '#EFF6FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.screenContainer}
    >
      {currentSlideIndex !== slides.length - 1 && (
        <TouchableOpacity
          style={[styles.btn, styles.skipBtnContainer]}
          onPress={skipSlides}
        >
          <Text style={styles.skipBtnText}>Skip</Text>
          <MaterialIcons
            name={'keyboard-double-arrow-right'}
            size={23}
            color={'#000'}
          />
        </TouchableOpacity>
      )}
      <StatusBar backgroundColor={COLORS.primary} />

      <FlatList
        ref={ref}
        data={slides}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="start"
        contentContainerStyle={{ height: height * 0.75 }}
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer />
    </LinearGradient>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  title: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: 'bold',
    // marginTop: 20,
    textAlign: 'center',
  },
  subTitle: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 400,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 23,
  },
  indicator: {
    height: 9,
    width: 9,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 50,
  },
  btn: {
    flex: 1,
    height: 60,
    // backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  skipBtnContainer: {
    position: 'absolute',
    top: 25,
    right: 10,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipBtnText: { fontWeight: 'bold', fontSize: 15, color: COLORS.dark },
  nextBtnContainer: { borderRadius: 5 },
  nextBtn: { width: 100, borderRadius: 15 },
  spacingView: { width: 15 },
  getStartedBtnContainer: { marginTop: 50 },
  slidesBtnWrapper: {
    marginVertical: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerWrapper: {
    height: height * 0.25,
    paddingHorizontal: 20,
  },
  slideTopImage: {
    position: 'absolute',
    height: '20%',
    width: '100%',
    resizeMode: 'contain',
    top: '8%',
    right: '-25%',
  },
  slidesImage: {
    height: 380,
    width: 320,
    resizeMode: 'contain',
    marginTop: '10%',
  },
  slidesWrapper: {
    position: 'relative',
    alignItems: 'center',
    width: width,
    paddingHorizontal: 20,
  },
});
