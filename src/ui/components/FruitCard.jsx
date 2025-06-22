export const FruitCard = ({ fruit }) => (

  <div className="col-md-4 mb-4">
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">{fruit.name}</h5>
        <div className="mb-3">
          <small className="text-muted">
            <strong>Familia:</strong> {fruit.family}<br />
            <strong>Orden:</strong> {fruit.order}<br />
            <strong>Género:</strong> {fruit.genus}
          </small>
        </div>
        {fruit.nutritions && (
          <div className="nutrition-info">
            <h6 className="text-secondary mb-2">Nutrición (por 100g):</h6>
            <div className="row text-sm">
              <div className="col-6">
                <span className="badge bg-light text-dark me-1">Cal:</span>
                <span>{fruit.nutritions.calories}</span>
              </div>
              <div className="col-6">
                <span className="badge bg-light text-dark me-1">Azúcar:</span>
                <span>{fruit.nutritions.sugar}g</span>
              </div>
              <div className="col-6 mt-1">
                <span className="badge bg-light text-dark me-1">Fibra:</span>
                <span>{fruit.nutritions.fiber}g</span>
              </div>
              <div className="col-6 mt-1">
                <span className="badge bg-light text-dark me-1">Prot:</span>
                <span>{fruit.nutritions.protein}g</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);