import {spawn} from "child_process";

import express from "express";
import socketIo from "socket.io";
import http from "http";
import osc from "osc";
import instruments from "../public/instruments/index";

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

//TODO: Get real stats
const getStats = () => ({
    wifi: {
        connected: true,
        signal: Math.floor(Math.random() * 101),
        network: "BEAD"
    },
    cpu: [
        Math.floor(1000 + Math.random() * 9000) / 100,
        Math.floor(1000 + Math.random() * 9000) / 100,
        Math.floor(1000 + Math.random() * 9000) / 100,
        Math.floor(1000 + Math.random() * 9000) / 100
    ],
    memory: {
        total: 1000000,
        free: Math.floor(10000000 + Math.random() * 90000000) / 100
    },
    midi: "ReMOTE SL :1 :29"
});

const sendInstruments = client => setTimeout(() => client.emit("instruments", instruments), 1000);
const sendShutdown = () => io.emit("shutdown");
const sendStats = () => io.emit("stats", getStats());

const statsTimer = setInterval(sendStats, 3000);

const shutdown = () => {
    clearInterval(statsTimer);
    //spawn("shutdown", ["-h", "now"]).on("close", sendShutdown);
    spawn("sleep", ["2"]).on("close", sendShutdown);
};

const loadInstrument = instrument =>
    udpPort.send({
        address: "/load_xiz",
        args: [{type: "i", value: 1}, {type: "s", value: instrument}]
    });

const connect = client => {
    client.on("get-instruments", () => sendInstruments(client));
    client.on("start-shutdown", shutdown);
    client.on("load-instrument", loadInstrument);
};

io.on("connection", connect);
