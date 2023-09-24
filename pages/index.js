import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomePage from './HomePage/page'
import Login from './auth/Login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Login/>
    </main>
  )
}
