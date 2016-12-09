$.ajax({
	type:"get",
	url:"data/feature.json",
	async:true,
	success:function(data){
		
		createEle(data);
		drag();
		
	}
});

function createEle(data){
	for (var i=0;i<data.length;i++) {
//		var p=document.createElement('p');
		var p=$('<p></p>')
	//	p.innerHTML=data[i].deps;
		p.attr('class','fixedP');
		p.text(data[i].deps);
		p.appendTo($('#fixed'));
		$('.fixedP:even').css('background','lightgrey');
		$('.fixedP:odd').css('background','white')
	}
}

function drag(){
//	var oFixed=$('#fixed');
	var oP=$('.fixedP');
	for (var i=0;i<oP.length;i++) {
		startDrag(oP[i])
		
	}
	
}
