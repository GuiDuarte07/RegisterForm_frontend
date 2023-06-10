import IMask from 'imask'

export function phoneNumberMask(number: string): IMask.MaskedPattern<string> {
  const mask = new IMask.MaskedPattern({ mask: '(00) 00000-0000' })

  mask.unmaskedValue = number ?? ''

  return mask
}

export function cpfMask(cpf: string): IMask.MaskedPattern<string> {
  const mask = new IMask.MaskedPattern({ mask: '000.000.000-00' })

  mask.unmaskedValue = cpf ?? ''

  return mask
}

export function cepMask(cep: string): IMask.MaskedPattern<string> {
  const mask = new IMask.MaskedPattern({ mask: '00000-000' })

  mask.unmaskedValue = cep ?? ''

  return mask
}
