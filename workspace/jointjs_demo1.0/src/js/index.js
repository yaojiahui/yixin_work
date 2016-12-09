for(var i = 0; i < 30; i++) {
	var fixedP = $('<div class="fixedP"></div>');
	var fixedUl = $('<ul class="fixedUl"></ul>');
	fixedP.appendTo($('.li-hide-table'));
	fixedUl.appendTo($('.li-hide-table'));
}
$('.fixedP:even').css('background', '#f9fafa');
$('.fixedP:odd').css('background', 'white');


//点击出现左侧边栏
//var arrLeftliImg = ['url(img/white-shaoping.png) no-repeat 18px 10px','url(img/shujuyuan.png) no-repeat 8px 16px']

$('.fixed-li').click(function(ele) {
	$('.fixedUl').text('')
	$('.fixed-li').css('background', '#344750');
	$('.nav-fixes-title').css('color','#7998a7');
	
	$('.li-hide').show();
	$(this).css('background', '#26c6da');
	$(this).find('.nav-fixes-title').css('color','#ffffff');
//	$(this).find('.nav-fixed-img').css('background', arrLeftliImg[$(this).index()]);
//	console.log($(this).index())
	

	getData("data/feature.json")

})

//$('.fixed-li').each(function(ele,idx){
//	$(ele).click(function(){
//		$('.fixedUl').text('')
//		$('.fixed-li').css('background', '#344750');
//		$('.nav-fixes-title').css('color','#7998a7');
//		
//		$('.li-hide').show();
//		$(this).css('background', '#26c6da');
//		$(this).find('.nav-fixes-title').css('color','#ffffff');
//		
//		console.log(idx)
//		
//		getData("data/feature.json")
//	})
//})


$('#myholder-wrap').click(function(){
	$('.li-hide').hide();
//	$('#right-aside').toggle()
})

function getData(url) {
	$.ajax({
		type: "get",
		url: url,
		async: true,
		success: function(data) {
			createEle(data);
			drag();

		}
	});
}



function createEle(data) {
	var arrfixedP = document.getElementsByClassName('fixedP');
	var arrfixedUl = document.getElementsByClassName('fixedUl');

	for(var i = 0; i < data.length; i++) {
		arrfixedP[i].innerHTML = data[i].expName;
		var arrExperiments = data[i].experiments;
		for(var j = 0; j < arrExperiments.length; j++) {
			var fixedli = $('<li class="fixedUl-li"></li>');
			fixedli.text(arrExperiments[j]);
			fixedli.appendTo(arrfixedUl[i]);

		}
		arrfixedP[i].onclick = function() {
			$('.fixedP:even').css('background', '#f9fafa');
			$('.fixedP:odd').css('background', 'white');
			$(this).next().toggle();
			$(this).css('background', '#eef4f7')
		}
	}
	$('.fixedUl-li:even').css('background', '#f9fafa');
	$('.fixedUl-li:odd').css('background', 'white');

}

function drag() {
	//	var oFixed=$('#fixed');
	var oP = $('.fixedUl-li');
	for(var i = 0; i < oP.length; i++) {
		startDrag(oP[i])

	}

}
