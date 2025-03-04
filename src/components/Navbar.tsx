import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='d-flex justify-content-space'>
        Logo
        <Link href={'/panier'}>Panier </Link>
    </div>
  )
}