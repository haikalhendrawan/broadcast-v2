
$(document).ready(function() {
    // Add event handlers for mouseenter and mouseleave
    $('.nav-item').hover(function() {
        $(this).find('.nav-link').addClass('text-gray-900');
    }, function() {
        $(this).find('.nav-link').removeClass('text-gray-900');
    });

    // Add 'active' class to the current page's nav item
    var currentPageUrl = window.location.href;
    $('.nav-item').each(function() {
        var navItemUrl = $(this).find('.nav-link').attr('href');
        if (currentPageUrl.includes(navItemUrl)) {
            $(this).addClass('active');
        }
    });
    });

    var currentPage = window.location.href;
    var collapseAuth = document.getElementById("collapseAuth");
    var collapseReference = document.getElementById("collapseReference");
    var collapseItemQR = document.getElementById("collapseItemQR");
    var collapseItemCalendar = document.getElementById("collapseItemCalendar");

    if(currentPage.includes("qr")){
        collapseAuth.classList.add('show');
        collapseItemQR.style.backgroundColor = 'rgba(66, 135, 245, 0.3)'
    };

    if(currentPage.includes("calendar")){
        collapseReference.classList.add('show');
        collapseItemCalendar.style.backgroundColor = 'rgba(66, 135, 245, 0.3)'
    };


    
    