import { useEffect, useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceDiagnosa from "../../api/service/Diagnosa.service";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TableDiagnosa = ({ dataGejala }) => {
  const navigate = useNavigate()
  const [namaKucing, setNamaKucing] = useState('')
  const [user, setUser] = useState({})
  const [dataInput, setDataInput] = useState([])

  const actionData = [
    {
      ID: 0,
      Value: "Tidak"
    },
    {
      ID: 1,
      Value: "Ya"
    },

  ]

  const upsert = (prevData, newGejala) => {
    const existingGejalaIndex = prevData.findIndex(g => g.IDGEJALA === newGejala.IDGEJALA);
    if (existingGejalaIndex === -1) {
      // If Gejala does not exist, add it
      return [...prevData, newGejala];
    } else {
      // If Gejala exists, update it
      return prevData.map(g =>
        g.IDGEJALA === newGejala.IDGEJALA ? newGejala : g
      );
    }
  };

  const handleChange = (gejalaID, value) => {
    const newGejala = { IDGEJALA: gejalaID, VALUE: value };
    setDataInput(prevData => upsert(prevData, newGejala));
  };

  const handleInput = async () => {
    try {

      // console.log(dataInput)
      if(dataInput.length !== dataGejala.length || dataInput === null || namaKucing === '') {
        return SweetAlertService.showError("Isi dengan lengkap !!", "Lengkapi Semua Pertanyaan")
      }
      const data = {
        IDPENYAKIT: "?",
        NAMAKUCING: namaKucing,
        IDUSER: user.IDUSER,
        DAFTARGEJALA: dataInput
      }
      // console.log("input", data)
      
      const response = await ServiceDiagnosa.addDiagnosa(data)
      SweetAlertService.showSuccess('Success', response.message)
      setDataInput([])
      console.log(response)
      navigate(`/hasil-diagnosa/${response.result}`)
      window.location.reload()
    } catch (error) {
      SweetAlertService.showError('Error', error.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access-token')
    const decodeToken = jwtDecode(token)
    setUser(decodeToken)
  }, [])
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="m-4.5 w-100">
        <label className="mb-2.5 block text-black dark:text-white">
          Nama Kucing
        </label>
        <input
          type="text"
          value={namaKucing}
          onChange={(e) => setNamaKucing(e.target.value)}
          placeholder="Masukan Nama Kucing Kamu"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
      <div>
        <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-2 md:col-span-5 items-center sm:flex">
            <p className="font-medium">Nama</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Action</p>
          </div>
        </div>

        {
          dataGejala.map((gejala, index) => { 
          return (
            <div key={index} className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-1 items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{index+1}</p>
              </div>
              <div className="col-span-2 md:col-span-5  items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{gejala.GEJALA}</p>
              </div>
              <div className="col-span-1 flex items-center gap-3">
                <select 
                  onChange={(e) => handleChange(gejala.IDGEJALA, parseInt(e.target.value))}
                  // value={selectedValue}
                  className="appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                ><option>Pilih</option>
                    {
                      actionData.map((item, index) => (
                        <option key={index} value={item.ID}>
                          {item.Value}
                        </option>
                      ))
                    }
                </select>
              </div>
            </div>
          )})
        }
      </div>

      <div className="float-start px-5 py-5">
        <button 
            onClick={handleInput}
            className="bg-primary w-35 rounded font-semibold text-white py-3 px-2"
          >
            Diagnosa
          </button>
      </div>
    </div>
  );
};

export default TableDiagnosa;
