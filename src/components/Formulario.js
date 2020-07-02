import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({guardarBusqueda}) => {

    // Guardar datos del form
    const [ termino, guardarTermino ] = useState('');
    const [ error, guardarError ] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        // validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        // Enviar el termino de búsqueda hacia el componente principal
        guardarBusqueda(termino);
    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ej: fútbol o café"
                        onChange={ e => guardarTermino(e.target.value.trim())}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            { error ? <Error mensaje="Agrega un termino de busqueda" /> : null }
        </form>
    );
}

Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired
}

export default Formulario;