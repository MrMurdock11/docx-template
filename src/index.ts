import chalk from "chalk";
import server from "./server";

const HOSTNAME = "0.0.0.0";
const port: number = Number.parseInt(process.env.PORT ?? "1000", 10);

server.listen(port, HOSTNAME, () => {
	console.log(
		chalk.green(
			`⚡[server]: listening on`,
			chalk.magenta(`http://localhost:${port}`)
		)
	);
});
