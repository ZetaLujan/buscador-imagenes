import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import Footer from './components/Footer';

function App() {

  // State de la app
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual] = useState(1);
  const [ totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda.trim() === '') return;

      const imagenesPorPagina = 30;
      const key = '13127956-dcc734a510fdd44f2ec5f3e7c';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
      
      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    consultarAPI();
  }, [ busqueda, paginaactual ]);

  // Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  // Defenir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if( nuevaPaginaActual > totalpaginas ) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <Fragment>
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center font-weight-bold">Buscador de Imágenes</p>

          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
        </div>
        
        <Footer />

        <div className="row justify-content-center mb-3">
          <ListadoImagenes 
            imagenes={imagenes}
          />

          { (paginaactual === 1) ? null : (
            <button 
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
            >&#60; Anterior</button>
          ) }

          { (paginaactual === totalpaginas) ? null : (
            <button 
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaSiguiente}
            >Siguiente &#62;</button>
          )}
        </div>
      </div>

      { (busqueda) ? <Footer /> : null }
      
    </Fragment>
  );
}

export default App;
