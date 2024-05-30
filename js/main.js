$(document).ready(function(){

    // nav-menu

    $('.nav-menu-state').click(function(e){
        e.preventDefault();
        $(this).children('.nav-menu-icon').toggleClass('d-none');
        $(this).children('.clear-icon').toggleClass('d-none');
        $(this).parent().siblings('.nav-menu').toggleClass('d-none');
        $('main').toggleClass('d-none');
    });

    // btn-filter

    $('.filter-menu').hide();
    $('.btn-filter').click(function(e){
        e.preventDefault();
        $(this).siblings('.filter-menu').slideToggle(500);
    });
    $('.new-to-old').click(function(e){
        e.preventDefault();
        $(this).parent().siblings().children('.btn-filter-text').text($(this).text());
    });
    $('.old-to-new').click(function(e){
        e.preventDefault();
        $(this).parent().siblings().children('.btn-filter-text').text($(this).text());
    });

    // pagination
    // $('.page').click(function(e){
    //     e.preventDefault();
    //     $(this).addClass('active');
    //     $(this).parent().siblings().children('.page').removeClass('active');
    // })

    // FAQ

    $('.answer').hide();
    $('.faq-column').click(function(e){
        e.preventDefault();
        $(this).children('.answer').slideToggle(250);
        $(this).children().children('.add-icon').toggle().siblings('.remove-icon').toggleClass('d-none');
    });

});

// carousel

const swiper = new Swiper ('.swiper', {

    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
    
});
