import Formulario from "./components/Formulario";
import { useState, useEffect } from "react";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);

  //Pagination
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPagina, setTotalPagina] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") {
        return;
      }

      const imagenPorPagina = 30;
      const apiKey = "16342865-a60568ce713b7e7a7751a30e4";
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${busqueda}&per_page=${imagenPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // Calcular el total de paginas

      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenPorPagina
      );
      setTotalPagina(calcularTotalPaginas);
    };
    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) {
      return;
    }

    setPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if (nuevaPaginaActual > totalPagina) return;

    setPaginaActual(nuevaPaginaActual);

    // Mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' })
  };

  return (
    <div className="container mt-2">
      <div className="jumbotron">
        <div className="lead text-center">Buscador de Imagenes</div>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {paginaActual === 1 ? null : ( //Ocultar boton
          <button
            className="btn btn-info mr-1"
            type="button"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}
        {paginaActual === totalPagina ? null : (
          <button
            className="btn btn-info"
            type="button"
            onClick={paginaSiguiente}
          >
            &raquo; Siguiente{" "}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
