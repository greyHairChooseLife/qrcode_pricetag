const upload_xlsx_btn = document.getElementById('upload_xlsx_btn');
const upload_xlsx_form = document.getElementById('upload_xlsx_form');
const is_selected = document.getElementById('is_selected');
upload_xlsx_btn.addEventListener('click', () =>{
	if(is_selected.value == ''){
		alert('choose file');
	}else{
		upload_xlsx_form.submit();
	}
})

const generate_qrcode_btn = document.getElementsByClassName('generate_qrcode_btn');
const generate_qrcode_form = document.getElementById('generate_qrcode_form');

for(var i=0; i<generate_qrcode_btn.length; i++){
	(function(m){
		generate_qrcode_btn[m].addEventListener('click', () => {
			generate_qrcode_form.action=`/admin/generate_qrcode?acc_id=${account_id}&item_code=${items[m].code}`;
			generate_qrcode_form.submit();
		});
	})(i)
}

const client_display_check_btn = document.getElementsByClassName('client_display_check_btn');
const client_display_check_form = document.getElementById('client_display_check_form');

for(var i=0; i<client_display_check_btn.length; i++){
	(function(m){
		client_display_check_btn[m].addEventListener('click', () => {
			//client_display_check_form.action=`/client/read_item?acc_id=${account_id}&item_code=${items[m].code}`;
			client_display_check_form.action=`/client/read_item/${account_id}/${items[m].code}`;
			client_display_check_form.submit();
		});
	})(i)
}







