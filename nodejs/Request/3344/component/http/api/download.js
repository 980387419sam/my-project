const fs = require("fs");

module.exports = async (datas,res) => new Promise((resolve) => {
	const filename = datas.filename;
	var f = fs.createReadStream(__dirname+"/files/"+filename);
	res.writeHead(200, {
		"Content-Type": "application/force-download",
		"Content-Disposition": "attachment; filename="+filename
	});
	f.pipe(res);
});
