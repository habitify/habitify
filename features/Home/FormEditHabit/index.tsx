import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { HabitContext } from "@/services/context/HabitsContext";
import { Day, Habit } from "@/types/habits";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { t } from "i18next";
import moment from "moment";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, ScrollView, Switch, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { ColorButton } from "./ColorButton";
import { DayField } from "./DayInput";
import { GoalField } from "./GoalField";
import { IconBox } from "./IconBox";
import { Colum, Divider, Form, Row, SendButton } from "./styled";

export const FormEditHabit: React.FC<Habit> = ({ id, name, description, icon, color, requires_goal, goal, measure, frequencies, reminders, start_time }) => {
	const theme = useTheme();
	//@ts-ignore
	const { editHabit } = useContext(HabitContext);


	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<Habit>({
		defaultValues: {
			name: name,
			description: description,
			icon: icon,
			color: color,
			requires_goal: requires_goal,
			goal: goal,
			measure: measure,
			frequencies: frequencies,
			reminders: reminders,
			start_time: start_time,
		},
	});

	const showTimePicker = () => {
		const date = moment(
			`${moment().format("YYYY-MM-DD")} ${watch("start_time")}`,
			"YYYY-MM-DD HH:mm",
		);
		DateTimePickerAndroid.open({
			value: date.toDate(),
			onChange: (event, date) =>
				setValue("start_time", moment(date).format("HH:mm")),
			mode: "time",
			maximumDate: new Date(),
			positiveButton: {
				label: t("accept"),
			},
			negativeButton: {
				label: t("cancel"),
				textColor: theme.colors.error,
			},
		});
	};

	const updateFrequencies = (day: Day) => {
		const frequencies = watch("frequencies");

		if (frequencies.includes(day)) {
			// Si el día ya está en la lista, eliminarlo
			const updatedFrequencies = frequencies.filter((d) => d !== day);
			setValue("frequencies", updatedFrequencies);
		} else {
			// Si el día no está en la lista, agregarlo
			const updatedFrequencies = [...frequencies, day];
			setValue("frequencies", updatedFrequencies);
		}
	};

	const onSubmit = async (data: Habit) => {
		const habitId = id ? id : ''
		editHabit(habitId, data);
	};

	return (
		<BottomSheetModalProvider>
			<Form>
				<ScrollView>
					<Row>
						<Text variant="subtitle_medium">{t("name")}</Text>
						<TextInput
							name="name"
							placeholder={t("placeholder.habit_name")}
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.name"),
								},
							}}
						/>
					</Row>

					<Row>
						<Text variant="subtitle_medium">{t("description")}</Text>
						<TextInput
							name="description"
							placeholder={t("placeholder.description")}
							control={control}
							multiline={true}
							numberOfLines={5}
							style={{ height: 50 }}
						/>
					</Row>

					<Divider />

					<Colum>
						<Controller
							name="icon"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.icon"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<IconBox
									value={value}
									onChange={onChange}
									error={error ? true : false}
								/>
							)}
						/>

						<Controller
							name="color"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.color"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<ColorButton
									value={value}
									onChange={onChange}
									error={error ? true : false}
								/>
							)}
						/>
					</Colum>

					<Divider />

					<Colum style={{ justifyContent: "space-between" }}>
						<Text variant="subtitle_medium">{t("need-goal")}</Text>
						<Controller
							name="requires_goal"
							control={control}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<Switch
									trackColor={{ false: "#767577", true: theme.colors.primary }}
									thumbColor="#f4f3f4"
									ios_backgroundColor="#3e3e3e"
									onValueChange={(value) => onChange(value)}
									value={value}
									style={{ marginLeft: 15 }}
								/>
							)}
						/>
					</Colum>

					{watch("requires_goal") ? (
						//@ts-ignore
						<GoalField
							control={control}
							requires_goal={watch("requires_goal")}
						/>
					) : <></>}

					<Divider />

					<Colum style={{ justifyContent: "space-between" }}>
						<Text variant="subtitle_medium">{t("define-time")}</Text>
						<Controller
							name="start_time"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.start_time"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => {
								const date = moment(
									`${moment().format("YYYY-MM-DD")} ${value}`,
									"YYYY-MM-DD HH:mm",
								);

								return (
									<>
										{Platform.OS === "ios" ? (
											<RNDateTimePicker
												value={date.toDate()}
												onChange={(event, date) =>
													onChange(moment(date).format("HH:mm"))
												}
												mode="time"
											/>
										) : (
											<TouchableOpacity onPress={showTimePicker}>
												<Text>{watch("start_time")}</Text>
											</TouchableOpacity>
										)}
									</>
								);
							}}
						/>
					</Colum>
					<Divider />

					<DayField control={control} updateFrequencies={updateFrequencies} />

					<Divider />

					<Colum style={{ justifyContent: "space-between" }}>
						<Text variant="subtitle_medium">{t("notify")}</Text>
						<Controller
							name="reminders"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.icon"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<Switch
									trackColor={{ false: "#767577", true: theme.colors.primary }}
									thumbColor="#f4f3f4"
									ios_backgroundColor="#3e3e3e"
									onValueChange={(value) => onChange(value)}
									value={value}
									style={{ marginLeft: 15 }}
								/>
							)}
						/>
					</Colum>

					<SendButton onPress={handleSubmit(onSubmit)}>
						<Text
							variant="body_large"
							style={{ color: theme.colors.background }}
						>
							{t("edit-habit")}
						</Text>
					</SendButton>
				</ScrollView>
			</Form>
		</BottomSheetModalProvider>
	);
};
