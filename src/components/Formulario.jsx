import React, {useState} from "react";
import Error from "./Error";
import PropTypes from 'prop-types';

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState(false);

    const buscarImagen = e => {
        e.preventDefault();
        if(termino.trim() === ''){
            setError(true);
            return;
        }

        setError(false);
        setBusqueda(termino);
    }
  return (
    <form className="mt-2" onSubmit={buscarImagen} >
      <div className="row">
          <div className="form-group col-md-8">
              <input type="text" 
              className="form-control form-control-lg" 
              placeholder="busca una imagen, ejemplo: futbol o cafe" 
              onChange={ e => setTermino(e.target.value)} 

              />
          </div>
          <div className="form-group col-md-4">
              <button type="submit" className="btn btn-lg btn-danger btn-block">Buscar</button>
          </div>
      </div>
      {
          error 
          ? <Error mensaje="Agrega un termino de busqueda"/>
          :null
      }
    </form>
  );
};

Formulario.propTypes = {
    setBusqueda: PropTypes.func.isRequired
}

export default Formulario;
