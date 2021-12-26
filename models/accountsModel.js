const db = require('../config/db.js').promise();

const create_accounts = (account_info) => {
	if(account_info.address == undefined)
		account_info.address = '';
	if(account_info.website == undefined)
		account_info.website = '';

	db.query(`INSERT INTO accounts (name, registered_date, number, email, address, website) VALUES(?,?,?,?,?,?)`, [account_info.name, account_info.registered_date, account_info.number, account_info.email, account_info.address, account_info.website]);
	return;
}

const read_accounts = async () => {
	const [result] = await db.query(`SELECT id, name, registered_date, number, email, address, website FROM accounts`);

	//result[0] return undefined when there is no data with those conditions
	if(result == undefined){
		return undefined;
	}else{
		return result;
	}
}

const update_accounts = async (new_account_info, acc_id) => {
	const name = new_account_info.name;
	const number = new_account_info.number;
	const email = new_account_info.email;
	const address = new_account_info.address;
	const website = new_account_info.website;

	await db.query(`UPDATE accounts SET name='${name}', number='${number}', email='${email}', address='${address}', website='${website}' WHERE id=?`, [acc_id]);
	return;
}
const delete_accounts = async (account_info) => {

	//매칭되는 items 데이터 있는 경우엔 삭제 불가능하도록

	await db.query(`DELETE from accounts WHERE id=?`, [account_info.acc_id]);
	return;
}

module.exports = {
	create_accounts,	//create
	read_accounts,		//read
	update_accounts,	//update
	delete_accounts,	//delete
};
