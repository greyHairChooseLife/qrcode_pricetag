let arr = [];
exist_data.forEach(e => arr.push(e.registered_date));
arr.sort(function(a,b){
	return new Date(b) - new Date(a);
});

function easy_date_format(date){
	if(date != undefined)
		return new Date(new Date(date) + 3240 * 10000).toISOString().split("T")[0];
	else
		return '기록 없음';
}

document.getElementById('recent_update').innerText = easy_date_format(arr[0]);

//업로드한 파일의 상품 코드가 기존 DB의 코드와 일치할 경우, 변경된 항목에 한해서 바뀐 내용을 보여준다.
for(var i=0; i<new_data.length; i++){
	for(var j=0; j<exist_data.length; j++){
		if(new_data[i].code == exist_data[j].code){
			let is_changed = 0;
			if(new_data[i].name != exist_data[j].name){
				document.getElementsByClassName('update_name')[j].innerText = new_data[i].name;
				is_changed = 1;
			}
			if(new_data[i].size != exist_data[j].size){
				document.getElementsByClassName('update_size')[j].innerText = new_data[i].size;
				is_changed = 1;
			}
			if(new_data[i].purchase_cost != exist_data[j].purchase_cost){
				document.getElementsByClassName('update_purchase_cost')[j].innerText = new_data[i].purchase_cost;
				is_changed = 1;
			}
			if(is_changed == 1)
				document.getElementsByClassName('update_registered_date')[j].innerText = new_data[i].registered_date;
		}
	}
}

//업로드한 파일에 기존에 DB에 없는 상품코드가 있다면 새롭게 추가할 사항으로 보여준다.
const items_area = document.getElementById('items');

if(exist_data.length > 0){
	var k=0;
	for(var i=0; i<new_data.length; i++){
		for(var j=0; j<exist_data.length; j++){
			if(new_data[i].code == exist_data[j].code){
				break;
			}
			if(j != exist_data.length-1){
				continue;
			}
			const new_div = document.createElement('div');								//createElement should be generated again and again as they are used with appendchild() or appen()
			new_div.setAttribute('class', 'new_data');
			const new_data_class = document.getElementsByClassName('new_data');
			const new_span_code = document.createElement('span');
			new_span_code.setAttribute('class', 'code');
			const new_span_registered_date = document.createElement('span');
			new_span_registered_date.setAttribute('class', 'registered_date');
			const new_span_name = document.createElement('span');
			new_span_name.setAttribute('class', 'name');
			const new_span_size = document.createElement('span');
			new_span_size.setAttribute('class', 'size');
			const new_span_purchase_cost = document.createElement('span');
			new_span_purchase_cost.setAttribute('class', 'purchase_cost');
			items_area.append(new_div);
			new_data_class[k].appendChild(new_span_code).innerText = new_data[i].code;
			new_data_class[k].appendChild(new_span_registered_date).innerText = '오늘';
			new_data_class[k].appendChild(new_span_name).innerText = new_data[i].name;
			new_data_class[k].appendChild(new_span_size).innerText = new_data[i].size;
			new_data_class[k].appendChild(new_span_purchase_cost).innerText = new_data[i].purchase_cost;
			k++;
		}
	}
}else{
	var k=0;
	for(var i=0; i<new_data.length; i++){
		const new_div = document.createElement('div');								//createElement should be generated again and again as they are used with appendchild() or appen()
		new_div.setAttribute('class', 'new_data');
		const new_data_class = document.getElementsByClassName('new_data');
		const new_span_code = document.createElement('span');
		new_span_code.setAttribute('class', 'code');
		const new_span_registered_date = document.createElement('span');
		new_span_registered_date.setAttribute('class', 'registered_date');
		const new_span_name = document.createElement('span');
		new_span_name.setAttribute('class', 'name');
		const new_span_size = document.createElement('span');
		new_span_size.setAttribute('class', 'size');
		const new_span_purchase_cost = document.createElement('span');
		new_span_purchase_cost.setAttribute('class', 'purchase_cost');
		items_area.append(new_div);
		new_data_class[k].appendChild(new_span_code).innerText = new_data[i].code;
		new_data_class[k].appendChild(new_span_registered_date).innerText = '오늘';
		new_data_class[k].appendChild(new_span_name).innerText = new_data[i].name;
		new_data_class[k].appendChild(new_span_size).innerText = new_data[i].size;
		new_data_class[k].appendChild(new_span_purchase_cost).innerText = new_data[i].purchase_cost;
		k++;
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
