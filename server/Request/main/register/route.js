const sendemail = require("./sendemail");

module.exports = {
	type:{
		"/register/sendemail":"post",
	},
	callback:{
		"/register/sendemail":sendemail,
	}
};