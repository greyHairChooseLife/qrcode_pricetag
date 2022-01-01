//const db = require('../config/db.js').promise();
const fs = require('fs');
const xlsx = require('xlsx');
const accountsModel = require('../models/accountsModel.js');
const itemsModel = require('../models/itemsModel.js');

const read_accounts = async (req, res) => {
	const accounts = await accountsModel.read_accounts();

	for(var i=0; i<accounts.length; i++){
		const date = accounts[i].registered_date;
		accounts[i].registered_date = date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate();
	}

	const obj = {
		accounts: accounts,
	}
	
	return res.render('read_accounts', obj);
}

const create_accounts = (req, res) => {
	const account_info = req.body;

	account_info.registered_date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate();

	accountsModel.create_accounts(account_info);

	return res.send('new account registered.');
}

const update_accounts = (req, res) => {
	const new_account_info = req.body;
	const acc_id = req.query.acc_id;
	accountsModel.update_accounts(new_account_info, acc_id);

	return res.send('updated.');
}

const delete_accounts = (req, res) => {
	const acc_id = req.query.acc_id;
	accountsModel.delete_accounts({acc_id: acc_id,});
	return res.send('deleted');
}

const read_all_items = async (req, res) => {		//read only
	const items = await itemsModel.read_all_items();
	for(var i=0; i<items.length; i++){
		const date = items[i].registered_date;
		items[i].registered_date = date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate();
	}
	const obj = {
		items: items,
	}
	return res.render('read_all_items', obj);
}

const control_items = async (req, res) => {
	const account_id = req.query.acc_id;
	const account_name = req.query.acc_name;

	try{
		const items = await itemsModel.read_items_by_accounts(account_id);
		const obj = {
			account_id: account_id,
			account_name: account_name,
			items: items,
		}
		return res.render('control_items_by_accounts', obj);
	}catch(err){
		console.log(err);
	}
}

const upload_xlsx = async (req, res) => {
	const account_id = req.query.acc_id;
	const account_name = req.query.acc_name;

	const dir = './files';
	const filename = fs.readdirSync(dir);
	const excel_file = xlsx.readFile(`./files/${filename}`);
	const sheet_name = excel_file.SheetNames[0];
	const first_sheet = excel_file.Sheets[sheet_name];

	const new_data = xlsx.utils.sheet_to_json(first_sheet, {defval: ""});
	const exist_data = await itemsModel.read_items_by_accounts(account_id);

	fs.unlinkSync(`./files/${filename}`);
	return res.send('ok');
}

module.exports = {
	read_accounts,
	create_accounts,
	update_accounts,
	delete_accounts,

	read_all_items,			//just for admin

	control_items,
	upload_xlsx,
}
