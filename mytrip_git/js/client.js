$(document).ready(function(){
    $('#login_btn').click(function(){
        window.open("login.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=200,width=650,height=500");
    });

    $('#board_btn').click(function(){
        //alert();
        const board_title = $('#board_title').val();
        const board_content = $('#board_content').val();

        //alert(contact_name+":"+contact_email+":"+contact_phone+":"+contact_message);
        const send_param = {board_title, board_content};
        $.post('contact', send_param,function(returnData){
            alert(returnData.message);
        });
    });
});