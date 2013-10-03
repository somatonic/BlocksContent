$(function(){
    

    // $('.pwbc_block_edit').on('click',function(e){
    //     e.preventDefault();
    //     initFancybox($(this));
    // });

    // var initFancybox = function($link){
    //     var h = $(window).height()-65;
    //     var w = $(window).width() > 1150 ? 1150 : $(window).width()-100;
    //     $link.fancybox({
    //         hideOnContentClick: false,
    //         centerOnScroll: false,
    //         frameWidth: w,
    //         frameHeight: h,
    //         callbackOnClose: function(){
    //             console.log($link.attr("rel"));
    //             refreshBlock($link.closest("div").attr("id"), $link.attr("rel"));
    //         }
    //     }).trigger('click');
    // };

    // var refreshBlock = function(id,url){
    //     $('#'+id+' .pwbc_block_content').load(config.urls.admin + "blocks-process/loadblock/?id="+id);
    // };

    $('a.pwbc_block_down').on('click', function(e){
        e.preventDefault();
        var id = $(this).closest('#page_id').data('pageid'); //$(this).closest('div').attr('id');
        var parent_id = $(this).closest('#block_parent_id').data('pageid');

        // move block
        $block = $(this).closest('div');
        $block.fadeOut().insertAfter($block.next('div')).fadeIn();

        $blocks = $(this).closest('.pwbc_block').parent().find('.pwbc_block');
        var sort = getSortingCSV($blocks);
        saveSorting(id,parent_id,sort);
        // get new sorting


    });

    $('a.pwbc_block_up').on('click', function(e){
        e.preventDefault();
        var id = $(this).closest('#page_id').data('pageid'); //$(this).closest('div').attr('id');
        var parent_id = $(this).closest('#block_parent_id').data('pageid');

        $block = $(this).closest('div');
        $block.fadeOut().insertBefore($block.prev('div')).fadeIn();

        $blocks = $(this).closest('.pwbc_block').parent().find('.pwbc_block');

        var sort = getSortingCSV($blocks);
        saveSorting(id,parent_id,sort);
    });


    var saveSorting = function(id, parent_id, sort){
        console.log(id);
        console.log(parent_id);
        console.log(sort);
        var token_name = $('#session_token').data('token-name');
        var token_value = $('#session_token').data('token-value');
        console.log(token_name);
        console.log(token_value);
        var data = {'id': id, 'parent_id': parent_id, 'sort': sort };
        data[token_name] = token_value;

         // save sorting
        $.ajax({
            // url: config.urls.admin + "page/sort/",
            url: config.urls.admin + "blocks-process/sortblocks/",
            type: 'post',
            data: data,
            success: function(data){
                // TODO add saved notice for user
                console.log(data);
            }
        });
    };

    var getSortingCSV = function($blocks){
        var sort = [];
        $blocks.each(function(i){
            sort[i] = $(this).attr('id');
        });
        sort = sort.join(',');
        return sort;
    }

});