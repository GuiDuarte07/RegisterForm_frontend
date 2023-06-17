type CepAddress = {
  cep: string | undefined
  logradouro: string | undefined
  complemento: string | undefined
  bairro: string | undefined
  localidade: string | undefined
  uf: string | undefined
  ibge: string | undefined
  gia: string | undefined
  ddd: string | undefined
  siafi: string | undefined
  erro: boolean | undefined
}

export interface ICepAddressUtil {
  cep: string
  logradouro: string | undefined
  complemento: string | undefined
  bairro: string | undefined
  localidade: string | undefined
  uf: string | undefined
}

export interface ICepSetValues {
  localidade: string | undefined
  bairro: string | undefined
  logradouro: string | undefined
  complemento: string | undefined
  uf: string | undefined
}

export async function getCepData(cep: string): Promise<CepAddress> {
  try {
    console.log('fez uma requisicao')
    const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const cepAddress = await data.json()
    return cepAddress
  } catch (e) {
    return {
      erro: true,
      cep: undefined,
      logradouro: undefined,
      complemento: undefined,
      bairro: undefined,
      localidade: undefined,
      uf: undefined,
      ibge: undefined,
      gia: undefined,
      ddd: undefined,
      siafi: undefined,
    }
  }
}
