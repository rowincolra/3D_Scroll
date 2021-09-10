(function () {
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const selectCharacterElem = document.querySelector('.select-character');
    const mousePos = { x: 0, y: 0};
    let maxScroll;
    
    function resizeHandler () {
        maxScroll = document.body.offsetHeight - window.innerHeight;
    }
    
    window.addEventListener('scroll', function () {
        const scrollLocate = pageYOffset / maxScroll;
        const zmove = scrollLocate * 970 - 500;
        houseElem.style.transform = 'translateZ(' + zmove + 'vw)';

        barElem.style.width = scrollLocate * 100 + '%';        
    });
 
    window.addEventListener('mousemove', function (e) {
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + 'deg)';
    });

    window.addEventListener('resize', resizeHandler);

    selectCharacterElem.addEventListener('click', function (e) {
        const value = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', value);
    });

    resizeHandler(); 

   
})();

