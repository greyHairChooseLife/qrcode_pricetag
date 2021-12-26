//const db = require('../config/db.js').promise();
const accountsModel = require('../models/accountsModel.js');

const read_accounts = async (req, res) => {
	const accounts = await accountsModel.read_accounts();

	const obj = {
		accounts: accounts,
	}
	
	return res.render('read_accounts', obj);
}

const create_accounts = (req, res) => {
	const account_info = req.body;

	account_info.registered_date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate();

	accountsModel.register_accounts(account_info);

	return res.send('new account registered.');
}

const update_accounts = (req, res) => {
	return
}
const delete_accounts = (req, res) => {
	const acc_id = req.query.acc_id;
	accountsModel.delete_accounts({acc_id: acc_id,});
	return res.send('deleted');
}

const read_items = (req, res) => {
	return res.render('read_items');
}

module.exports = {
	read_accounts,
	create_accounts,
	update_accounts,
	delete_accounts,
	read_items,
}
