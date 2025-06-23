import { Container } from "react-bootstrap"
import './FruitsPage.scss'
import { FruitsGrid } from "../../ui/components/FruitsGrid"
import { GeneralInformationCard } from "../../ui/components"

export const FruitsPage = () => {
  return (
    <div className="fruits-page d-flex flex-column align-items-center justify-content-center">
      <div className="align-items-center justify-content-center text-center" >
        <h1 className="fw-bold title">Season fruits</h1>
        <p className="text-uppercase fw-normal fs-4 lh-lg secondary-color">the most wonderful fruits</p>
      </div>
      <FruitsGrid />
    </div>
  )
}
