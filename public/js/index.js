(function() {
	$('#list tbody').not($('.t1')).hide();
	$('#list tbody').on('click','button.remove',function(){
		var $that=$(this);
		var goodsname=$(this).parents('#list tbody tr').children('th').eq(0).text();
		var title=$(this).parents('#list tbody tr').children('th').eq(1).text();
		var price=$(this).parents('#list tbody tr').children('th').eq(2).text();
		var number=$(this).parents('#list tbody tr').children('th').eq(3).text();
		var type =$('#list ul li.active').index()+1;
		$.ajax({
			type:"post",
			url:"/remove",
			async:true,
			data:{
				goodsname:goodsname,
				title:title,
				price:price,
				type:type,
				number:number
			},
			success:function(data){
				if(data){
					$that.parents('#list tbody tr').remove()
				}else{
					console.log('系统故障')
				}			
			}
		})
		
	})
	
	
	
	$('#list tbody').on('click','button.detail',function(){
		var number=$(this).parents('#list tbody tr').children('th').eq(3).text();
		var type =$('#list ul li.active').index()+1;
		location.href="/detail?num="+number+"&&type="+type
	})
	
	
	
	
	$.ajax({
		type: "post",
		url: "/",
		async: true
	}).done(function(data) {
		var html = "";
		var i = null;
		var arr1 = [];
		var arr2 = [];
		var arr3 = [];
		for(i = 0; i < data.length; i++) {
			if(data[i].type == 1) {
				arr1.push(data[i])
			} else if(data[i].type == 2) {
				arr2.push(data[i])
			} else if(data[i].type == 3) {
				arr3.push(data[i])
			}
		}
		var arr=[arr1,arr2,arr3]
		for(i = 0; i < arr1.length; i++) {
			html += "<tr>" +
				"<th>" + arr1[i].goodsname + "</th>" +
				"<th>" + arr1[i].title + "</th>" +
				"<th>" + arr1[i].price + "</th>" +
				"<th>" + arr1[i].number + "</th>" +
				"<th><button class='remove'>删除</button><button class='detail'>查看</button></th>"+
				"</tr>"
		}
		$('#list tbody').eq(0).html(html)
		$('#list ul li').click(function() {
			html = "";
			for(i = 0; i < arr[$(this).index()].length; i++) {
				html += "<tr>" +
					"<th>" + arr[$(this).index()][i].goodsname + "</th>" +
					"<th>" + arr[$(this).index()][i].title + "</th>" +
					"<th>" + arr[$(this).index()][i].price + "</th>" +
					"<th>" + arr[$(this).index()][i].number + "</th>" +
					"<th><button class='remove'>删除</button><button class='detail'>查看</button></th>"+
					"</tr>"
			}
			$('#list tbody').eq($(this).index()).html(html)
			for(i = 0; i < $('#list ul li').length; i++) {
				$('#list ul li').removeClass('active');
				$('#list ul li').eq($(this).index()).addClass('active')
			}
			$('#list tbody').hide();
			$('#list tbody').eq($(this).index()).show();
		})
	});
})()