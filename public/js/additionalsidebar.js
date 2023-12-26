
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
    var navitem1 = document.getElementById("navitemcreatebroadcast");
    var navitem2 = document.getElementById("navitemarchive");
    if(currentPage.includes("createwhatsappsingle.php") || currentPage.includes("createwhatsapprecurring.php")){
        navitem1.classList.add('active');
    };

    if(currentPage.includes("mybroadcast.php")){
        navitem2.classList.add('active');
    };


    
    