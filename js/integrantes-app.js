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

        let resenaCorta = integrante.resena || '';
        if (resenaCorta.length > 70) {
            resenaCorta = resenaCorta.substring(0, 70) + '...';
        }

        let lenguajesHtml = '';

        if (integrante.lenguajesdeprogramacion?.length) {
            integrante.lenguajesdeprogramacion.slice(0, 3).forEach(lang => {
                const porcentaje = getNivelPorcentaje(lang.nivel);

                lenguajesHtml += `
                    <div class="mb-2">
                        <div class="d-flex justify-content-between small mb-1 fw-bold">
                            <span class="text-capitalize">${lang.idioma}</span>
                        </div>
                        <div class="progress" style="height: 6px;">
                            <div class="progress-bar" style="width: ${porcentaje}%; background-color: #3e3d6d;"></div>
                        </div>
                    </div>
                `;
            });
        }

        const fotoHTML = integrante.imagen
            ? `<img src="${integrante.imagen}" alt="${integrante.nombre}" class="rounded-circle mx-auto mb-3 shadow-sm border" style="width: 80px; height: 80px; object-fit: cover;">`
            : `<div class="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-secondary shadow-sm border" style="width: 80px; height: 80px; font-size: 2.5rem;"><i class="fa fa-user"></i></div>`;

        const modalId = `modal-${integrante.id}`;

        const cardHtml = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body text-center p-4">
                    ${fotoHTML}

                    <h3 class="h5 fw-bold mb-1 text-uppercase">
                        ${integrante.nombre.split(' ')[0]} ${integrante.apellido.split(' ')[0]}
                    </h3>

                    <p class="text-muted small mb-3 text-uppercase">
                        ${integrante.carrera}<br>${integrante.estudios?.ciclo || ''}
                    </p>

                    <div class="text-start mb-4 text-muted small">
                        ${integrante.contacto?.correoeducativo || integrante.contacto?.correo ? `
                            <p class="mb-1">
                                <i class="fa fa-envelope me-2" style="color: #3e3d6d;"></i>
                                ${integrante.contacto?.correoeducativo || integrante.contacto?.correo}
                            </p>
                        ` : ''}

                        ${integrante.pais ? `
                            <p class="mb-0">
                                <i class="fa fa-map-marker-alt me-2 text-danger"></i>
                                ${integrante.pais}
                            </p>
                        ` : ''}
                    </div>

                    ${resenaCorta ? `
                        <hr class="text-muted">
                        <div class="text-start mb-4">
                            <h4 class="h6 fw-bold mb-2">
                                <i class="fa fa-id-badge text-secondary me-2"></i> PERFIL
                            </h4>
                            <p class="small text-muted mb-0">${resenaCorta}</p>
                        </div>
                    ` : ''}

                    ${lenguajesHtml ? `
                        <div class="text-start mb-4">
                            <h4 class="h6 fw-bold mb-3">
                                <i class="fa fa-laptop-code text-secondary me-2"></i>
                                LENGUAJES DE PROGRAMACIÓN
                            </h4>
                            ${lenguajesHtml}
                        </div>
                    ` : ''}
                </div>

                <div class="card-footer bg-white border-0 p-4 pt-0">
                    <button 
                        type="button"
                        class="btn w-100 fw-bold text-white" 
                        style="background-color: #3e3d6d;"
                        data-bs-toggle="modal"
                        data-bs-target="#${modalId}">
                        Ver CV Completo
                    </button>
                </div>
            </div>

            <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title fw-bold">
                                CV de ${integrante.nombre} ${integrante.apellido}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <div class="text-center">
                                ${fotoHTML}
                                <h4 class="fw-bold">${integrante.nombre} ${integrante.apellido}</h4>
                                <p class="text-muted">${integrante.carrera}</p>
                            </div>

                            <hr>

                            ${integrante.resena ? `
                                <h5 class="fw-bold">Perfil Profesional</h5>
                                <p>${integrante.resena}</p>
                            ` : ''}

                            ${integrante.estudios ? `
                                <h5 class="fw-bold mt-4">Estudios</h5>
                                <ul>
                                    ${integrante.estudios.universidad ? `<li><strong>Universidad:</strong> ${integrante.estudios.universidad}</li>` : ''}
                                    ${integrante.estudios.periodo ? `<li><strong>Periodo:</strong> ${integrante.estudios.periodo}</li>` : ''}
                                    ${integrante.estudios.ciclo ? `<li><strong>Ciclo:</strong> ${integrante.estudios.ciclo}</li>` : ''}
                                    ${integrante.estudios.rendimiento ? `<li><strong>Rendimiento:</strong> ${integrante.estudios.rendimiento}</li>` : ''}
                                </ul>
                            ` : ''}

                            ${integrante.contacto ? `
                                <h5 class="fw-bold mt-4">Contacto</h5>
                                <ul>
                                    ${integrante.contacto.correoeducativo ? `<li><strong>Correo educativo:</strong> ${integrante.contacto.correoeducativo}</li>` : ''}
                                    ${integrante.contacto.correo ? `<li><strong>Correo:</strong> ${integrante.contacto.correo}</li>` : ''}
                                    ${integrante.contacto.telefono ? `<li><strong>Teléfono:</strong> ${integrante.contacto.telefono}</li>` : ''}
                                    ${integrante.contacto.linkedin ? `<li><strong>LinkedIn:</strong> ${integrante.contacto.linkedin}</li>` : ''}
                                    ${integrante.contacto.direccion ? `<li><strong>Dirección:</strong> ${integrante.contacto.direccion}</li>` : ''}
                                </ul>
                            ` : ''}

                            ${integrante.experienciaLaboral?.length ? `
                                <h5 class="fw-bold mt-4">Experiencia Laboral</h5>
                                <ul>
                                    ${integrante.experienciaLaboral.map(exp => `
                                        <li>
                                            <strong>${exp.puesto}</strong> - ${exp.empresa} (${exp.periodo})
                                            <ul>
                                                ${exp.funciones.map(funcion => `<li>${funcion}</li>`).join('')}
                                            </ul>
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.proyectosAcademicos?.length ? `
                                <h5 class="fw-bold mt-4">Proyectos Académicos</h5>
                                <ul>
                                    ${integrante.proyectosAcademicos.map(proyecto => `
                                        <li>
                                            <strong>${proyecto.nombre}</strong>
                                            <ul>
                                                ${proyecto.detalles.map(detalle => `<li>${detalle}</li>`).join('')}
                                            </ul>
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.habilidades?.length ? `
                                <h5 class="fw-bold mt-4">Habilidades</h5>
                                <ul>
                                    ${integrante.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.idiomas?.length ? `
                                <h5 class="fw-bold mt-4">Idiomas</h5>
                                <ul>
                                    ${integrante.idiomas.map(idioma => `
                                        <li>${idioma.idioma} - ${idioma.nivel}</li>
                                    `).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.conocimientosComputacion?.length ? `
                                <h5 class="fw-bold mt-4">Conocimientos de Computación</h5>
                                <ul>
                                    ${integrante.conocimientosComputacion.map(conocimiento => `<li>${conocimiento}</li>`).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.lenguajesdeprogramacion?.length ? `
                                <h5 class="fw-bold mt-4">Lenguajes de Programación</h5>
                                <ul>
                                    ${integrante.lenguajesdeprogramacion.map(lang => `
                                        <li>${lang.idioma} - ${lang.nivel}</li>
                                    `).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.areasInteres?.length ? `
                                <h5 class="fw-bold mt-4">Áreas de Interés</h5>
                                <ul>
                                    ${integrante.areasInteres.map(area => `<li>${area}</li>`).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.certificaciones?.length ? `
                                <h5 class="fw-bold mt-4">Certificaciones</h5>
                                <ul>
                                    ${integrante.certificaciones.map(cert => `
                                        <li>
                                            <strong>${cert.nombre}</strong> - ${cert.emisor}
                                            ${cert.año ? `(${cert.año})` : ''}
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.referenciasPersonales?.length ? `
                                <h5 class="fw-bold mt-4">Referencias Personales</h5>
                                <ul>
                                    ${integrante.referenciasPersonales.map(ref => `
                                        <li>
                                            <strong>${ref.nombre}</strong><br>
                                            ${ref.puesto} - ${ref.empresa}<br>
                                            Teléfono: ${ref.telefono}
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}

                            ${integrante.cv ? `
                                <div class="text-center mt-4">
                                    <a href="${integrante.cv}" target="_blank"
                                        class="btn text-white fw-bold"
                                        style="background-color:#3e3d6d;">
                                        Ver CV en PDF
                                    </a>
                                </div>
                            ` : ''}
                        </div>

                    </div>
                </div>
            </div>
        `;

        col.innerHTML = cardHtml;
        contenedor.appendChild(col);
    });
});
