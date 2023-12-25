import { NFT } from "."

interface IssuerNftsResponse {
  "info": {
    "ledger_index": number,
    "ledger_hash": string,
    "ledger_close": string,
    "ledger_close_ms": number
  },
  "data": {
    "issuer": string,
    "nfts": NFT[]
  }
}

interface IssuerTaxonNftsResponse {
  "info": {
    "ledger_index": number,
    "ledger_hash": string,
    "ledger_close": string,
    "ledger_close_ms": number
  },
  "data": {
    "issuer": string,
    "taxon": number,
    "nfts": NFT[]
  }
}

type NFTResponse = NFT[]

export const fetchIssuerNfts = async (issuer: string): Promise<NFTResponse> => {
  const response = await fetch(`https://api.xrpldata.com/api/v1/xls20-nfts/issuer/${issuer}`)
  const json = await response.json() as IssuerNftsResponse
  return json.data.nfts
}

export const fetchIssuerTaxonNfts = async (issuer: string, taxon: number):Promise<NFTResponse> => {
  const response = await fetch(`https://api.xrpldata.com/api/v1/xls20-nfts/issuer/${issuer}/taxon/${taxon}`)
  const json = await response.json() as IssuerTaxonNftsResponse
  return json.data.nfts
}
