import {range} from "lodash/fp";
import {spawn} from "child_process";
import {promises as fs} from "fs";
import os from "os";
import path from "path";
import express from "express";
import socketIo from "socket.io";
import http from "http";
import osc from "osc";
import cpuStat from "cpu-stat";

const BASE_PATH = path.resolve("public/instruments/");

const app = express();
const server = http.Server(app);
const io = socketIo(server);

var udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 6666,
    remoteAddress: "127.0.0.1",
    remotePort: 7777,
    metadata: true
});

udpPort.open();
server.listen(7000);

const sampleMs = 2000;

const getStats = async () => ({
    wifi: {
        connected: true,
        signal: Math.floor(Math.random() * 101),
        network: "BEAD"
    },
    memory: {
        total: Math.floor(os.totalmem() / 1024),
        free: Math.floor(os.freemem() / 1024)
    },
    cpu: await Promise.all(
        range(0, cpuStat.totalCores()).map(
            coreIndex =>
                new Promise(resolve =>
                    cpuStat.usagePercent({coreIndex, sampleMs}, (err, percent) => resolve(Number(percent).toFixed(2)))
                )
        )
    ),

    midi: "ReMOTE SL :1 :29"
});

const sendInstruments = async client => {
    try {
        const fileContents = await fs.readFile(`${BASE_PATH}/index.json`);
        const instruments = JSON.parse(fileContents);
        return client.emit("instruments", instruments);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Instrument File error", err);
    }
};

const sendShutdown = () => io.emit("shutdown");
const sendStats = async () => {
    const stats = await getStats();
    io.emit("stats", stats);
};

const statsTimer = setInterval(sendStats, 3000);

const shutdown = () => {
    clearInterval(statsTimer);
    //spawn("shutdown", ["-h", "now"]).on("close", sendShutdown);
    spawn("sleep", ["2"]).on("close", sendShutdown);
};

const loadInstrument = instrument =>
    udpPort.send({
        address: "/load_xiz",
        args: [{type: "i", value: 0}, {type: "s", value: `${BASE_PATH}/${instrument}`}]
    });

const connect = client => {
    client.on("get-instruments", () => sendInstruments(client));
    client.on("start-shutdown", shutdown);
    client.on("load-instrument", loadInstrument);
};

io.on("connection", connect);
