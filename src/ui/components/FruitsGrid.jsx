import { useEffect, useState } from "react";
import { useApi } from "../../fruits/hooks/useApi";
import { FruitCard } from "./FruitCard";
import { NavbarComponent } from "./NavbarComponent";
import { GeneralInformationCard } from "./GeneralInformationCard";

export const FruitsGrid = () => {
  const [fruits, setFruits] = useState([]);
  const [allFruits, setAllFruits] = useState([]);
  const [searchType, setSearchType] = useState("family");
  const [searchValue, setSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [protein, setProtein] = useState(0);
  const [sortAsc, setSortAsc] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const {
    getAllFruits,
    searchFruits,
    loading,
    error,
    clearError,
  } = useApi();

  const calculateNutritionTotals = (fruitsData) => {
    return fruitsData.reduce(
      (acc, fruit) => {
        const n = fruit.nutritions || {};
        acc.calories += n.calories || 0;
        acc.fat += n.fat || 0;
        acc.sugar += n.sugar || 0;
        acc.carbohydrates += n.carbohydrates || 0;
        acc.protein += n.protein || 0;
        return acc;
      },
      { calories: 0, fat: 0, sugar: 0, carbohydrates: 0, protein: 0 }
    );
  };

  const setNutritionStates = ({ calories, fat, sugar, carbohydrates, protein }) => {
    setCalories(calories);
    setFat(fat);
    setSugar(sugar);
    setCarbohydrates(carbohydrates);
    setProtein(protein);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('fruit-favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (fruitName) => {
  const updatedFavorites = favorites.includes(fruitName)
    ? favorites.filter(name => name !== fruitName)
    : [...favorites, fruitName];

  setFavorites(updatedFavorites);
  localStorage.setItem('fruit-favorites', JSON.stringify(updatedFavorites));
};


  useEffect(() => {
    const loadAllFruits = async () => {
      try {
        const data = await getAllFruits();
        setAllFruits(data);
        setFruits(data);
        extractSearchOptions(data, searchType);
        setNutritionStates(calculateNutritionTotals(data));
      } catch (err) {
        console.error("Error cargando frutas:", err);
      }
    };

    loadAllFruits();
  }, []);

  const extractSearchOptions = (fruitsData, type) => {
    if (!fruitsData || fruitsData.length === 0) return;

    const options = fruitsData
      .map((fruit) => fruit[type])
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    setSearchOptions(options);
  };

  useEffect(() => {
    if (allFruits.length > 0) {
      extractSearchOptions(allFruits, searchType);
      setSearchValue("");
      setFruits(allFruits);
      setNutritionStates(calculateNutritionTotals(allFruits));
    }
  }, [searchType, allFruits]);

  const handleSearch = async (customValue) => {
    const value = customValue ?? searchValue;

    if (!value.trim()) {
      setFruits(allFruits);
      setNutritionStates(calculateNutritionTotals(allFruits));
      return;
    }

    try {
      const data = await searchFruits(searchType, value);
      const fruitsResult = Array.isArray(data) ? data : [data];
      setFruits(fruitsResult);
      setNutritionStates(calculateNutritionTotals(fruitsResult));
    } catch (err) {
      console.error("Error en búsqueda:", err);
      setFruits([]);
      setNutritionStates({ calories: 0, fat: 0, sugar: 0, carbohydrates: 0, protein: 0 });
      setVisibleCount(8);
    }


  };

  const handleClear = () => {
    setSearchValue("");
    setFruits(allFruits);
    setNutritionStates(calculateNutritionTotals(allFruits));
    setVisibleCount(8);
  };

  const toggleSortOrder = () => {
    const sorted = [...fruits].sort((a, b) =>
      sortAsc
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );
    setFruits(sorted);
    setSortAsc(!sortAsc);
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const toggleFavoritesView = () => {
    setShowFavoritesOnly(prev => !prev);
    setVisibleCount(8); // reset del paginado
  };

  const fruitsToDisplay = showFavoritesOnly
  ? fruits.filter(fruit => favorites.includes(fruit.name))
  : fruits;

  const hasFruits = fruits.length > 0;

  return (
    <div className="d-flex py-4 justify-content-center flex-row gap-4 fruits-grid-main-container">
        <div className="d-flex flex-column gap-3 nav-grid-fruits-container">
          <div>
            <NavbarComponent
              searchType={searchType}
              setSearchType={setSearchType}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              searchOptions={searchOptions}
              favorites={favorites}
              toggleFavoritesView={toggleFavoritesView}
              showFavoritesOnly={showFavoritesOnly}
              handleSearch={handleSearch}
              handleClear={handleClear}
              toggleSortOrder={toggleSortOrder}
              sortAsc={sortAsc}
              loading={loading}
              error={error}
              clearError={clearError}
            />
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible" role="alert">
              <strong>Error:</strong> {error}
              <button type="button" className="btn-close" onClick={clearError}></button>
            </div>
          )}

          {!loading && !error && (
            <div className="d-flex justify-content-start flex-wrap gap-4 fruits-grid-container">
              {hasFruits ? (
                fruitsToDisplay.slice(0, visibleCount).map((fruit, index) => (
                  <FruitCard
                    key={`${fruit.name}-${fruit.id || index}`}
                    fruit={fruit}
                    isFavorite={favorites.includes(fruit.name)}
                    toggleFavorite={toggleFavorite}
                  />
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="text-muted">
                    <h5>😔 There are no fruits</h5>
                    <p>Try with another search criteria</p>
                  </div>
                </div>
              )}
            </div>
          )}
          {visibleCount < fruits.length && (
            <div className="text-center w-100">
              <button
                className="btn btn-outline-dark mt-3 rounded-pill text-uppercase"
                onClick={handleShowMore}
              >
                See more
              </button>
            </div>
          )}
        </div>

      {hasFruits && (
        <div className="card rounded-4 p-3 general-information-card">
          <GeneralInformationCard
            fruits={fruits.length}
            calories={calories.toFixed(2)}
            fat={fat.toFixed(2)}
            sugar={sugar.toFixed(2)}
            carbohydrates={carbohydrates.toFixed(2)}
            protein={protein.toFixed(2)}
            searchValue={searchValue}
            searchType={searchType}
            loading={loading}
            error={error}
          />
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading fruits...</p>
        </div>
      )}
    </div>

  );
};
