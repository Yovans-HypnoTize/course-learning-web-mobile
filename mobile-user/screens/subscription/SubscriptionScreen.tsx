import {
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
import ReuCard from '../../components/ReuCard';
import ReuGradientButton from '../../components/ReuGradientButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientHeader from '../../components/GradientHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCourseList, getPlansListByCourseId } from './subscriptionSlice';
import { useNavigation } from '@react-navigation/native';
import { getSubscriptionStatus } from '../home/homeSlice';
import { firstLetterToUppercase } from '../../utils/Utils';

type CourseLevelItem = {
  id: string;
  courseLevel: string;
};

type PlanItems = {
  id: string;
  planName: string;
  planDescription: string;
  price: string;
  planType: string;
};

const planItems: PlanItems[] = [];

const SubscriptionScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [selectedPlans, setSelectedPlans] = useState<
    {
      course: CourseLevelItem;
      plan: PlanItems;
    }[]
  >([]);

  const [plansByCourse, setPlansByCourse] = useState<{
    [courseId: string]: typeof planItems;
  }>({});
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const courseList = useAppSelector(state => state.subscription.courseList);
  const subscriptionStatus = useAppSelector(
    state => state.home.subscriptionStatus,
  );

  const safeSubscriptionStatus =
    subscriptionStatus?.data?.data?.subscriptionsStatus ?? false;

  const fetchPlansForCourse = async (courseId: any) => {
    const result = await dispatch(getPlansListByCourseId(courseId)).unwrap();
    const data = result?.data?.data ?? [];

    setPlansByCourse(prev => ({
      ...prev,
      [courseId]: data,
    }));
  };

  const handleCourseSelect = useCallback(async (courseId: string) => {
    if (selectedCourseId === courseId) {
      setSelectedCourseId(null);
      setSelectedPlans(prev => prev.filter(p => p.courseId !== courseId));
    } else {
      setSelectedCourseId(courseId);
      if (!plansByCourse[courseId]) {
        await fetchPlansForCourse(courseId);
      }
    }
  }, []);

  const handlePlanSelect = useCallback(
    (courseId: string, planId: string) => {
      const course = courseList?.data?.data?.find(
        (course: CourseLevelItem) => course.id === courseId,
      );
      const plan = plansByCourse[courseId]?.find(
        (plan: PlanItems) => plan.id === planId,
      );

      if (course && plan) {
        setSelectedPlans(prev => {
          const filtered = prev.filter(p => p.course.id !== courseId);
          return [...filtered, { course, plan }];
        });
      }
    },
    [courseList, plansByCourse],
  );

  const isCourseSelected = (courseId: string) =>
    selectedPlans.some(p => p.course.id === courseId);

  const isPlanSelected = (courseId: string, planId: string) =>
    selectedPlans.some(p => p.course.id === courseId && p.plan.id === planId);

  const getCourseNameById = (id: string): string => {
    return (
      courseList?.data?.data?.find(
        (course: CourseLevelItem) => course.id === id,
      )?.courseLevel || id
    );
  };

  useLayoutEffect(() => {
    dispatch(getCourseList());
    dispatch(getSubscriptionStatus());
  }, []);

  return (
    <View style={styles.containerWrapper}>
      <GradientHeader title="Subscription" returnPath="Home" />
      <ScrollView style={styles.container}>
        <ReuCard
          containerClass={{
            backgroundColor: '#B53133',
            paddingHorizontal: 15,
            paddingVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <View style={[styles.flex, styles.flexRow]}>
            <View
              style={[
                styles.flexRowCentered,
                styles.bgWhite,
                styles.h50w50,
                styles.r7,
              ]}
            >
              <Ionicons name={'alert'} size={25} color={'#B53133'} />
            </View>
            <View
              style={[
                styles.flex,
                styles.flexColumn,
                styles.justifyCenter,
                styles.ml15,
              ]}
            >
              <Text style={[styles.fw600, styles.textWhite]}>
                No active Plans
              </Text>
              <Text style={styles.textWhite}>Free lesson previews</Text>
            </View>
          </View>
        </ReuCard>

        {safeSubscriptionStatus && (
          <ReuCard
            containerClass={{
              paddingHorizontal: 15,
              paddingVertical: 20,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={[
                styles.flex,
                styles.flexRow,
                styles.itemsCenter,
                styles.justifyBetween,
              ]}
              onPress={() => {
                navigation.navigate('SubscribedPlans');
              }}
            >
              <Text style={styles.fw600}>Your Plans</Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={25}
                color={'#000'}
              />
            </TouchableOpacity>
          </ReuCard>
        )}

        <ReuCard
          containerClass={{
            marginHorizontal: 20,
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            style={[
              styles.flex,
              styles.flexRow,
              styles.justifyBetween,
              styles.itemsCenter,
              styles.ph15,
              styles.pv20,
            ]}
            onPress={() => {
              navigation.navigate('PaymentHistory');
            }}
          >
            <Text style={styles.fw600}>Payment history</Text>
            <Ionicons
              name={'chevron-forward-outline'}
              size={25}
              color={'#000'}
            />
          </TouchableOpacity>
        </ReuCard>

        <View style={[styles.bgBlue, styles.ph20, styles.pv20, styles.mv30]}>
          <Text
            style={[styles.textWhite, styles.mb12, styles.fw600, styles.fs16]}
          >
            Search plans
          </Text>
          <View style={[styles.bgWhite, styles.r5, styles.p10]}>
            <Text>Select courses you’d like to learn:</Text>
            <View style={styles.courseContentWrapper}>
              {courseList?.data?.data?.map((course: CourseLevelItem) => (
                <TouchableOpacity
                  key={course.id}
                  style={[
                    styles.courseContentContainer,
                    isCourseSelected(course.id) && styles.bgLightPink,
                  ]}
                  onPress={() => handleCourseSelect(course.id)}
                >
                  <Text
                    style={[
                      styles.courseTitle,
                      isCourseSelected(course.id) && styles.textRed,
                    ]}
                  >
                    {course.courseLevel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.flexRowCentered}>
              <View style={[styles.w100, styles.h1, styles.bgRose]} />
              <Text style={styles.mh10}>Or</Text>
              <View style={[styles.w100, styles.h1, styles.bgRose]} />
            </View>
            <View style={[styles.flexRowCentered]}>
              <TouchableOpacity
                style={[
                  styles.bgLightWhite,
                  styles.mv20,
                  styles.pv10,
                  styles.r5,
                  styles.w85Percent,
                ]}
              >
                <Text style={[styles.courseTitle]}>N5 - N1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <>
          {selectedCourseId && (
            <ReuCard
              containerClass={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                marginHorizontal: 20,
              }}
            >
              <View style={styles.planContentWrapper}>
                <Text
                  style={[
                    styles.textRed,
                    styles.mb10,
                    styles.fw700,
                    styles.fs18,
                  ]}
                >
                  {getCourseNameById(selectedCourseId)}
                </Text>
                {(plansByCourse[selectedCourseId] || []).map(plan => {
                  const isSelected = isPlanSelected(selectedCourseId, plan.id);
                  return (
                    <TouchableOpacity
                      key={plan.id}
                      onPress={() =>
                        handlePlanSelect(selectedCourseId, plan.id)
                      }
                      style={[styles.planContentContainer]}
                    >
                      <View
                        style={[
                          styles.flex,
                          styles.flexRow,
                          styles.itemsCenter,
                        ]}
                      >
                        <View
                          style={[
                            styles.bgWhite,
                            styles.h20w20,
                            styles.r50,
                            styles.flex,
                            styles.justifyCenter,
                            styles.itemsCenter,
                            styles.mr10,
                            isSelected && styles.bgWhite,
                            isSelected && styles.borderRed,
                            isSelected && styles.borderWidth2,
                          ]}
                        >
                          <View
                            style={[
                              styles.bgLightWhite,
                              isSelected && styles.bgRed,
                              isSelected && styles.h10w10,
                              isSelected && styles.r50,
                            ]}
                          />
                        </View>

                        <View>
                          <Text
                            style={[
                              styles.planTitle,
                              isSelected && styles.textRed,
                            ]}
                          >
                            {firstLetterToUppercase(plan.planName)}
                          </Text>
                          <Text style={[styles.planDescription]}>
                            {firstLetterToUppercase(plan.planDescription)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.flex,
                          styles.flexColumn,
                          styles.justifyCenter,
                        ]}
                      >
                        <Text
                          style={[
                            styles.planTitle,
                            isSelected && styles.textRed,
                          ]}
                        >
                          ₹ {plan.price}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ReuCard>
          )}

          <View style={styles.payBtnContainer}>
            <ReuGradientButton
              label="Make Payment"
              onPress={() => {
                console.log('selected plans:', selectedPlans);
                if (selectedPlans.length > 0) {
                  navigation.navigate('Payment', {
                    selectedPlans: selectedPlans,
                  });
                } else {
                  return;
                }
              }}
              gradientColors={['#B53133', '#B53133']}
            />
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  containerWrapper: { flex: 1 },
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  textWhite: { color: '#ffffff' },
  textBlue: {
    color: '#3B82F6',
  },
  textBold: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textGeneral: {
    color: '#1F2937',
    fontWeight: 500,
    fontSize: 16,
  },
  textGray: {
    color: '#4B5563',
    fontSize: 16,
  },
  textRed: {
    color: '#B53133',
  },
  borderRed: {
    borderColor: '#B53133',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
  },
  bgLightWhite: {
    backgroundColor: '#F5F5F5',
  },
  bgRed: {
    backgroundColor: '#B53133',
  },
  bgRose: { backgroundColor: '#D9D9D9' },
  bgLightPink: { backgroundColor: '#f0d6d6' },
  bgBlue: {
    backgroundColor: '#002D62',
  },
  divider: {
    height: 1,
    marginHorizontal: 10,
    backgroundColor: 'rgba(75 ,85 ,99, 0.3)',
    marginVertical: 20,
  },
  fw700: { fontWeight: 700 },
  fw600: { fontWeight: 600 },
  fs16: { fontSize: 16 },
  fs18: { fontSize: 18 },
  mt5: { marginTop: 5 },
  ml15: { marginLeft: 15 },
  mr10: {
    marginRight: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  mb12: { marginBottom: 12 },
  mv20: {
    marginVertical: 20,
  },
  mv30: {
    marginVertical: 30,
  },
  mh10: {
    marginHorizontal: 10,
  },
  p10: {
    padding: 10,
  },
  pv10: {
    paddingVertical: 10,
  },
  ph15: { paddingHorizontal: 15 },
  ph20: { paddingHorizontal: 20 },
  pv20: { paddingVertical: 20 },
  r5: {
    borderRadius: 5,
  },
  r7: {
    borderRadius: 7,
  },
  r50: { borderRadius: 50 },
  h10w10: {
    height: 10,
    width: 10,
  },
  h1: {
    height: 1,
  },
  h20w20: {
    height: 20,
    width: 20,
  },
  h50w50: {
    height: 50,
    width: 50,
  },
  w85Percent: { width: '85%' },
  w100: { width: 100 },
  borderWidth2: {
    borderWidth: 2,
  },

  flex: { display: 'flex' },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  itemsCenter: { alignItems: 'center' },
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },

  //course content
  courseContentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  courseContentContainer: {
    width: '15%',
    height: 50,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  courseTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#9B9B9B',
  },

  //plan content
  planContentWrapper: {
    paddingHorizontal: 25,
    marginTop: 10,
    width: '100%',
  },
  planContentContainer: {
    width: '100%',
    marginBottom: 15,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: { fontWeight: 'bold', fontSize: 18 },
  planDescription: {
    color: '#6B7280',
    fontSize: 15,
  },

  payBtnContainer: { marginHorizontal: 20, marginVertical: 40 },
  flexRowCentered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
