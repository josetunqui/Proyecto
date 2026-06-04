import { integrantes } from './integrantes.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('equipo-container');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    const getNivelPorcentaje = (nivel) => {
        const n = nivel.toLowerCase();
        if (n.includes('basico') || n.includes('básico')) return 40;
        if (n.includes('intermedio')) return 70;
        if (n.includes('avanzado')) return 90;
        return 50;
    };

    integrantes.forEach(integrante => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        let resenaCorta = integrante.resena || "Estudiante de Ingeniería de Sistemas...";
        if (resenaCorta.length > 70) {
            resenaCorta = resenaCorta.substring(0, 70) + '...';
        }

        let lenguajesHtml = '';
        if (integrante.lenguajesdeprogramacion && integrante.lenguajesdeprogramacion.length > 0) {
            const topLenguajes = integrante.lenguajesdeprogramacion.slice(0, 3);
            topLenguajes.forEach(lang => {
                const porcentaje = getNivelPorcentaje(lang.nivel);
                lenguajesHtml += `
                    <div class="mb-2">
                        <div class="d-flex justify-content-between small mb-1 fw-bold">
                            <span class="text-capitalize">${lang.idioma}</span>
                        </div>
                        <div class="progress" style="height: 6px;">
                            <div class="progress-bar" role="progressbar"
                                style="width: ${porcentaje}%; background-color: #3e3d6d;" aria-valuenow="${porcentaje}"
                                aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                `;
            });
        } else {
            lenguajesHtml = '<p class="small text-muted">No se especificaron lenguajes.</p>';
        }

        const fotoHTML = integrante.imagen
            ? `<img src="${integrante.imagen}" alt="${integrante.nombre}" class="rounded-circle mx-auto mb-3 shadow-sm border" style="width: 80px; height: 80px; object-fit: cover;" onerror="this.onerror=null; this.outerHTML='<div class=\\'rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-secondary shadow-sm border\\' style=\\'width: 80px; height: 80px; font-size: 2.5rem;\\'><i class=\\'fa fa-user\\'></i></div>'">`
            : `<div class="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-secondary shadow-sm border" style="width: 80px; height: 80px; font-size: 2.5rem;"><i class="fa fa-user"></i></div>`;

        const cardHtml = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body text-center p-4">
                    ${fotoHTML}
                    <h3 class="h5 fw-bold mb-1 text-uppercase">${integrante.nombre.split(' ')[0]} ${integrante.apellido.split(' ')[0]}</h3>
                    <p class="text-muted small mb-3 text-uppercase">${integrante.carrera}<br>${integrante.estudios?.ciclo || ''}</p>

                    <div class="text-start mb-4 text-muted small">
                        <p class="mb-1"><i class="fa fa-envelope me-2" style="color: #3e3d6d;"></i>
                            ${integrante.contacto?.correoeducativo || integrante.contacto?.correo || 'No especificado'}</p>
                        <p class="mb-0"><i class="fa fa-map-marker-alt me-2 text-danger"></i> ${integrante.pais || 'Perú'}</p>
                    </div>
                    <hr class="text-muted">
                    <div class="text-start mb-4">
                        <h4 class="h6 fw-bold mb-2"><i class="fa fa-id-badge text-secondary me-2"></i> PERFIL
                        </h4>
                        <p class="small text-muted mb-0">${resenaCorta}
                        </p>
                    </div>
                    <div class="text-start mb-4">
                        <h4 class="h6 fw-bold mb-3"><i class="fa fa-laptop-code text-secondary me-2"></i>
                            LENGUAJES DE PROGRAMACIÓN</h4>
                        ${lenguajesHtml}
                    </div>
                </div>
                <div class="card-footer bg-white border-0 p-4 pt-0">
                    <button class="btn w-100 fw-bold text-white" style="background-color: #3e3d6d;">Ver CV
                        Completo</button>
                </div>
            </div>
        `;

        col.innerHTML = cardHtml;
        contenedor.appendChild(col);
    });
});
