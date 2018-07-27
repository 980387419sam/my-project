
const http = require("http");

const Request3344 = require("./Request/3344");
const Request3345 = require("./Request/3345");

class APP {
	constructor() {
		this.allServers = [];
	}
	init() {
		http.createServer(Request3344).listen(3344);
		// http.createServer(Request3345).listen(3345)
	}
}

const app = new APP();
app.init();
