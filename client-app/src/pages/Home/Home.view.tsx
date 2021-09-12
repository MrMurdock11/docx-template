import styles from "./Home.style.css";

import React, { useState } from "react";
import { HomeProps } from "./Home";
import { Button, Container, Form, Icon, Step } from "semantic-ui-react";

export const HomeView: React.FC<HomeProps> = props => {
	const [step, setStep] = useState<
		"financial-manager" | "debtor" | "courtOfLaw"
	>("financial-manager");
	const steps: ("financial-manager" | "debtor" | "courtOfLaw")[] = [
		"financial-manager",
		"debtor",
		"courtOfLaw",
	];

	const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
	const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);

	return (
		<Container className={styles.container}>
			<Step.Group attached="top">
				<Step active>
					<Icon name="id card" />
					<Step.Content>
						<Step.Title>{"Финансовый управляющий"}</Step.Title>
						<Step.Description>
							{"Данные фин. управляющего"}
						</Step.Description>
					</Step.Content>
				</Step>
				<Step disabled>
					<Icon name="user" />
					<Step.Content>
						<Step.Title>{"Должник"}</Step.Title>
						<Step.Description>{"Данные должника"}</Step.Description>
					</Step.Content>
				</Step>
				<Step disabled>
					<Icon name="building" />
					<Step.Content>
						<Step.Title>{"Суд"}</Step.Title>
						<Step.Description>
							{"Информация о суде"}
						</Step.Description>
					</Step.Content>
				</Step>
			</Step.Group>

			{step === "financial-manager" && (
				<div data-type="financial-manager">
					<Form>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Ф.И.О"
								value="Астахов Сергей Михайлович"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Адрес"
								value="г. Москва, ул. Пушкина 99"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Телефон"
								value="817.594.3868 x409"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Email"
								value="Brigitte.Swaniawski14@hotmail.com"
							/>
						</Form.Group>
					</Form>
				</div>
			)}

			{step === "debtor" && (
				<div data-type="debtor">
					<Form>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Ф.И.О"
								value="Иванов Петр Петрович"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="СНИЛС"
								value="г. Москва, ул. Пушкина 99"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="ИНН"
								value="817.594.3868 x409"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Место рождения"
								value="Brigitte.Swaniawski14@hotmail.com"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Адрес регистрации"
								value="Brigitte.Swaniawski14@hotmail.com"
							/>
						</Form.Group>
					</Form>
				</div>
			)}

			{step === "courtOfLaw" && (
				<div data-type="court-of-law">
					<Form>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Наименование"
								value="Астахов Сергей Михайлович"
							/>
						</Form.Group>
						<Form.Group widths={2}>
							<Form.Input
								fluid
								label="Адрес"
								value="г. Москва, ул. Пушкина 99"
							/>
						</Form.Group>
					</Form>
				</div>
			)}

			<Button
				icon
				labelPosition="left"
				disabled={isPrevBtnDisabled}
				onClick={() => {
					const index = steps.indexOf(step);
					const prevIndex = index - 1;

					if (prevIndex === 1) {
						setIsPrevBtnDisabled(true);
					}

					if (prevIndex < steps.length) {
						setIsNextBtnDisabled(false);
					}

					setStep(steps[prevIndex]);
				}}
			>
				<Icon name="arrow left" />
				{"Назад"}
			</Button>

			<Button
				icon
				labelPosition="right"
				disabled={isNextBtnDisabled}
				onClick={() => {
					const index = steps.indexOf(step);
					const nextIndex = index + 1;

					if (steps.length - 1 === nextIndex) {
						setIsNextBtnDisabled(true);
					}

					if (nextIndex > 0) {
						setIsPrevBtnDisabled(false);
					}

					setStep(steps[nextIndex]);
				}}
			>
				<Icon name="arrow right" />
				{"Далее"}
			</Button>
		</Container>
	);
};
