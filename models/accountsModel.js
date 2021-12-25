const db = require('../config/db.js').promise();

const register_accounts = (account_info) => {
	if(account_info.address == undefined)
		account_info.address = '';
	if(account_info.website == undefined)
		account_info.website = '';

	db.query(`INSERT INTO accounts (name, registered_date, number, email, address, website) VALUES(?,?,?,?,?,?)`, [account_info.name, account_info.registered_date, account_info.number, account_info.email, account_info.address, account_info.website]);
	return;
}

const read_accounts = async () => {
	const [result] = await db.query(`SELECT name, registered_date, number, email, address, website FROM accounts`);

	//result[0] return undefined when there is no data with those conditions
	if(result == undefined){
		return undefined;
	}else{
		return result;
	}
}

module.exports = {
	register_accounts,
	read_accounts,
};
