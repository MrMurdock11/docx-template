import "core-js/stable";
import "regenerator-runtime/runtime";
import "dotenv-flow/config";
import express, { urlencoded, json } from "express";
import cors from "cors";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import { FinancialManagerDto } from "./models/financial-manager.dto";
import { DebtorDto } from "./models/debtor.dto";
import moment from "moment";
import { CourtOfLawDto } from "./models/court-of-law.dto";
import { incline } from "lvovich";

const app = express();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", (_, res) => {
	res.send("Осман ЛОХ!");
});

app.post("/generate", (req, res) => {
	const templatePath = path.join(
		process.cwd(),
		"/templates/request_payment.docx"
	);
	const zip = new PizZip(readFileSync(templatePath, "binary"));
	const doc = new DocxTemplater(zip);

	const { first, middle, last } = incline(
		{ first: "Осман", middle: "Артурович", last: "Мамбетов" },
		"genitive"
	);

	doc.setData({
		id: "А40-20515/2020",
		date: "24.08.2020",
		financialManager: {
			fullName: "Мамбетов Осман Артурович",
			fullNameGenitive: `${last} ${first} ${middle}`,
			initials: "Мамбетов О.А.",
			address: "г. Москва, ул. Сходненская 14",
			phone: "8-977-303-50-91",
			email: "osman322@gmail.com",
		} as FinancialManagerDto,
		debtor: {
			fullName: "Фокина Евгения Алексеевна",
			fullNameGenitive: "Фокиной Евгении Алексеевой",
			fullNameInstrumental: "Фокиной Евгенией Алексеевной",
			personalInsurancePolicyNumber: "123123123123123123", // СНИЛС
			individualTaxpayerNumber: "123123123123123", // ИНН
			birthday: "7 мая 1995",
			placeOfBirth: "г. Коломна, ул. Ленина 17 к. 1",
			registrationAddress: "г. Коломна, ул. Ленина 17 к. 1",
		} as DebtorDto,
		currentDate: moment().format("DD.MM.YYYY"),
		courtOfLaw: {
			title: "Арбитражный суд города Москвы",
			address: "г. Москва, ул. Тверская 12",
		} as CourtOfLawDto,
	});

	doc.render();

	const buffer = doc.getZip().generate({ type: "nodebuffer" });

	const outputDirectory = path.join(process.cwd(), "output");

	if (!existsSync(outputDirectory)) {
		mkdirSync(path.join(process.cwd(), "output"));
	}

	writeFileSync(path.join(process.cwd(), "output/my.document.docx"), buffer);

	res.status(200).send();
});

export default app;
