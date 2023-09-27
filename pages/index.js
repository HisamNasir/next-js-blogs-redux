import { Inter } from 'next/font/google'
import login from './login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <login/>
    </main>
  )
}
