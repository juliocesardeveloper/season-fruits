import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavbarComponent = ({props}) => {
  return (
    <Nav className="card d-flex flex-row gap-3 border-0 justify-content-end align-items-center">
      <select
        placeholder="Buscar por:"
        className="form-select w-25 rounded-pill"
        value={props.searchType}
        onChange={(e) => props.setSearchType(e.target.value)}
      >
        <option value="">Filter by:</option>
        <option value="family">Family</option>
        <option value="order">Order</option>
        <option value="genus">Genus</option>
      </select>

      <select
        className="form-select w-25 rounded-pill"
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
        disabled={props.searchOptions.length === 0}
      >
        <option value="">
          Select {props.searchType === 'family' ? 'Family' :
          props.searchType === 'order' ? 'Order' : 'Genus'}
        </option>
        {props.searchOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <Button
        className="btn btn-light rounded-pill"
        onClick={props.handleSearch}
        disabled={props.loading}
      >
        {props.loading ? 'Buscando...' : 'Search'}
      </Button>

      <Button
        className="btn btn-outline-danger bg-light rounded-circle"
        onClick={props.handleClear}
      >
        X
      </Button>
    </Nav>
  );
};