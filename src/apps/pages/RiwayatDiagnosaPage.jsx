import { useEffect, useState } from "react"
import Layout from "./Layout"
import Breadcrumb from "../components/Breadcrump"
import SweetAlertService from "../helper/sweetalertService"
import ServiceDiagnosa from "../api/service/Diagnosa.service"
import TableRiwayatDiagnosa from "../components/Table/TableRiwayatDiagnosa"
import { jwtDecode } from "jwt-decode"

const RiwajatDiagnosa = () => {
  const [dataGejala, setDataGejala] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('access-token')
    const decodeToken = jwtDecode(token)

    const getGejala = async () => {
      try {
        const response = await ServiceDiagnosa.getDiagnosaByIdUser(decodeToken.IDUSER)
        setDataGejala(response.data)
        console.log(response)
      } catch (error) {
        SweetAlertService.showError('Error', error.message)
      }
    }
    getGejala()
  }, [])

  return(
    <Layout>
      <Breadcrumb pageName="Halaman Riwayat Diagnosa" />
      <div className="flex flex-col gap-10">
        <TableRiwayatDiagnosa dataGejala={dataGejala}/>
      </div>
    </Layout>
  )
}

export default RiwajatDiagnosa