let arr = [];
exist_data.forEach(e => arr.push(e.registered_date));
arr.sort(function(a,b){
	return new Date(b) - new Date(a);
});

function easy_date_format(date){
	return new Date(new Date(date) + 3240 * 10000).toISOString().split("T")[0];
}

document.getElementById('recent_update').innerText = easy_date_format(arr[0]);

//업로드한 파일의 상품 코드가 기존 DB의 코드와 일치할 경우, 변경된 항목에 한해서 바뀐 내용을 보여준다.
for(var i=0; i<new_data.length; i++){
	for(var j=0; j<exist_data.length; j++){
		if(new_data[i].code == exist_data[j].code){
			//if(new_data[i].registered_date != exist_data[j].registered_date)
			let is_changed = 0;
			if(new_data[i].name != exist_data[j].name){
				document.getElementsByClassName('new_name')[j].innerText = new_data[i].name;
				is_changed = 1;
			}
			if(new_data[i].size != exist_data[j].size){
				document.getElementsByClassName('new_size')[j].innerText = new_data[i].size;
				is_changed = 1;
			}
			if(new_data[i].purchase_cost != exist_data[j].purchase_cost){
				document.getElementsByClassName('new_purchase_cost')[j].innerText = new_data[i].purchase_cost;
				is_changed = 1;
			}
			if(is_changed == 1)
				document.getElementsByClassName('new_registered_date')[j].innerText = new_data[i].registered_date;
		}
	}
}

const update_btn = document.getElementById('update_btn');
const update_form = document.getElementById('update_form');

update_btn.addEventListener('click', () => {
	update_form.submit();
})

const cancel_btn = document.getElementById('cancel_btn');
const cancel_update_form = document.getElementById('cancel_update_form');

cancel_btn.addEventListener('click', () => {
	cancel_update_form.submit();
})
