import { Text } from "@/components/Text";
import { useProfile } from "@/services/context/ProfileContext";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { t } from "i18next";
import { toLower } from "lodash";
import { Avatar, Bar, IconButton, UserBox } from "./styled";
//@ts-ignore
import moment from "moment/min/moment-with-locales.min.js";
import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

export const BarUser = () => {
	const theme = useTheme();
	const today = moment();

	const {
		profile: { name, picture },
	} = useProfile();

	return (
		<Bar>
			<UserBox>
				<Avatar
					source={
						picture
							? { uri: picture }
							: require("@/assets/images/no-profile.png")
					}
				/>
				<View>
					<Text variant="subtitle_medium">
						{t("welcome")}, {name}!
					</Text>
					<Text style={{ marginTop: 1 }}>{`${t("today")}  ${t(
						toLower(today.format("dddd")),
					)}`}</Text>
				</View>
			</UserBox>
			<Link href="/add-habit" asChild>
				<IconButton>
					<AntDesign name="plus" color={theme.colors.background} size={25} />
				</IconButton>
			</Link>
		</Bar>
	);
};
