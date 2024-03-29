import * as React from 'react';

import {
  AnimalStackParamList,
  ForumStackParamList,
  PDFStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps
} from '../types';
import { ColorSchemeName, Pressable } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';

import AboutScreen from '../screens/AboutScreen';
import AnimalsListComponent from '../components/animals';
import BirdsListComponent from '../components/birds';
import BodyPartsListComponent from '../components/body_parts';
import CulturalItemsListComponent from '../components/cultural';
import FamilyTreeListComponent from '../components/family_tree';
/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import FoodListComponent from '../components/food';
import ForumCreate from '../components/forum/ForumCreate';
import ForumDetail from '../components/forum/ForumDetail';
import ForumLandingScreen from '../components/forum/ForumLanding';
import GreetingsListComponent from '../components/greetings';
import LinkingConfiguration from './LinkingConfiguration';
import MainPageMenuComponent from '../components/MainPageMenuComponent';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import NumbersListComponent from '../components/numbers';
import PDFScreen from '../screens/PDFScreen';
import PDFScreenDetail from '../screens/PDFScreen/PDFScreenDetail';
import ProfileScreen from '../screens/ProfileScreen';
import TreesAndEnvironmentListComponent from '../components/trees_and_environment';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useColorScheme from '../hooks/useColorScheme';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const AnimalStack = createNativeStackNavigator<AnimalStackParamList>();
const PDFStack = createNativeStackNavigator<PDFStackParamList>();

const ForumStack = createNativeStackNavigator<ForumStackParamList>();

function ForumNavigator() {
  return (
    <ForumStack.Navigator
      initialRouteName='ForumMain'
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <ForumStack.Screen
        name='ForumMain'
        component={ForumLandingScreen}
        options={{ title: 'Yiakunte App Forum', headerShown: false }}
      />
      <ForumStack.Screen name='ForumDetail' component={ForumDetail} />
      <ForumStack.Screen name='ForumCreate' component={ForumCreate} />
    </ForumStack.Navigator>
  );
}

function AnimalNavigator() {
  return (
    <AnimalStack.Navigator
      initialRouteName='Main'
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <AnimalStack.Screen
        name='Main'
        component={MainPageMenuComponent}
        options={{ title: 'Yiakunte App', headerShown: false }}
      />

      <AnimalStack.Screen name='Animals' component={AnimalsListComponent} />

      <AnimalStack.Screen name='Food' component={FoodListComponent} />
      <AnimalStack.Screen name='BodyParts' component={BodyPartsListComponent} />
      <AnimalStack.Screen
        name='FamilyTree'
        component={FamilyTreeListComponent}
      />
      <AnimalStack.Screen
        name='CulturalItems'
        component={CulturalItemsListComponent}
      />
      <AnimalStack.Screen
        name='TreesAndEnvironment'
        component={TreesAndEnvironmentListComponent}
      />
      <AnimalStack.Screen name='Birds' component={BirdsListComponent} />

      <AnimalStack.Screen name='Numbers' component={NumbersListComponent} />
      <AnimalStack.Screen name='Greetings' component={GreetingsListComponent} />
    </AnimalStack.Navigator>
  );
}

function PDFNavigator() {
  return (
    <PDFStack.Navigator
      initialRouteName='PDFHome'
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <PDFStack.Screen
        name='PDFHome'
        component={PDFScreen}
        options={{ title: 'Yiakunte Documents', headerShown: false }}
      />

      <PDFStack.Screen name='PDFDetail' component={PDFScreenDetail} />
    </PDFStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#47d6b6'
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={AnimalNavigator}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Yiakunte App',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />
        })}
      />
      {/* <BottomTab.Screen
        name='Audio'
        component={AboutScreen}
        options={{
          title: 'Audio',
          tabBarIcon: ({ color }) => <TabBarIcon name='music' color={color} />
        }}
      /> */}

      <BottomTab.Screen
        name='PDFs'
        component={PDFNavigator}
        options={{
          //title: 'PDFs',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='file-pdf-o' color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name='Forum'
        component={ForumNavigator}
        options={({ navigation }: RootTabScreenProps<'Forum'>) => ({
          title: 'Yiaku Forum',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='users' color={color} />
        })}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          title: 'Your Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
