import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavbarComponent = ({props}) => {
  return (
    <Container className="card mb-4">
      <div className="card-body">
        <div className="row align-items-end">
          <div className="col-md-3">
            <select
              placeholder="Buscar por:"
              className="form-select rounded-pill"
              value={props.searchType}
              onChange={(e) => props.setSearchType(e.target.value)}
            >
              <option value="">Filter by:</option>
              <option value="family">Family</option>
              <option value="order">Order</option>
              <option value="genus">Genus</option>
            </select>
          </div>
          <div className="col-md-5">
            <select
              className="form-select rounded-pill"
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
          </div>

          <div className="col-md-2">
            <Button
              className="btn btn-light rounded-pill"
              onClick={props.handleSearch}
              disabled={props.loading}
            >
              {props.loading ? 'Buscando...' : 'Search'}
            </Button>
          </div>
          
          <div className="col-md-2">
            <Button
              className="btn btn-outline-danger bg-light rounded-circle"
              onClick={props.handleClear}
            >
              X
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};