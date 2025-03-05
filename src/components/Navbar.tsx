import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className='d-flex justify-content-between py-3 px-0 px-lg-5 border-bottom'>
            <div className='ms-5'>Logo</div>
            <Link href='/panier' className='text-decoration-none text-dark me-5 fw-medium'>
                Panier <i className='bi bi-basket2-fill'></i>
            </Link>
        </div>
    )
}