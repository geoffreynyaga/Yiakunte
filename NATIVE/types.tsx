/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Audio: undefined;
  Profile: undefined;
  Forum: undefined;
};
export type AnimalStackParamList = {
  Animals: undefined;
  AnimalDetail: undefined;
  Main: undefined;
  Food: undefined;
  BodyParts: undefined;
  FamilyTree: undefined;
  CulturalItems: undefined;
};
export type ForumStackParamList = {
  Forum: undefined;
  ForumDetail: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface YiakuListItem {
  english_name: string;
  yiakunte: string;
  image: string | null;
  audio: string | null;
  active: boolean;
}
