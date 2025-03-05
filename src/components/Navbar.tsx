import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className='d-flex justify-content-between py-3 px-5 border-bottom'>
            <div>Logo</div>
            <Link href='/panier' className='text-decoration-none'>
                Panier <i className='bi bi-basket2-fill'></i>
            </Link>
        </div>
    )
}