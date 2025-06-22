import { Container } from "react-bootstrap"
import './FruitsPage.scss'
import { FruitsGrid } from "../../ui/components/FruitsGrid"

export const FruitsPage = () => {
  return (
    <>
      <Container fluid className="align-items-center justify-content-center text-center" >
        <h1 className="fw-bold title">Season fruits</h1>
        <p className="text-uppercase fw-normal fs-4 lh-lg subtitle">the most wonderful fruits</p>
      </Container>
      <Container>
        <FruitsGrid />
      </Container>
    </>
  )
}
