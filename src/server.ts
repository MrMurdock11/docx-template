import "core-js/stable";
import "regenerator-runtime/runtime";
import "dotenv-flow/config";
import express, { urlencoded, json } from "express";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

export default server;
