/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PlatformPressable, Text } from '@react-navigation/elements';
import { View } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import AccountScreen from '../screens/account/AccountScreen';
import CourseScreen from '../screens/course/CourseScreen';
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';
import TicketScreen from '../screens/ticket/TicketScreen';
import LinearGradient from 'react-native-linear-gradient';
import StreamVideoScreen from '../screens/course/StreamVideoScreen';
import LessonsScreen from '../screens/course/LessonsScreen';
import PaymentScreen from '../screens/subscription/PaymentScreen';
import PaymentHistoryScreen from '../screens/subscription/PaymentHistoryScreen';
import PreviewLesson from '../screens/home/PreviewLesson';
import SubscribedPlansScreen from '../screens/subscription/SubscribedPlansScreen';
import ManagePlanScreen from '../screens/subscription/ManagePlanScreen';
import RenewPlanScreen from '../screens/subscription/RenewPlanScreen';
import TicketForm from '../screens/ticket/TicketForm';
import SpecificTicketScreen from '../screens/ticket/SpecificTicketScreen';

const Tab = createBottomTabNavigator();

type MyTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const hiddenTabs = [
  'StreamVideo',
  'Lessons',
  'Payment',
  'PaymentHistory',
  'PreviewLesson',
  'SubscribedPlans',
  'ManagePlan',
  'RenewPlan',
  'TicketForm',
  'SpecificTicket',
];

function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const isHidden = hiddenTabs.includes(route.name);

        const icon =
          options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? '#B53133' : 'gray',
            size: 24,
          });

        if (isHidden) {
          return;
        } else {
          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                paddingBottom: 10,
              }}
            >
              <></>
              {isFocused ? (
                // <LinearGradient
                //   colors={['#EC4899', '#B53133']}
                //   start={{ x: 0, y: 0 }}
                //   end={{ x: 1, y: 1 }}
                //   style={{
                //     width: 50,
                //     height: 50,
                //     borderRadius: 15,
                //     alignItems: 'center',
                //     justifyContent: 'center',
                //     marginTop: 25,
                //     bottom: 30,
                //     position: 'absolute',
                //   }}
                // >
                //   {icon}
                // </LinearGradient>
                <View style={{ marginBottom: 10 }}>{icon}</View>
              ) : (
                <View style={{ marginBottom: 10 }}>{icon}</View>
              )}

              <Text
                style={{
                  color: isFocused ? '#B53133' : colors.text,
                  fontSize: 12,
                  // position: 'absolute',
                  // bottom: 10,
                }}
              >
                {label}
              </Text>
            </PlatformPressable>
          );
        }
      })}
    </View>
  );
}

function getTabBarIcon(
  routeName: string,
  focused: boolean,
  color: string,
  size: number,
) {
  let iconName = '';

  switch (routeName) {
    case 'Home':
      iconName = 'home' ;
      // iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Ticket':
      iconName =  'chatbubble-ellipses';
      // iconName = focused
      //   ? 'chatbubble-ellipses'
      //   : 'chatbubble-ellipses-outline';
      break;
    case 'Course':
      iconName = 'book';
      // iconName = focused ? 'book' : 'book-outline';
      break;
    case 'Subscription':
      iconName =  'ribbon';
      // iconName = focused ? 'ribbon' : 'ribbon-outline';
      break;
    case 'Account':
      iconName = 'person';
      // iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Course"
        component={CourseScreen}
        options={{ headerTitle: 'Course' }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          headerTitle: 'Lessons',
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="StreamVideo"
        component={StreamVideoScreen}
        options={{
          title: 'StreamVideo',
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{ headerTitle: 'Ticket' }}
      />
      <Tab.Screen
        name="TicketForm"
        component={TicketForm}
        options={{ headerTitle: 'Ticket Form' }}
      />
      <Tab.Screen
        name="SpecificTicket"
        component={SpecificTicketScreen}
        options={{ headerTitle: 'Specific Ticket' }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
      <Tab.Screen
        name="PreviewLesson"
        component={PreviewLesson}
        options={{ headerTitle: 'Home' }}
      />
      <Tab.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{ headerTitle: 'Subscription' }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerTitle: 'Payment' }}
      />
      <Tab.Screen
        name="PaymentHistory"
        component={PaymentHistoryScreen}
        options={{ headerTitle: 'Payment History' }}
      />
      <Tab.Screen
        name="SubscribedPlans"
        component={SubscribedPlansScreen}
        options={{ headerTitle: 'Your Plans' }}
      />
      <Tab.Screen
        name="ManagePlan"
        component={ManagePlanScreen}
        options={{ headerTitle: 'Manage Plans' }}
      />
      <Tab.Screen
        name="RenewPlan"
        component={RenewPlanScreen}
        options={{ headerTitle: 'Renew Plans' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerTitle: 'Account' }}
      />
    </Tab.Navigator>
  );
}
