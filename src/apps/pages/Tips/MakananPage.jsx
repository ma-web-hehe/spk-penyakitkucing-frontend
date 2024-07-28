import Layout from "../Layout"
import Breadcrumb from "../../components/Breadcrump"
import TableMakanan from "../../components/Table/TableMakanan"

const MakananPage = () => {

  return(
    <Layout>
      <Breadcrumb pageName="Halaman Makanan" />
      <div className="flex flex-col gap-10">
        <TableMakanan />
      </div>
    </Layout>
  )
}

export default MakananPage