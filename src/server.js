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

const getStats = () => ({
    wifi: {
        connected: true,
        signal: 100,
        network: "BEAD"
    },
    cpu: [0.18, 2.37, 1.14, 0.91],
    memory: {
        total: 1000230,
        free: 423123
    },
    midi: "ReMOTE SL :1 :29"
});

const sendInstruments = () => setTimeout(() => io.emit("instruments", instruments), 1000);
const sendShutdown = () => io.emit("shutdown");
const sendStats = () => io.emit("stats", getStats());

const shutdown = () => {
    //spawn("shutdown", ["-h", "now"]).on("close", sendShutdown);
    setTimeout(sendShutdown, 2000);
};

const connect = client => {
    client.on("get-instruments", sendInstruments);
    client.on("get-stats", sendStats);
    client.on("start-shutdown", shutdown);
    client.on("load-instrument", loadInstrument);
};

const loadInstrument = instrument => {
    const msg = {
        address: "/load_xiz",
        args: [{type: "i", value: 1}, {type: "s", value: instrument}]
    };

    console.log("osc", msg.address, msg.args); // eslint-disable-line no-console
    udpPort.send(msg);
};

io.on("connection", connect);
