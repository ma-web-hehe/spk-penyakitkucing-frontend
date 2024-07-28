import Layout from "../Layout"
import Breadcrumb from "../../components/Breadcrump"
import TableVaksin from "../../components/Table/TableVaksin"

const VaksinPage = () => {

  return(
    <Layout>
      <Breadcrumb pageName="Halaman Vaksin" />
      <div className="flex flex-col gap-10">
        <TableVaksin />
      </div>
    </Layout>
  )
}

export default VaksinPage