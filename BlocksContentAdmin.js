$(function(){
    
    var h = $(window).height()-65;
    var w = $(window).width() > 1024 ? 980 : $(window).width()-50;
    var id = null;
    var context;
    
    $("a.pwbc_add").fancybox({
        hideOnContentClick: false,
        centerOnScroll: false,
        frameWidth: w,
        frameHeight: h,
        callbackOnClose: function(){
            console.log("id:"+id);
            if(id){ // we found a new block added in iframe
                addAsmOption(id);
            }
        },
        callbackOnShow: function(data){
            //console.log($('#fancy_frame')[0].src);
            $('#fancy_frame').load(function(){
                context = $(data.orig);
                id = $(this).contents().find("#PageIDIndicator").text();
            });
        }
    });
    
    
    function addAsmOption(id) {
        console.log(id);
        console.log(context);
        
        var count = context.parent('div').find('select[id^="Inputfield_"] option').size();
        
        $.ajax({
            url: config.urls.admin + "blocks-process/getpagetitle/",
            type: 'get',
            data: {'id':id},
            success: function(title){
                console.log(title);
                context.parent('div').find('select[id^="Inputfield_"]').append('<option value="'+id+'" id="asmOption'+count+'">'+title+'</option>');
                context.parent('div').find('select[class="asmSelect"]').append('<option value="'+id+'" rel="asmOption'+count+'">'+title+'</option>');
                context.parent('div').find('select[class="asmSelect"]').find("option[rel='asmOption"+count+"']").attr("selected","selected").trigger;
                context.parent('div').find('select[class="asmSelect"]').trigger("change");
            }
        });
        
        
    }
});

$(window).load(function(){
    // hide select
    $(".Inputfield_pwbc_blocks_select select.asmSelect").hide();
});