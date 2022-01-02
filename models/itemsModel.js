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

const create_item = async (new_item_info) => {
	//code, name, size, purchase_cost, date, account_id
	
	console.log('from creatre_model: ', new_item_info);

	return await db.query(`INSERT INTO items (code, name, size, purchase_cost, registered_date, account_id) VALUES(?, ?, ?, ?, NOW(), ?)`, [new_item_info[0], new_item_info[1], new_item_info[2], new_item_info[3], new_item_info[4]]);
}

const update_item = async (new_item_info, item_code, acc_id) => {
	//name, size, purchase_cost, date
	
	console.log('from update_model: ', new_item_info, item_code, acc_id);

	return await db.query(`UPDATE items SET name='${new_item_info[0]}', size='${new_item_info[1]}', purchase_cost='${new_item_info[2]}', registered_date=NOW() WHERE account_id=? AND code=?`, [acc_id, item_code]);
	//return;
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

	create_item,	//create when there is no matched item code.
	update_item,	//update
	delete_item,	//delete
};
