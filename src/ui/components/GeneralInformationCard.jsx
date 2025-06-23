import './styles.scss'

export const GeneralInformationCard = ({ fruits, calories, fat, sugar, carbohydrates, protein, loading, error }) => {
  return (
    !loading && !error ? (
      <div className="general-information-card">
        <p className='sec-color'>General Information</p>

        <div className='general-info-data-container'>
          <div className="d-flex flex-row w-100 mb-0 justify-content-between nutritions-data-item">
            <p className="text-muted">
              No. Of Found Products:
            </p>
            <p>
              {fruits}
            </p>
          </div>
          <p className='sec-color'>Nutritional properties of found products</p>
          <div className="d-flex flex-row w-100 mb-0 justify-content-between nutritions-data-item">
            <p className="text-muted">
              Total Calories:
            </p>
            <p>
              {calories}
            </p>
          </div>
          <div className="d-flex flex-row w-100 mb-0 justify-content-between nutritions-data-item">
            <p className="text-muted">
              Total Fats:
            </p>
            <p>
              {fat}
            </p>
          </div>
          <div className="d-flex flex-row w-100 mb-0 justify-content-between nutritions-data-item">
            <p className="text-muted">
              Total Sugar:
            </p>
            <p>
              {sugar}
            </p>
          </div>
          <div className="d-flex flex-row w-100 mb-0 justify-content-between nutritions-data-item">
            <p className="text-muted">
              Total Carbohydrates:
            </p>
            <p>
              {carbohydrates}
            </p>
          </div>
          <div className="d-flex flex-row w-100 mb-0 justify-content-between nutritions-data-item">
            <p className="text-muted">
              Total Protein:
            </p>
            <p>
              {protein}
            </p>
          </div>
        </div>
      </div>
    ) : null
  )
}
