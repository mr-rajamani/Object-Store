function topic () {
    /*Adds divs around dl elements.
    dl elements are not wrapped in divs, 
    which prohibits us from being able to style 
    the list like a table
    Added by D.Gallo*/
    if ($("dl").hasClass("table")){
        $('dt').each(function(){
            var $set = $(this); // this is your key ;)
            var nxt = this.nextSibling;
            while(nxt) {
            if(!$(nxt).is('dt')) {
        $set.push(nxt);
            nxt = nxt.nextSibling;
                } else break;
            } 
        $set.wrapAll('<div class="dlentry" />');
    });


    $('.dlentry dd').wrap('<div class="moreInfo"></div>');
        }


    /*Add class to section titles for special spacing*/
    $( document ).ready(function() {
        $(".section .sectiontitle").parent().addClass('hastitle');

        $(".section h3").parent().addClass('h3section');
    });



    //Wrap link around prev/next div
    $('.navheader').each(function(){
        var link = $(this).find('.navnext a').attr('href');
        var title = $(this).find('.navnext a').attr('title');
        $(this).find('.navnext').wrap('<a href="'+link+'" title="'+title+'"/>')
    })

    $('.navheader').each(function(){
        var link = $(this).find('.navprev a').attr('href');
        var title = $(this).find('.navprev a').attr('title');
        $(this).find('.navprev').wrap('<a href="'+link+'" title="'+title+'"/>')
    })

    //Add product name class to body element
    var prodTitle = $('.wh_publication_title a span span').html();
    var TitleSubstring = undefined;

    if (prodTitle) {
        var TitleSubstring = prodTitle.substring(0,3);

    if (TitleSubstring == 'Acu') {
        $(document.body).addClass('acu');
    } else if (TitleSubstring == 'RAD') {
        $(document.body).addClass('rad');}
    }


      //Wrap mathml in a div
      $(".figcap").each(function(){
        $(this).siblings().wrapAll("<div></div>")
    });



    /*Wraps components of a FN into different divs so that they can be styles similar a orderd list*/
    $('.fn').wrapInner('<div class="fnDesc"></div>');
        
    $('div.fnDesc').each(function(){
        $(this).children().first().prependTo($(this).closest(".fn"));
    });
       
    $('.fn sup').wrap('<div class="fnNumber"></div>');

    $('.fn sup').contents().unwrap();

    $('.fnDesc div.fnNumber').replaceWith(function() {
        return $('<sup/>', {html: this.innerHTML});
    });



    //Automatically adjust column widths for RADIOSS and OptiStruct tables in the Definition sections
    $('.def_table colgroup col:nth-of-type(1)').css('width','20%');
    $('.def_table colgroup col:nth-of-type(2)').css('width','65%');



    /*Automatically adjust column widths for io_3col_table, s_10col_table, and r_8col_table outputclasses
    Added by A.Barbour*/
    $('.io_3col_table colgroup col:nth-of-type(1)').css('width','18%');
    $('.io_3col_table colgroup col:nth-of-type(2)').css('width','28%');

    $('.s_10col_table colgroup col').css('width','10%');

    $('.r_8col_table colgroup col').css('width','12.5%');



    /*Removes the hrefs with hidetoc from side toc*/
    $('.wh_publication_toc li span a[href*="hidetoc"]').parent().parent().remove();


  
    //find all href in the .wh_tile_title class that contains _hidetoc and remove it from href
    $('.wh_publication_toc a').each(function() { 
        var $this = $(this),
        aHref = $this.attr('href');  //get the value of an attribute 'href'
        $this.attr('href', aHref.replace('_hidetoc','')); //set the value of an attribute 'href'
    });


    //Add box shadow to header when scrolling - added for new skin design by ajuntti//
    function updateHeaderShadow() {
        var scroll = $(window).scrollTop();
        if ($(window).width() > 767 && scroll > 0) {
            $(".wh_tools, .wh-letters, .wh_search_page > .wh_header, .wh_main_page > .wh_header").addClass("active_header");
        } else {
            $(".wh_tools, .wh-letters, .wh_search_page > .wh_header, .wh_main_page > .wh_header").removeClass("active_header");
        }
    }
    
    $(window).on('scroll resize', updateHeaderShadow);


    //Remove break lines and move fig titles/descriptions below image - added for new skin design by ajuntti//
    $("figure:not(.equation-figure)").each(function() {
        $(this).children("br").remove();
        $(this).children("figcaption").detach().appendTo($(this));
       })

    
    /*Apply a scroll margin class to any elements (except headers) that can be linked to on a page's content body. 
    This prevents cross references from getting stuck underneath the header.
    Added by A. Juntti*/
    var startOfBody = document.getElementById('wh_topic_body');
    if (startOfBody) {
        var idNodes = startOfBody.querySelectorAll('[id]:not(h1):not(h2):not(h3)');
        for (let i=0; i < idNodes.length; i++) {
            idNodes[i].classList.add("scrollMargin");
        }
    }
}

topic ();