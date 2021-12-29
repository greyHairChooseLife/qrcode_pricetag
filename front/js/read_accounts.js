const read_accounts = document.getElementsByClassName('read_accounts');
const updating_form = document.getElementsByClassName('updating_form');

for(var i=0; i<updating_form.length; i++){
	updating_form[i].style.display = 'none';
}

const update_btn = document.getElementsByClassName('update_btn');
for(var i=0; i<update_btn.length; i++){
	(function(m){
		update_btn[m].addEventListener('click', () => {
			updating_form[m].style.display = 'block';
			read_accounts[m].style.display = 'none';
		});
	})(i)
}

const cancel_btn = document.getElementsByClassName('cancel_btn');
for(var i=0; i<cancel_btn.length; i++){
	(function(m){
		cancel_btn[m].addEventListener('click', () => {
			updating_form[m].style.display = 'none';
			read_accounts[m].style.display = 'block';
		});
	})(i)
}

const apply_btn = document.getElementsByClassName('apply_btn');
for(var i=0; i<apply_btn.length; i++){
	(function(m){
		apply_btn[m].addEventListener('click', () => {
			updating_form[m].submit();
		});
	})(i)
}

const delete_btn = document.getElementsByClassName('delete_btn');
const deleting_form = document.getElementsByClassName('deleting_form');
for(var i=0; i<delete_btn.length; i++){
	(function(m){
		delete_btn[m].addEventListener('click', () => {
			deleting_form[m].submit();
		});
	})(i)
}

const item_upload_btn = document.getElementsByClassName('item_upload_btn');
const item_upload_form = document.getElementsByClassName('item_upload_form');
for(var i=0; i<item_upload_btn.length; i++){
	(function(m){
		item_upload_btn[m].addEventListener('click', () => {
			item_upload_form[m].submit();
		});
	})(i)
}
