//const db = require('../config/db.js').promise();
const accountsModel = require('../models/accountsModel.js');

const show_accounts = async (req, res) => {
	const accounts = await accountsModel.read_accounts();

	const obj = {
		accounts: accounts,
	}
	
	return res.render('show_accounts', obj);
}

const register_accounts = (req, res) => {
	const account_info = req.body;

	account_info.registered_date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate();

	accountsModel.register_accounts(account_info);

	return res.send('new account registered.');
}

const show_items = (req, res) => {
	return res.render('show_items');
}

module.exports = {
	show_accounts,
	register_accounts,
	show_items,
}
