//const db = require('../config/db.js').promise();
const fs = require('fs');
const fs_extra = require('fs-extra');
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
	for(var i=0; i<new_data.length; i++){		//reset object key name.
		new_data[i].code = new_data[i]['상품코드'];
		new_data[i].name = new_data[i]['상품명'];
		new_data[i].size = new_data[i]['규격'];
		new_data[i].purchase_cost = new_data[i]['매입원가'];
		new_data[i].registered_date = '오늘';
		delete new_data[i]['상품코드'];
		delete new_data[i]['상품명'];
		delete new_data[i]['규격'];
		delete new_data[i]['매입원가'];
	}
	const exist_data = await itemsModel.read_items_by_accounts(account_id);
	for(var i=0; i<exist_data.length; i++){
		exist_data[i].registered_date = new Date(new Date(exist_data[i].registered_date) + 3240 * 10000).toISOString().split("T")[0];
		if(exist_data[i].size == null) 
			exist_data[i].size = '';
	}

	const obj = {
		account_id: account_id,
		account_name: account_name,
		new_data: new_data,
		exist_data: exist_data,
	}

	return res.render('upload_xlsx', obj);
}

const update_xlsx = async (req, res) => {
	const account_id = req.query.acc_id;
	const dir = './files';
	const filename = fs.readdirSync(dir);
	const excel_file = xlsx.readFile(`./files/${filename}`);
	const sheet_name = excel_file.SheetNames[0];
	const first_sheet = excel_file.Sheets[sheet_name];

	const new_data = xlsx.utils.sheet_to_json(first_sheet, {defval: ""});
	fs_extra.emptydirSync(`./files`);		//delete from directory. no need to keep it.
	for(var i=0; i<new_data.length; i++){		//reset object key name.
		new_data[i].code = new_data[i]['상품코드'];
		new_data[i].name = new_data[i]['상품명'];
		new_data[i].size = new_data[i]['규격'];
		new_data[i].purchase_cost = new_data[i]['매입원가'];
		new_data[i].registered_date = '오늘';
		delete new_data[i]['상품코드'];
		delete new_data[i]['상품명'];
		delete new_data[i]['규격'];
		delete new_data[i]['매입원가'];
	}
	const exist_data = await itemsModel.read_items_by_accounts(account_id);

	if(exist_data.length > 0){
		for(var i=0; i<new_data.length; i++){
			for(var j=0; j<exist_data.length; j++){
				if(new_data[i].code == exist_data[j].code){
					const new_item_info = [new_data[i].name, new_data[i].size, new_data[i].purchase_cost];
					//itemsModel.update_item(new_item_info, new_data[i].code, account_id);
					await itemsModel.update_item(new_item_info, new_data[i].code, account_id);
					break;
				}else if(j == exist_data.length-1 && new_data[i].code != exist_data[j].code){
					await itemsModel.create_item([new_data[i].code, new_data[i].name, new_data[i].size, new_data[i].purchase_cost, account_id]); 
				}
			}
		}
	}else{
		for(var i=0; i<new_data.length; i++){
			await itemsModel.create_item([new_data[i].code, new_data[i].name, new_data[i].size, new_data[i].purchase_cost, account_id]); 
		}

	}


	res.redirect('/');
}
const cancel_update_xlsx = (req, res) => {
	fs_extra.emptydirSync(`./files`);		//delete from directory. no need to keep it.
	res.redirect('/');
}

module.exports = {
	read_accounts,
	create_accounts,
	update_accounts,
	delete_accounts,

	read_all_items,			//just for admin

	control_items,
	upload_xlsx,
	update_xlsx,
	cancel_update_xlsx,
}
