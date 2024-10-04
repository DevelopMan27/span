import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { HomeView } from "./components/HomeView";
import { RootStackParamList } from "../../type";
import { RouteNames } from "../../navigation/routesNames";

export interface HomeProps
  extends NativeStackScreenProps<RootStackParamList, RouteNames.HomeScreen> {}

export default function Home(props: HomeProps) {
  return <HomeView />;
}
