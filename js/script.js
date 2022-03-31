var height = document.getElementsByClassName('header')[0].clientHeight;

window.onscroll = function() {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (scrolled >= height) {
      	document.getElementsByClassName('header-space')[0].style.height = height + 'px';

      	document.getElementsByClassName('body')[0].classList.add("fixed-header");

      	setTimeout(function(){
      		document.getElementsByClassName('header')[0].classList.add("is-fixed");
      	}, 100);
      } else {
      	document.getElementsByClassName('header-space')[0].style.height = 0;

      	document.getElementsByClassName('body')[0].classList.remove("fixed-header");

      	document.getElementsByClassName('header')[0].classList.remove("is-fixed");
      }
    }

function bodyOverflow(){
	if(!document.getElementsByClassName('popup-request-window')[0].classList.contains("request-window-opened") && 
		!document.getElementsByClassName('popup-request2-window')[0].classList.contains("request-window-opened") &&
		!document.getElementsByClassName('popup-success-window')[0].classList.contains("request-window-opened") &&
		!document.getElementsByClassName('popup-img')[0].classList.contains("request-window-opened") &&
		!document.getElementsByClassName('burger-nav')[0].classList.contains("openedBurger"))
	{
		document.body.classList.remove("openedBurgerBody");
	}else{
		document.body.classList.add("openedBurgerBody");
	}
}

function burgerClick(){
	document.getElementsByClassName('burger-nav-overlay')[0].classList.toggle("openedOverlay");
	document.getElementsByClassName('burger-nav')[0].classList.toggle("openedBurger");
	bodyOverflow();
}

$('.burger-nav-menu a').click(function(){
    burgerClick();
});

$('.burger-nav-overlay').click(function(){
	burgerClick();
})

function requestClick(){
	document.getElementsByClassName('popup-request-window')[0].classList.toggle("request-window-opened");
	bodyOverflow();
}

function request2Click(){
	document.getElementsByClassName('popup-request2-window')[0].classList.toggle("request-window-opened");
	bodyOverflow();
}


function successRequestClick(){
	document.getElementsByClassName('popup-success-window')[0].classList.toggle("request-window-opened");
	bodyOverflow();
}

$(document).ready(function(){
    $( "a.scrollLink" ).click(function( event ) {
        event.preventDefault();

		var headerHeight = $(".header").height();

        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - headerHeight}, 500);
    });

    $(".formReq").submit(function(){
    	$.ajax({
    		type: "POST",
    		url: "../php/request.php",
    		data: $(this).serialize()
    	}).done(function(){
    	    ym(69621169,'reachGoal','targetForm');
    	    gtag('event', 'send_request', {
                'event_name' : 'send_request'
            });
    		document.getElementsByClassName('popup-success-window')[0].classList.toggle("request-window-opened");
    		document.getElementsByClassName('popup-request-window')[0].classList.remove("request-window-opened");
    		document.getElementsByClassName('popup-request2-window')[0].classList.remove("request-window-opened");
			bodyOverflow();
    	});
    	return false;
    });

    /* Image popup */
	
	$(".proof-img").click(function(){	// Событие клика на маленькое изображение
	  	var img = $(this);	// Получаем изображение, на которое кликнули
		var src = img.attr('src'); // Достаем из этого изображения путь до картинки
		$(".popup-img-body").append(
						 "<img src='"+src+"' class='popup-proof-img' />"
						 ); 
		document.getElementsByClassName('popup-img')[0].classList.toggle("request-window-opened");
		bodyOverflow();

		$(".popup-img a").click(function(){
			document.getElementsByClassName('popup-img')[0].classList.remove("request-window-opened");
			bodyOverflow();
			
			setTimeout(function() {
				$(".popup-proof-img").remove();
			}, 200);
		});
	});
});


// Slide down and up informing text from informong section 
function toggleText(id){
	$("#toggleText_"+id).slideToggle();
    if($("#toggleBtn_"+id).text() == "Читать далее"){
    	$("#toggleBtn_"+id).text('Свернуть');
    }else{
    	$("#toggleBtn_"+id).text('Читать далее');
    }
}

// Lazy load map start
YaMapsShown = false;

$(document).ready(function (){
    $(window).scroll(function() {
        if (!YaMapsShown){
            if($(window).scrollTop() + $(window).height() > $(document).height() - 800) {      
                showYaMaps();
                YaMapsShown = true;
            }
        }
    });
});

function showYaMaps(){
	script = document.createElement("script");
	script.type  = "text/javascript";
	script.src   = "js/map.js";
	document.getElementById("YaMapsLazyLoad").appendChild(script);
}

// Lazy load map end