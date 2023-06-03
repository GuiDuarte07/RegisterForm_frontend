import IMask from 'imask';

export function phoneNumberMask(number: string): any {
  const mask = new IMask.MaskedPattern({mask: '+(000)[0]0000-0000'})

  mask.unmaskedValue = number

  console.log(mask.isComplete)

  return mask.value;
}

export function cpfMask(cpf: string): any {
  const mask = new IMask.MaskedPattern({mask: '000.000.000-00'})

  mask.unmaskedValue = cpf

  return mask.value;
}



