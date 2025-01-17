export interface Fornecedor {
    id?: number
    companyName: string
    contactName: string
    contactTitle: string
    address: Address
  }
  
  export interface Address {
    street: string
    city: string
    region: string
    postalCode: number
    country: string
    phone: string
  }
  