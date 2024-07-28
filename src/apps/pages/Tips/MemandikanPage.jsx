import Layout from "../Layout"
import Breadcrumb from "../../components/Breadcrump"
import TableMemandikan from "../../components/Table/TableMemandikan"

const MemandikanPage = () => {

  return(
    <Layout>
      <Breadcrumb pageName="Halaman Memandikan" />
      <div className="flex flex-col gap-10">
        <TableMemandikan />
      </div>
    </Layout>
  )
}

export default MemandikanPage