import routes from "./routes";
import express, { json, urlencoded } from "express";
import pug from "pug";

const PORT = 3000;
const app = express();

// initialize
app.set("view engine", "pug");
app.set("views", "./public/views");
app.engine("pug", (pug as any).__express);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/", express.static(`${process.cwd()}/public`));

// use routes
app.use("/api", routes.api);

app.get("/", (_, res) => {
	res.render("index");
});

app.listen(PORT, () => {
	console.log("http://localhost:3000");
});