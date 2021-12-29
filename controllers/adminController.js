//const db = require('../config/db.js').promise();
const fs = require('fs');
const xlsx = require('xlsx');
const dir = './files';
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

const controll_items = async (req, res) => {
	const account_id = req.query.acc_id;
	const account_name = req.query.acc_name;

	try{
		const items = await itemsModel.read_items_by_accounts(account_id);
		const obj = {
			account_id: account_id,
			account_name: account_name,
			items: items,
		}
		return res.render('controll_items_by_accounts', obj);
	}catch(err){
		console.log(err);
	}
}

const upload_xlsx = (req, res) => {
	const account_name = req.query.acc_name;
	const filename = fs.readdirSync(dir);
	const excel_file = xlsx.readFile(`./files/${filename}`);
	const sheet_name = excel_file.SheetNames[0];
	const first_sheet = excel_file.Sheets[sheet_name];
	
	const data = xlsx.utils.sheet_to_json(first_sheet, {defval: ""});
	console.log(data);
	// 읽은 내용 뿌려서 페이지에 보여주고 기존 내용과 다른것, 새로운것 색깔로 구분해준다. 그리고 '확인'버튼 눌러서 db에 저장하거나 취소하고 excel파일을 수정하도록 권유한다.
	fs.unlinkSync(`./files/${filename}`);
	return res.send('ok');
}

module.exports = {
	read_accounts,
	create_accounts,
	update_accounts,
	delete_accounts,

	read_all_items,

	controll_items,
	upload_xlsx,
}
