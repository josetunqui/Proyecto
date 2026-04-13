document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-section');

    carousels.forEach(section => {
        const container = section.querySelector('.items-container');
        const btnLeft = section.querySelector('.btn-left');
        const btnRight = section.querySelector('.btn-right');
        const items = [...container.children];

        // Estado para evitar clics rápidos
        let isMoving = false;

        // Clonar elementos para el efecto infinito
        container.append(...items.map(i => i.cloneNode(true)));

        const getStep = () => items[0].offsetWidth + 20;

        const move = (direction) => {
            if (isMoving) return; // Si ya se está moviendo, ignorar el clic
            isMoving = true;

            container.style.scrollBehavior = 'smooth';
            container.scrollLeft += direction * getStep();

            // Esperar a que termine la animación (500ms coincide con el CSS smooth)
            setTimeout(() => {
                const halfWidth = container.scrollWidth / 2;

                // Lógica de reposición instantánea
                if (container.scrollLeft >= halfWidth) {
                    container.style.scrollBehavior = 'auto';
                    container.scrollLeft = 0;
                } else if (container.scrollLeft <= 0) {
                    container.style.scrollBehavior = 'auto';
                    container.scrollLeft = halfWidth;
                }
                
                isMoving = false; // Liberar el bloqueo
            }, 500); 
        };

        btnRight.onclick = () => move(1);
        btnLeft.onclick = () => move(-1);
    });
});