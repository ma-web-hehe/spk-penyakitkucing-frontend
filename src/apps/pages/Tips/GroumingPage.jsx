import Layout from "../Layout"
import Breadcrumb from "../../components/Breadcrump"
import TableGrouming from "../../components/Table/TableGrouming"

const GroumingPage = () => {

  return(
    <Layout>
      <Breadcrumb pageName="Halaman Grouming" />
      <div className="flex flex-col gap-10">
        <TableGrouming />
      </div>
    </Layout>
  )
}

export default GroumingPage