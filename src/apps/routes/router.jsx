import { createBrowserRouter } from "react-router-dom";
import { page } from '../pages'
import {RequireAuth, RequireRole} from "./utils/requireAuth";

const router = createBrowserRouter([
  {
    path: '/login',
    element: page.loginpage
  },
  {
    path: '/sign-up',
    element: page.signup
  },
  {
    path: '/',
    element: <RequireAuth redirectPath="/login" />,
    children: [
      {
        path: '/',
        element: page.homepage
      },
      {
        path: '/profile',
        element: page.profile
      },
      {
        path: '/diagnosa',
        element: page.diagnosaPage
      },
      {
        path: '/riwajat-diagnosa',
        element: page.riwajatDiagnosa
      },
      {
        path: '/hasil-diagnosa/:IDPENYAKIT',
        element: page.hasilDiagnosa
      },
      {
        path: '/penyakit',
        element: page.penyakit
      },
      {
        path: '/gejala',
        element: page.gejalaPage
      },
      {
        path: '/tips/grouming',
        element: page.grouming
      },
      {
        path: '/tips/makananan',
        element: page.makanan
      },
      {
        path: '/tips/kandang',
        element: page.kandang
      },
      {
        path: '/tips/memandikan',
        element: page.memandikan
      },
      {
        path: '/tips/vaksin',
        element: page.vaksin
      },
    ]
  },
  {
    path: '/',
    element: <RequireRole allowedRoles={['1']} redirectPath="/" />,
    children: [
      {
        path: '/users',
        element: page.users
      },
      {
        path: '/rules',
        element: page.rulesPage
      },
    ]
  }
])

export default router