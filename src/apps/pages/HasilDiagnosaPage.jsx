import { useEffect, useState } from "react"
import Layout from "./Layout"
import Breadcrumb from "../components/Breadcrump"
import SweetAlertService from "../helper/sweetalertService"
import { useParams } from "react-router-dom"
import ServicePenyakit from "../api/service/Penyakit.service"
import TableHasilDiagnosa from "../components/Table/TableHasilDiagnosa"

const HasilDiagnosa = () => {
  const { IDPENYAKIT } = useParams()
  const [detaPenyakit, setDataPenyakit] = useState([])

  const getPenyakit = async () => {
    try {
      const response = await ServicePenyakit.getPenyakitById(IDPENYAKIT)
      setDataPenyakit(response.data)
      console.log(response)
    } catch (error) {
      SweetAlertService.showError('Error', error.message)
    }
  }

  useEffect(() => {
    getPenyakit()
  }, [])

  return(
    <Layout>
      <Breadcrumb pageName="Halaman Diagnosa" />
      <div className="flex flex-col gap-10">
        {/* <!-- Alerts Item --> */}
        <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                  fill="white"
                  stroke="white"
                ></path>
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                Sukses Melakukan Diagnosa !!!
              </h5>
              <p className="text-base leading-relaxed text-body">
                Berdasarkan data gejala yang anda kirimkan, Kucing anda kemungkinan besar menderita : <b>{detaPenyakit.PENYAKIT}</b>
              </p>
            </div>
          </div>
        <TableHasilDiagnosa dataGejala={detaPenyakit}/>
      </div>
    </Layout>
  )
}

export default HasilDiagnosa