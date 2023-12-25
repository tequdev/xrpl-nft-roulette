'use client'
import Roulette from '@/components/Roulette'
import { NFT } from '@/libs'
import { fetchIssuerNfts, fetchIssuerTaxonNfts } from '@/libs/xrpldata'
import { useState } from 'react'
import { isValidClassicAddress,  } from 'xrpl'

export default function Home() {
  const [holders, setHolders] = useState<NFT[]>([])
  const [issuer, setIssuer] = useState('')
  const [taxon, setTaxon] = useState<string>('')
  const [loading, setLoading] = useState(false)
  
  const handleIssuerInpt = (e: React.ChangeEvent<HTMLInputElement>) => { setIssuer(e.target.value) }
  const handleTaxonInpt = (e: React.ChangeEvent<HTMLInputElement>) => { setTaxon(e.target.value) }
  const handleSearch = async () => {
    if (!isValidClassicAddress(issuer)) {
      alert('Invalid r-Address')
      return
    }
    if (taxon !== '' && (Number.isNaN(parseInt(taxon)) || (parseInt(taxon) < 0 || parseInt(taxon) > 0xFFFFFFFF))) {
      alert('Invalid Taxon')
      return
    }
    try {
      
      setLoading(true)
      const data = taxon === '' ? await fetchIssuerNfts(issuer) : await fetchIssuerTaxonNfts(issuer, parseInt(taxon))
      setLoading(false)
      setHolders(data)
      if(data.length === 0) {
        alert('No NFT found.')
      }
    } catch (e) {
      setLoading(false)
      setHolders([])
      alert('An error has occurred. Please try again in a few minutes.')
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center space-y-3 p-24">
      <h1 className="text-4xl font-bold mb-4">XRPL NFT Roulette</h1>
      <input type="text" placeholder="*Issuer r-Address" className="input input-bordered w-full max-w-xs" value={issuer} onInput={handleIssuerInpt} />
      <input type="text" placeholder="NFT Taxon" className="input input-bordered w-full max-w-xs" value={taxon || ''} onInput={handleTaxonInpt} />
      <button type='button' className='btn w-24' onClick={handleSearch}>{!loading ? 'Search' : <span className="loading loading-spinner loading-xs" />}</button>
      
      <Roulette items={holders} />
    </main>
  )
}
