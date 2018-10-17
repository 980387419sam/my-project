
module.exports = async (datas, alls) => new Promise((resolve) => {
	resolve(JSON.stringify({
        state:0,
        datas:datas,
    }));
});
