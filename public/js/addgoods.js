$("#type").on('change',function(){
	if($(this).val()==1){
		$('#number').attr({'max':40}).val(1)
	}else if($(this).val()==2){
		$('#number').attr({'max':10}).val(1)
	}else if($(this).val()==3){
		$('#number').attr({'max':5}).val(1)
	}
})