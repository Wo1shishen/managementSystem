(function() {
	var s = null;
	var num = null;
	var stop = false;
	var box = null;
	var str = null;
	var stop1 = false;
	var stop2 = false;
	var stop3 = false;
	var stop4 = false;
	var stop5 = false;
	var stop6 = true;
	var stop0 = false;
	$('form .agree input').eq(0).change(function(){
		if($(this).prop('checked')){
			stop6=true
		}else{
			stop6=false
		}
	})
	/*$('form input.submit').eq(0).click(function(){
		if(!(stop1&&stop2&&stop3&&stop4&&stop5&&stop6&&stop7&&stop0)){
			return
		}else{
			return stop1,stop2,stop3,stop4,stop5,stop6,stop7,stop0
		}
	})*/

	document.getElementsByTagName('form')[0].onsubmit = function() {
		if(!(stop1 && stop2 && stop3 && stop4 && stop5 && stop6 && stop0)) {
			console.log(stop1,stop2,stop3,stop4,stop5,stop6,stop0);
			return false;
		}
	}

	$('form .int1').eq(0).focus(function() {
		$('form .wran').eq(0).show();
		$('form .int1').removeClass("active");
		$(this).addClass("active");
		$(this).blur(function() {
			str = $(this).val();
			str = str.replace(/\D/g, "");
			$(this).val(str);
			box = /^[0-9]{8,12}$/;
			if(box.test($(this).val())) {
				$.ajax({
					type: 'post',
					url: '/register',
					data: {
						qq: $(this).val()
					},
					success: function(data) {
						if(data) {
							$('form i.error').eq(0).hide();
							$('form .error-p .error').eq(0).hide();
							$('form i.ok').eq(0).show();
							stop0=true;
						} else {
							stop0 = false;
							$('form i.error').eq(0).show();
							$('form .error-p .error').eq(0).show();
							$('form i.ok').eq(0).hide()
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
			} else if($(this).val() != "") {
				stop0 = false;
				$('form i.error').eq(0).show();
				$('form .error-p .error').eq(0).show();
				$('form i.ok').eq(0).hide()
			}
		})
	})
	$('form .int1').eq(1).focus(function() {
		$('form .wran').eq(1).show()
		$('form .int1').removeClass("active");
		$(this).addClass("active");
		$(this).blur(function() {
			str = $(this).val();
			box = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
			if(box.test(str)) {
				$.ajax({
					type: 'post',
					url: '/register',
					data: {
						email: $(this).val()
					},
					success: function(data) {
						if(data) {
							$('form i.error').eq(1).hide();
							$('form .error-p .error').eq(1).hide();
							$('form i.ok').eq(1).show();
							stop1=true;
						} else {
							stop1 = false;
							$('form i.error').eq(1).show();
							$('form .error-p .error').eq(1).show();
							$('form i.ok').eq(1).hide()
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
			} else if($(this).val() != "") {
				stop1 = false;
				$('form i.error').eq(1).show();
				$('form .error-p .error').eq(1).show();
				$('form i.ok').eq(1).hide();
			}

		})
	});
	
	
	$('form .int1').eq(2).focus(function() {
		$('form .wran').eq(2).show()
		$('form .int1').removeClass("active");
		$(this).addClass("active");
		$(this).blur(function() {
			str = $(this).val();
			box = /^[a-zA-Z0-9]{3,15}$/;
			if(box.test(str)) {
				$.ajax({
					type: 'post',
					url: '/register',
					data: {
						username: $(this).val()
					},
					success: function(data) {
						if(data) {
							$('form i.error').eq(2).hide();
							$('form .error-p .error').eq(2).hide();
							$('form i.ok').eq(2).show();
							stop2=true;
						} else {
							stop2 = false;
							$('form i.error').eq(2).show();
							$('form .error-p .error').eq(2).show();
							$('form i.ok').eq(2).hide()
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
			} else if($(this).val() != "") {
				stop2 = false;
				$('form i.error').eq(2).show();
				$('form .error-p .error').eq(2).show();
				$('form i.ok').eq(2).hide();
			}

		})
	})
	$('form .int1').eq(3).focus(function() {
		$('form .wran').eq(3).show();
		$('form .int1').removeClass("active");
		$(this).addClass("active");
		$(this).blur(function() {
			str = $(this).val();
			box = /^[a-zA-Z1-9]{6,16}$/
			if(box.test(str)) {
				stop3 = true;
				$('form i.error').eq(3).hide();
				$('form .error-p .error').eq(3).hide();
				$('form i.ok').eq(3).show();
			} else if($(this).val() != "") {
				stop3 = false;
				$('form i.error').eq(3).show();
				$('form .error-p .error').eq(3).show();
				$('form i.ok').eq(3).hide();
			}

		})
	})
	$('form .int1').eq(4).focus(function() {
		$('form .wran').eq().show();
		$('form .int1').removeClass("active");
		$(this).addClass("active");
		$(this).blur(function() {
			if($(this).val() == $('form .int1').eq(3).val()) {
				stop4 = true;
				$('form i.error').eq(4).hide();
				$('form .error-p .error').eq(4).hide();
				$('form i.ok').eq(4).show();
			} else if($(this).val() != "") {
				stop4 = false;
				$('form i.error').eq(4).show();
				$('form .error-p .error').eq(4).show()
			}

		})
	});
	$('form .int1').eq(5).focus(function() {
		$('form .int1').removeClass("active");
		$(this).addClass("active");
		$(this).blur(function() {
			if($(this).val() == $('form .codevalue').eq(0).text()) {
				stop5 = true;
				$('form i.error').eq(5).hide();
				$('form .error-p .error').eq(5).hide();
				$('form i.ok').eq(5).show();
			} else if($(this).val() != "") {
				stop5 = false;
				$('form i.error').eq(5).show();
				$('form .error-p .error').eq(5).show();
				$('form i.ok').eq(5).hide();
			}
		})
	});

	$('form .codevalue').eq(0).click(function() {
		$('form i.error').eq(5).show();
		$('form .error-p .error').eq(5).show();
		$('form i.ok').eq(5).hide();
		stop5 = false;
		num = "";
		for(var i = 1; i <= 4; i++) {
			s = Math.random();
			s = String.fromCharCode(Math.floor(48 + 75 * s));
			num += s;
		}
		$(this).text(num)
	});
	num = "";
	for(var i = 1; i <= 4; i++) {
		s = Math.random();
		s = String.fromCharCode(Math.floor(48 + 75 * s));
		num += s;
	}
	$('form .codevalue').eq(0).text(num)
})()