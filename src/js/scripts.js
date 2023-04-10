
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

	
const changeHeight = () => {
	let  vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
changeHeight();

window.addEventListener('resize', () =>  {
	changeHeight();
});

	
$(function(){

    $.mask.definitions['~']='[78]';
	$(".phone-mask").mask("~(999)999-99-99");

	//	$.fancybox.defaults.backFocus = false;
	
	let param = getUrlVars();
	let utm = '<input type="hidden" name="utm_source" value="'+((param['utm_source']!=undefined)?decodeURIComponent(param['utm_source']):'')+'">'+
		      '<input type="hidden" name="utm_medium" value="'+((param['utm_medium']!=undefined)?decodeURIComponent(param['utm_medium']):'')+'">'+
		      '<input type="hidden" name="utm_campaign" value="'+((param['utm_campaign']!=undefined)?decodeURIComponent(param['utm_campaign']):'')+'">'+
		      '<input type="hidden" name="utm_content" value="'+((param['utm_content']!=undefined)?decodeURIComponent(param['utm_content']):'')+'">'+
		      '<input type="hidden" name="utm_term" value="'+((param['utm_term']!=undefined)?decodeURIComponent(param['utm_term']):'')+'">';
	$('form').append(utm);

	$('.click-contact').click(function(e){
		//dataLayer.push({'event': 'contact'});	
	})	


	/**************************************************************
	СКРОЛЛ
	**************************************************************/
	$('body').on('click', '[data-scroll]', function(e){
        e.preventDefault();
		var hash = '#'+$(this).attr("data-scroll");
		
		$('html, body').stop().animate({
	        	scrollTop: $(hash).offset().top-100
	        }, 1000,'easeInOutExpo');
	});

	$(window).scroll(function(){
        var top_scroll = window.pageYOffset || document.documentElement.scrollTop;
      
    });

	/**************************************************************
	ПОПАПЫ
	**************************************************************/
	function openModal(popup_n) {
		$('.popup').fadeOut(800);
		
		let popup = $('.popup[data-popup="'+popup_n+'"]');
        $(popup).fadeIn(800); 
		$('body').addClass('noscroll');
	}
	function closeModal() {
		$('.popup').fadeOut(500);
		$('body').removeClass('noscroll');
	}

	$('body').on('click', '[data-open-popup]', function(e){
        e.preventDefault();
        
        openModal( $(this).attr('data-open-popup') );
	})		
	$('.popup-close').click(function(e){
		e.preventDefault();

		closeModal();
	})


	/**************************************************************
	меню
	**************************************************************/
	$('.js-open-nav').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.js-nav').toggleClass('opened');
		$('body').toggleClass('noscroll');
	})
	$('.js-close-nav').click(function(e){
		e.preventDefault();
		$('.js-nav').toggleClass('opened');
		$('body').removeClass('noscroll');
	})

	$(document).mouseup( function(e){ 
		
		var div = $( ".js-navfix" ); 
		if ( !div.is(e.target) 
		    && div.has(e.target).length === 0
			&& !$('.js-open-nav').is(e.target) && $('.js-open-nav').has(e.target).length === 0 ) { 
				$('.js-open-nav').removeClass('active');
				$('.js-navfix').removeClass('active');
				$('body').removeClass('noscroll');
		}
		
	});

	/**************************************************************
	NAV
	**************************************************************/
	$('.js-nav-link').click(function (e) {
		e.preventDefault();
		let tab_name = $(this).attr('data-tab'),
			tabs = $(this).parents('.js-tabs');
			
		$(this).parents('.js-nav').find('.js-nav-link').removeClass('active');
		$(this).addClass('active');


		$(tabs).find('.js-tabs-content').removeClass("active").fadeOut(300).promise().done(function () {

			let ct = $(tabs).find('.js-tabs-content[data-tab*=' + tab_name + ']');
			$(ct).addClass("active").fadeIn(300);


		});
	})

	/**************************************************************
	FAQ
	**************************************************************/
	$(".js-faq-toggle").on("click", function (e) {
		e.preventDefault();
		// console.log(e);
		var content = $(this).next();
		var faq = $(this).parent();

		if (!faq.hasClass("active")) {
			$(this).parents('.js-faq').find(".js-faq-body").slideUp(300);
			$(this).parents('.js-faq').find(".js-faq-item").removeClass("active");
			content.slideDown(300);
		} else {
			content.slideUp(300);
		}

		faq.toggleClass("active");
	});


});


