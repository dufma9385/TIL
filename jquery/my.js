$(document).ready(function(){
	
	$(document).on("click","#login_button",function(){
		//alert();
		const id = $('#id').val();
		const pw = $('#pw').val();
		//alert(id+":"+pw);
		const send_data_temp={
				sign:"login",
				id:id,
				pw:pw
		};
		const send_data=JSON.stringify(send_data_temp);
		$.post("main",send_data,function(returnData,status){
			
			if(returnData.resultCode){
				$('#login_div').hide();
				$('#logout_button').show();				
			}else{
				alert(returnData.message);
			}
		});
	});
	
	$(document).on("click","#logout_button",function(){
		$('#login_div').show();
		$('#logout_button').hide();
	});
	
	$(document).on("click","#sign_button",function(){
		$('#login_div').hide();
		$('#sign_div').show();
	});
	
	$(document).on("click","#sign_send_button",function(){
		$('#login_div').show();
		$('#sign_div').hide();
	});
	
});