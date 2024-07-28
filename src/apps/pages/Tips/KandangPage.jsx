import Layout from "../Layout"
import Breadcrumb from "../../components/Breadcrump"
import TableKandang from "../../components/Table/TableKandang"

const KandangPage = () => {

  return(
    <Layout>
      <Breadcrumb pageName="Halaman Kandang" />
      <div className="flex flex-col gap-10">
        <TableKandang />
      </div>
    </Layout>
  )
}

export default KandangPage