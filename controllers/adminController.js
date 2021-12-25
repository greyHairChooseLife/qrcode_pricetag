const accounts = (req, res) => {
	return res.render('admin_accounts');
}
const items = (req, res) => {
	return res.render('admin_items');
}

module.exports = {
	accounts,
	items,
}
