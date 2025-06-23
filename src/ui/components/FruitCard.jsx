import './styles.scss';
import { getFruitImage } from '../../fruits/helpers/getFruitImages.js';

export const FruitCard = ({ fruit, isFavorite, toggleFavorite }) => {
  const {
    name,
    family,
    order,
    genus,
    nutritions = {},
  } = fruit;

  const nutritionItems = [
    { label: 'Calories', value: nutritions.calories },
    { label: 'Fat', value: nutritions.fat },
    { label: 'Sugar', value: nutritions.sugar },
    { label: 'Carbohydrates', value: nutritions.carbohydrates },
    { label: 'Protein', value: nutritions.protein },
  ];

  const imageSrc = getFruitImage(name);

  return (
    <div className="card p-0 shadow-sm rounded-4 card-fruit-container">
      <div className="position-relative">
        <img
          src={imageSrc}
          alt={name}
          className="img-fluid rounded-top-4 mb-3"
          loading="lazy"
        />
        <button
          onClick={() => toggleFavorite(name)}
          className='btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle btn-light'
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          style={{ zIndex: 2 }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

      </div>

      <div className="card-body py-1">
        <p className="card-title fw-normal fs-4 sec-color">{name}</p>
        <div className="d-flex flex-row gap-1">
          <div className="d-flex flex-column gap-1 card-text">
            <strong>Family:</strong>
            <p className="text-truncate fruit-text">{family}</p>
          </div>
          <div className="d-flex flex-column gap-1 card-text">
            <strong>Order:</strong>
            <p className="text-truncate fruit-text">{order}</p>
          </div>
          <div className="d-flex flex-column gap-1 card-text">
            <strong>Genus:</strong>
            <p className="text-truncate fruit-text">{genus}</p>
          </div>
        </div>
        <p className="secondary-color nutritions-title mt-3">Nutritions</p>
        <div className="nutritions-data-container">
          {nutritionItems.map(({ label, value }) => (
            <div
              key={label}
              className="d-flex flex-row w-100 justify-content-between nutritions-data-item"
            >
              <p>{label}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

