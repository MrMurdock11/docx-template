import { Router } from "express";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";

const router = Router();

const generate = (firstName: string, lastName: string) => {
	const templatePath = path.join(process.cwd(), "/templates/template.docx");
	const zip = new PizZip(readFileSync(templatePath, "binary"));
	const doc = new DocxTemplater(zip);
	doc.setData({
		lastName,
		firstName,
	});

	doc.render();

	const buffer = doc.getZip().generate({ type: 'nodebuffer' });

	mkdirSync(path.join(process.cwd(), "output"));
	writeFileSync(path.join(process.cwd(), "output/my.document.docx"), buffer);
}

router.post("/download", (req, res) => {
	const { lastname, firstname } = req.body;

	generate(firstname, lastname);

	res.download(path.join(process.cwd(), "output/my.document.docx"));
});

export default router;