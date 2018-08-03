
module.exports = async datas => new Promise((resolve) => {
	console.log(datas);
	resolve(JSON.stringify({
		datas
	}));
});
