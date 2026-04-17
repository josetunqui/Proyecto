document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-section');

    carousels.forEach(section => {
        const container = section.querySelector('.items-container');
        const btnLeft = section.querySelector('.btn-left');
        const btnRight = section.querySelector('.btn-right');
        const items = [...container.children];

        let isMoving = false;

        container.append(...items.map(i => i.cloneNode(true)));

        const getStep = () => items[0].offsetWidth + 20;

        const move = (direction) => {
            if (isMoving) return; 
            isMoving = true;

            container.style.scrollBehavior = 'smooth';
            container.scrollLeft += direction * getStep();

            setTimeout(() => {
                const halfWidth = container.scrollWidth / 2;

                if (container.scrollLeft >= halfWidth) {
                    container.style.scrollBehavior = 'auto';
                    container.scrollLeft = 0;
                } else if (container.scrollLeft <= 0) {
                    container.style.scrollBehavior = 'auto';
                    container.scrollLeft = halfWidth;
                }
                
                isMoving = false; 
            }, 500); 
        };

        btnRight.onclick = () => move(1);
        btnLeft.onclick = () => move(-1);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.portadas img');
    let currentIndex = 0;
    const intervalTime = 5000; 

    if (images.length > 0) {
        images[0].classList.add('active');
    }

    function nextImage() {
        images[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex + 1) % images.length;
        
        images[currentIndex].classList.add('active');
    }

    setInterval(nextImage, intervalTime);
});