import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

export const NavbarComponent = ({
  searchType,
  setSearchType,
  searchValue,
  setSearchValue,
  searchOptions,
  handleSearch,
  favorites,
  toggleFavoritesView,
  showFavoritesOnly,
  handleClear,
  toggleSortOrder,
  sortAsc
}) => {
  const searchLabel = searchType === 'family'
    ? 'Family'
    : searchType === 'order'
    ? 'Order'
    : 'Genus';

  const handleSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <Nav className="card d-flex flex-sm-column flex-md-row gap-3 border-0 px-4 p-md-0 justify-content-center justify-content-md-end align-items-center">
      <select
        className="form-select rounded-pill selector-item"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option className='option-item' value="">Filter by:</option>
        <option className='option-item' value="family">Family</option>
        <option className='option-item' value="order">Order</option>
        <option className='option-item' value="genus">Genus</option>
      </select>

      <select
        className="form-select  rounded-pill selector-item"
        value={searchValue}
        onChange={handleSearchValueChange}
        disabled={searchOptions.length === 0}
      >
        <option value="">Select {searchLabel}</option>
        {searchOptions.map((option) => (
          <option className='option-item' key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {
        favorites.length > 0 && (
          <Button
            className="btn-outline-light bg-transparent border-black text-dark w-100 rounded-pill navbar-button"
            onClick={toggleFavoritesView}
          >
              {showFavoritesOnly ? 'See all' : 'See favorites'}
          </Button>
        )
      }

      <Button
        className="btn-outline-danger bg-transparent rounded-pill navbar-button"
        onClick={handleClear}
      >
        Reset Search
      </Button>
      <Button
        className="btn-outline-light bg-transparent border-black text-dark rounded-pill navbar-button"
        onClick={toggleSortOrder}
        title={`Sort ${!sortAsc ? 'Z-A' : 'A-Z'}`}
      >
        {!sortAsc ? 'Order A-Z' : 'Order Z-A'}
      </Button>
    </Nav>
  );
};
