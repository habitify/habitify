import { TabBar } from "@/components/TabBar";
import * as Device from "expo-device";
import {
	AndroidImportance,
	Subscription,
	addNotificationReceivedListener,
	addNotificationResponseReceivedListener,
	getExpoPushTokenAsync,
	getPermissionsAsync,
	removeNotificationSubscription,
	requestPermissionsAsync,
	setNotificationChannelAsync,
	setNotificationHandler,
} from "expo-notifications";
import { Tabs } from "expo-router";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";

export default function TabLayout() {
	const theme = useTheme();
	const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token),
		);

		notificationListener.current = addNotificationReceivedListener(
			(notification) => {},
		);

		responseListener.current = addNotificationResponseReceivedListener(
			(response) => {},
		);

		return () => {
			if (notificationListener.current) {
				removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
				headerStyle: {
					backgroundColor: theme.colors.background,
					shadowColor: "transparent",
					elevation: 0,
				},
				headerTitleStyle: { color: theme.colors.text },
			}}
		>
			<Tabs.Screen name="index" options={{ headerShown: false }} />

			<Tabs.Screen name="progress" options={{ title: t("progress") }} />

			<Tabs.Screen name="profile" />
		</Tabs>
	);
}

setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

async function registerForPushNotificationsAsync() {
	let token;

	if (Device.isDevice) {
		const { status: existingStatus } = await getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		token = (await getExpoPushTokenAsync()).data;
	} else {
	}

	if (Platform.OS === "android") {
		await setNotificationChannelAsync("habits", {
			name: "habits",
			showBadge: true,
			importance: AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FE9018",
		});
	}
	return token;
}
