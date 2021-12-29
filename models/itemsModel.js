const db = require('../config/db.js').promise();

const read_all_items = async () => {
	const [result] = await db.query(`SELECT code, name, size, registered_date, purchase_cost, account_id FROM items`);
	//result[0] return undefined when there is no data with those conditions
	if(result == undefined){
		return undefined;
	}else{
		return result;
	}
}

const read_items_by_accounts = async (account_id) => {
	const [result] = await db.query(`SELECT code, name, size, registered_date, purchase_cost, account_id FROM items WHERE account_id=?`, [account_id]);
	//result[0] return undefined when there is no data with those conditions
	if(result == undefined){
		return undefined;
	}else{
		return result;
	}
}

const update_item = async (new_item_info, acc_id) => {
//	const name = new_account_info.name;
//	const number = new_account_info.number;
//	const email = new_account_info.email;
//	const address = new_account_info.address;
//	const website = new_account_info.website;
//
//	await db.query(`UPDATE items SET name='${name}', number='${number}', email='${email}', address='${address}', website='${website}' WHERE id=?`, [acc_id]);
	return;
}

const delete_item = async (item_info) => {
//
//	//매칭되는 items 데이터 있는 경우엔 삭제 불가능하도록
//
//	await db.query(`DELETE from items WHERE id=?`, [account_info.acc_id]);
	return;
}

module.exports = {
	read_all_items,		//read all

	read_items_by_accounts,		//read by account_id

	update_item,	//update
	delete_item,	//delete
};
