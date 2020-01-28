$(document).ready(function(){
    $(document).on('click','#btn1',function(){
        const product=$('#btn1').val();
        const send_param={product};
        
        $.post('basket',send_param,function(returnData){
            alert(returnData.message);
        });
    });
    $(document).on('click','#btn2',function(){
        const product=$('#btn2').val();
        const send_param={product};
        
        $.post('basket',send_param,function(returnData){
            alert(returnData.message);
        });
    });
    $(document).on('click','#btn3',function(){
        const product=$('#btn3').val();
        const send_param={product};
        
        $.post('basket',send_param,function(returnData){
            alert(returnData.message);
        });
    });

    $(document).on('click','#basket_view',function(){
        const send_param={};
        $.post('basket_view',send_param,function(returnData){
           //alert(returnData.message);
           $('#basket_div').html(returnData.message);
        });
    });

    $(document).on('click','#logout_btn',function(){
        //alert();
        $.get('logout',function(returnData){
            alert(returnData.message);
            $('#login_div').show();
            $('#logout_div').hide();
        });
    });

    $('#login_btn').click(function(){
        const email=$('#login_email').val();
        //alert(email);
        const send_param={email};
        $.post('login', send_param, function(returnData){
            alert(returnData.message);
            //let login_form = `<button type="button" class="btn btn-danger" id="login_btn">login ok</button>`;
            //$('#logout_div').text(returnData.message);
            $('#login_div').hide();
            $('#logout_div').show();
            
        });
    });

    $('#contact_btn').click(function(){
        const name = $('#name').val();
        const email=$('#email').val();
        const comments=$('#comments').val();
        //alert();

        const send_param={name, email, comments};
        $.post('contact',send_param,(returnData)=>{
            alert(returnData.message);
            $('#name').val('');     //입력부분 다시 비운다
            $('#email').val('');
            $('#comments').val('');
        });
    });
});