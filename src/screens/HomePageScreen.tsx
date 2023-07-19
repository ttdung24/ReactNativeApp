import { Layout} from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef }  from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './UserScreen';
import HomeScreen from './HomeScreen';
import Icon, { Icons } from '../components/Icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import AddTodoScreen from './AddTodoScreen';

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: HomeScreen },
  { route: 'Like', label: 'Like', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline', component: HomeScreen },
  { route: 'Search', label: 'Search', type: Icons.MaterialCommunityIcons, activeIcon: 'timeline-plus', inActiveIcon: 'timeline-plus-outline', component: AddTodoScreen },
  { route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: UserScreen },
]

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);

  useEffect(() => {
    if (focused && viewRef.current != null) {
      viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
    } else {
      viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1: {scale: 1, rotate: '0deg'}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? Colors.primary : Colors.primaryLite} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

const HomePageScreen = (props: any) => {
  const insets = useSafeAreaInsets();

  const { navigation } = props;
  
  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style='auto' />
      
      <Tab.Navigator 
        screenOptions={({ route }) => ({
            headerShown: false,
        })}
        
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
      
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default HomePageScreen;
