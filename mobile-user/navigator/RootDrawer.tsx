import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabsNavigator from './BottomTabsNavigator';

const Drawer = createDrawerNavigator();

export default function RootDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: 300,
        },
        drawerItemStyle: {
          borderRadius: 10,
          marginHorizontal: 5,
          paddingLeft: 5,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
