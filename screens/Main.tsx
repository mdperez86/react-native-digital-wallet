import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home, Scan} from './main';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, ICONS} from '../constants';
import Svg, {Path} from 'react-native-svg';

const Tab = createBottomTabNavigator();

export function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: getTabBarIcon(ICONS.more),
          tabBarButton: getTabBarButton(),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarIcon: getTabBarIcon(ICONS.scan),
          tabBarButton: getTabBarButton(),
        }}
      />
      <Tab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: getTabBarIcon(ICONS.user),
          tabBarButton: getTabBarButton(),
        }}
      />
    </Tab.Navigator>
  );

  function getTabBarIcon(source: ImageSourcePropType) {
    return function tabBarIconHome({focused}: any) {
      const tintColor = focused ? COLORS.white : COLORS.secondary;
      return <Image source={source} style={[styles.tabBarIcon, {tintColor}]} />;
    };
  }

  function getTabBarButton() {
    return function tabBarButton(props: BottomTabBarButtonProps) {
      return <TabBarButton {...props} />;
    };
  }
}

export default Main;

function TabBarButton({
  accessibilityLabel,
  accessibilityState,
  children,
  onPress,
}: BottomTabBarButtonProps) {
  const isSelected = accessibilityState?.selected ?? false;
  return isSelected ? (
    <View style={styles.tabBarButtonSelected}>
      <View style={styles.tabBarButtonSelectedWrapper}>
        <View style={styles.tabBarButtonSelectedSides} />
        <Svg width={75} height={64} viewBox="0 0 75 64">
          <Path
            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
            fill={COLORS.white}
          />
        </Svg>
        <View style={styles.tabBarButtonSelectedSides} />
      </View>
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        style={styles.tabBarButtonSelectedTouchable}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      style={styles.tabBarButtonTouchable}
      activeOpacity={1}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 25,
    height: 25,
  },
  tabBarStyle: {
    elevation: 0,
    backgroundColor: COLORS.transparent,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarButtonSelected: {
    flex: 1,
    alignItems: 'center',
  },
  tabBarButtonSelectedWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  tabBarButtonSelectedSides: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabBarButtonSelectedTouchable: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabBarButtonTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
  },
});
