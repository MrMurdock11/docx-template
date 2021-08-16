import { readFileSync, writeFileSync } from "fs";
import path from "path";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";

const main = () => {
	const template = `${process.cwd()}/templates/template.docx`;
	console.log(template);
	const zip = new PizZip(readFileSync(path.resolve(__dirname, "templates/template.docx"), "binary"));
	const doc = new DocxTemplater(zip);
	doc.setData({
		lastName: "Мамбетов",
		firstName: "Азамат"
	});

	doc.render();

	const buffer = doc.getZip().generate({ type: 'nodebuffer' });

	writeFileSync(path.resolve(__dirname, "my.document.docx"), buffer);
}

main();