import { useEffect, useState } from "react";
import { useApi } from "../../fruits/hooks/useApi";
import { FruitCard } from "./FruitCard";
import { NavbarComponent } from "./NavbarComponent";


export const FruitsGrid = () => {

  const [fruits, setFruits] = useState([]);
  const [allFruits, setAllFruits] = useState([]);
  const [searchType, setSearchType] = useState('family');
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);

  
  const {
    getAllFruits,
    
    searchFruits,
    loading,
    error,
    clearError
  } = useApi();

  // Cargar todas las frutas al iniciar
  useEffect(() => {
    const loadAllFruits = async () => {
      try {
        const data = await getAllFruits();
        setAllFruits(data);
        setFruits(data);
        extractSearchOptions(data, searchType);
      } catch (err) {
        console.error('Error cargando frutas:', err);
      }
    };

    loadAllFruits();
  }, []);

  const extractSearchOptions = (fruitsData, type) => {
    if (!fruitsData || fruitsData.length === 0) return;

    const options = fruitsData
      .map(fruit => fruit[type])
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    setSearchOptions(options);
  };

  // Actualizar opciones cuando cambia el tipo de búsqueda
  useEffect(() => {
    if (allFruits.length > 0) {
      extractSearchOptions(allFruits, searchType);
      setSearchValue('');
      setFruits(allFruits);
    }
  }, [searchType, allFruits]);

  // Función para buscar frutas
  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setFruits(allFruits);
      return;
    }

    try {
      const data = await searchFruits(searchType, searchValue);
      setFruits(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Error en búsqueda:', err);
      setFruits([]);
    }
  };

  // Limpiar búsqueda
  const handleClear = () => {
    setSearchValue('');
    setFruits(allFruits);
    clearError();
  };

  // Componente de tarjeta de fruta
  


  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <NavbarComponent props={{
            searchType,
            setSearchType,
            searchValue,
            setSearchValue,
            searchOptions,
            handleSearch,
            handleClear,
            loading,
            error,
            clearError
          }} />
        </div>
      </div>

      {/* Indicadores de estado */}
      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando frutas...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <strong>Error:</strong> {error}
          <button
            type="button"
            className="btn-close"
            onClick={clearError}
          ></button>
        </div>
      )}

      {/* Contador de resultados */}
      {!loading && !error && (
        <div className="row mb-3">
          <div className="col-12">
            <p className="text-muted">
              Mostrando {fruits.length} fruta{fruits.length !== 1 ? 's' : ''}
              {searchValue && ` de ${searchType}: ${searchValue}`}
            </p>
          </div>
        </div>
      )}

      {/* Grid de tarjetas */}
      {!loading && !error && (
        <div className="row">
          {fruits.length > 0 ? (
            fruits.map((fruit, index) => (
              <FruitCard key={`${fruit.name}-${fruit.id || index}`} fruit={fruit} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="text-muted">
                <h5>😔 No se encontraron frutas</h5>
                <p>Intenta con otro criterio de búsqueda</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
