(
    function(){
        var butMobile = document.querySelector('.mobile-but');
        var menuMobile = document.querySelector('.right-menu');

        butMobile.addEventListener('click', function(){
            menuMobile.classList.toggle('show-menu');
        });
    }
)(); 