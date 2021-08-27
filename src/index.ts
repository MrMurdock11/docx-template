import chalk from "chalk";
import server from "./server";
import internalIp from "internal-ip";

const HOSTNAME = "0.0.0.0";
const port: number = Number.parseInt(process.env.PORT ?? "1000", 10);

server.listen(port, HOSTNAME, async () => {
	console.log(
		chalk.green(
			`⚡[server]: listening on`,
			chalk.magenta(`http://localhost:${port}`),
			await internalIp.v4()
		)
	);
});
