import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

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