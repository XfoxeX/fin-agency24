ymaps.ready(init);

function init(){
    // Создание экземпляра карты.
    var map = new ymaps.Map('map', {
            center: [37.729970, 55.687162], 
            zoom: 15,
       });
       
    map.behaviors.disable('scrollZoom');

    // Создаем маркер офиса
    var placemark = new ymaps.Placemark([37.729970, 55.687162],{
        hintContent: '<img src="./img/logo.svg" class="logo" alt="fin-agency24">',
        balloonContent: 'Финансовое агентство ИП Обухова Е.В. <br> г. Москва, ул. Полбина, 18к2',

    },{
            preset: 'islands#dotIcon',
            iconColor: '#735184'
        });

    // Создаем маршруты от метро до офиса
    var referencePoints1 = [
        "Москва, метро Печатники",
        [37.729970, 55.687162]
    ],
    /*referencePoints2 = [
        "Москва, метро Угрешская",
        [37.690066, 55.711574],
    ],*/

        // Первый маршрут
        multiRoute1 = new ymaps.multiRouter.MultiRoute({
            referencePoints: referencePoints1,
            params: {
                //Тип маршрутизации - пешеходная маршрутизация.
                routingMode: 'pedestrian'
            }
        }, {
            routeActiveMarkerVisible: false,
            pinVisible:false,
            viaPointVisible:false,
            wayPointVisible:false,
            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            boundsAutoApply: false
        });

        // Второй маршрут
        /*multiRoute2 = new ymaps.multiRouter.MultiRoute({
            referencePoints: referencePoints2,
            params: {
                //Тип маршрутизации - пешеходная маршрутизация.
                routingMode: 'pedestrian'
            }
        }, {
            routeActiveMarkerVisible: false,
            viaPointVisible:false,
            pinVisible:false,
            wayPointVisible:false,
            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            boundsAutoApply: false
        });*/

    map.geoObjects.add(placemark);
    map.geoObjects.add(multiRoute1);
    //map.geoObjects.add(multiRoute2);
    
    if (navigator.userAgent.toLowerCase().match(/(android|webos|ipad|iphone|blackberry|bb|playbook|iemobile|windows phone|kindle|silk|opera mini)/)) {
        map.behaviors.disable(['drag', 'rightMouseButtonMagnifier']);

        var c = document.querySelector(".map"),
            u = document.querySelector(".mobile-block-map");
        c.addEventListener("touchmove", (function(t) {
            if (t.touches.length < 2){
                document.querySelector(".mobile-block-map").style.opacity = 1;
                document.querySelector(".map").style.opacity = .3;
            }
        })), c.addEventListener("touchend", (function() {
            document.querySelector(".mobile-block-map").style.opacity = 0;
            document.querySelector(".map").style.opacity = 1;
        }));
    }
}