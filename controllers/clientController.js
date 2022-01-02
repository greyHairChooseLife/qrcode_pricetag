//const accountsModel = require('../models/accountsModel.js');
const itemsModel = require('../models/itemsModel.js');

const read_item = async (req, res) => {
	const account_id = req.params.account_id;
	const item_code = req.params.item_code;

	const item_info = await itemsModel.read_items_by_item_code(account_id, item_code);
	item_info.price = item_info.purchase_cost*1.3;
	const date = item_info.registered_date;
	item_info.registered_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

	const obj = {
		item: item_info,
	}
	return res.render('client/read_item', obj);
}

module.exports = {
	read_item,
}
