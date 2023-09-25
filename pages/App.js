import React from 'react'
import HomePage from './HomePage/page'
import Link from 'next/link'
import { BrowserRouter, Routes,Route, useRouter } from 'next/router'

const App = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
        <Link href='/Homepage'>Home</Link>
        <Link href='/Create'>Create</Link>
        <Update id={id} />
    </div>
  )
}

export default App