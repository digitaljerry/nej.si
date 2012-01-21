/*
Theme: Notebook
Author: graphic_dev
URI:  http://themeforest.net/user/graphic_dev?ref=graphic_dev
jQuery Version: 1.0
*/

$(document).ready(function () {
	/* Hide header on home page */
	$("#about-me-link,#work-link,#connect-link,#contact-me-link").click(function () { 
		$("header").removeClass("ir", 5000);
	});
	$("#home-link").click(function () { 
		$("header").addClass("ir", 5000);
	});
    
    /* Image hover */
    $('a img').not('a.next img, a.prev img, nav a img, a.network img').hover(
      function () {
        $(this).addClass('img-hover');
      },
      function () {
        $(this).removeClass('img-hover');
      }
    );

	/* Tooltips for main navigation (Read more here: http://onehackoranother.com/projects/jquery/tipsy/) */
    $('nav ul li a').tipsy({gravity: 'e', fade: true});
    
    /* Main navigation - transition effects between pages (Read more here: http://jquery.malsup.com/cycle/) */
    $('#pages').cycle({
        fx:     'fade',
        speed:  'medium',
        timeout: 0,
        pager:  'nav ul',
        pagerAnchorBuilder: function(idx, slide) {
            return 'nav ul li:eq(' + (idx) + ') a';
        }
    });
    $('#about-me-pages').cycle({
        fx:     'fade',
        speed:  'medium',
        timeout: 0,
        prev:   '#about-me-nav .prev', 
        next:   '#about-me-nav .next',
        after:   onAfterAboutMe
    });
    $('#work-pages').cycle({
        fx:     'fade',
        speed:  'medium',
        timeout: 0,
        prev:   '#work-nav .prev', 
        next:   '#work-nav .next',
        after:   onAfterWork
    });
    $('#connect-pages').cycle({
        fx:     'fade',
        speed:  'medium',
        timeout: 0,
        prev:   '#connect-nav .prev', 
        next:   '#connect-nav .next',
        after:   onAfterConnect
    });
    $('#contact-me-pages').cycle({
        fx:     'fade',
        speed:  'medium',
        timeout: 0,
        prev:   '#contact-me-nav .prev', 
        next:   '#contact-me-nav .next',
        after:   onAfterContactMe
    });
	
    /* Network animation */
	$('.network').hover(
		function () {
			$(this).stop().animate({paddingLeft: 7}, 100);
		},
		function () {
			$(this).stop().animate({paddingLeft: 0}, 100);
		}
	);

    /* prettyPhoto */
    $('a[data-rel]').each(function() {
        $(this).attr('rel', $(this).attr('data-rel')).removeAttr('data-rel');
    });

    $("a[rel^='prettyPhoto']").prettyPhoto({
    	animation_speed: 'fast', /* fast/slow/normal */
    	slideshow: 5000, /* false OR interval time in ms */
    	autoplay_slideshow: false, /* true/false */
    	opacity: 0.80, /* Value between 0 and 1 */
    	show_title: true, /* true/false */
    	allow_resize: true, /* Resize the photos bigger than viewport. true/false */
    	default_width: 500,
    	default_height: 344,
    	theme: 'pp_default', /* pp_default / light_rounded / dark_rounded / light_square / dark_square / facebook */
    	autoplay: true, /* Automatically start videos: True/False */
    	overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
    	ie6_fallback: true,
    	social_tools: false /* html or false to disable */
	});
	   
    /* Form */
	$("#contact-form").validate({
		submitHandler: function(form) {
			$(form).ajaxSubmit(options); 
			$('#form-output p').remove();
			$('#form-output').append('<p class="loading">Sending your message...</p>');
			return false; 
		 }
	});
	var options = { 
		target: '#form-output',
		clearForm: true  /* clear all form fields after successful submit */
    };

    /* Facebook Like Box */
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '293854293966933', /* You can update to your facebook app id or use this one */
        status     : true,
        cookie     : true,
        oauth      : true,
        xfbml      : true
      });
    };
    (function(d){
       var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
       js = d.createElement('script'); js.id = id; js.async = true;
       js.src = "//connect.facebook.net/en_US/all.js";
       d.getElementsByTagName('head')[0].appendChild(js);
    }(document));

    /* Remove "prev" and "next" buttons at the first/last page of slideshow */
    function onAfterAboutMe(curr, next, opts) {
        var index = opts.currSlide;
        $('#about-me-nav .prev')[index == 0 ? 'hide' : 'show']();
        $('#about-me-nav .next')[index == opts.slideCount - 1 ? 'hide' : 'show'](); 
    }
    function onAfterWork(curr, next, opts) {
        var index = opts.currSlide;
        $('#work-nav .prev')[index == 0 ? 'hide' : 'show']();
        $('#work-nav .next')[index == opts.slideCount - 1 ? 'hide' : 'show']();
    }
    function onAfterConnect(curr, next, opts) {
        var index = opts.currSlide;
        $('#connect-nav .prev')[index == 0 ? 'hide' : 'show']();
        $('#connect-nav .next')[index == opts.slideCount - 1 ? 'hide' : 'show']();
    }
    function onAfterContactMe(curr, next, opts) {
        var index = opts.currSlide;
        $('#contact-me-nav .prev')[index == 0 ? 'hide' : 'show']();
        $('#contact-me-nav .next')[index == opts.slideCount - 1 ? 'hide' : 'show']();
    }

    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur().parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });
});