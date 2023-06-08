'use client'

import BasicDatePicker from '@/components/BasicDatePicker'
import { cpfMask, phoneNumberMask } from '@/utils/mask'

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const steps = ['Dados Pessoas', 'Endereço', 'Informações de acesso']
console.log(phoneNumberMask('041999714703'))

const schemaForm = z.object({
  personal: z.object({
    firstName: z
      .string()
      .min(4, 'Insira um nome válido')
      .regex(/^[\ul]+$/, 'Só pode conter letras'),
    lastName: z
      .string()
      .min(10, 'Insira um nome válido')
      .regex(/^[\ul]+$/, 'Só pode conter letras'),
    phone: z
      .string().
      length(9, 'Quantidade de digítos inválidos')
      .regex(/^\d+$/, 'Só pode conter números'),
    cpf: z
      .string()
      .length(11, 'Insira um cpf válido'),
    bornDate: z.date(),
    gender: z.enum(['male', 'female', 'other'])
  }),
  address: z.object({
    cep: z.string().length(8, 'Insira um cep válido'),
    city: z.string().min(3, 'Tamanho minimo desse campo e 3').max(60, 'Quantidade de digitos ultrapassou o limite'),
    uf: z.string().length(2, 'Insira uma UF valida'),
    district: z.string().min(3, 'Tamanho minimo desse campo e 3').max(60, 'Quantidade de digitos ultrapassou o limite'),
    street: z.string().min(3, 'Tamanho minimo desse campo e 3').max(60, 'Quantidade de digitos ultrapassou o limite'),
    streetNumber: z.string().regex(/^\d+$/, 'Só pode conter números'),
    complement: z.string().max(60, 'Quantidade de digitos ultrapassou o limite').optional(),
  }),
  account: z.object({
    email: z.string().email('Insira um e-mail válido'),
    password: z.string(),
    passwordConfirm: z.string(),
  })
}).refine((data) => data.account.password === data.account.passwordConfirm, {
  message: "As senhas não conferem",
  path: ["confirm"], // path of error
});

type FormProps = z.infer<typeof schemaForm>

export default function Home(): JSX.Element {
  const { control, handleSubmit } = useForm<FormProps>()
  const [activeStep, setActiveStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleNextActiveStep = (): void => {
    setActiveStep((state) => state + 1)
    if (activeStep === 3) {
      // executar função de finalização
    }
  }

  const handlePrevActiveStep = (): void => {
    setActiveStep((state) => state - 1)
  }

  return (
    <Grid container className='p-2 bg-white flex justify-center items-center h-screen'>
      <Stack className='border-gray-500 border flex' direction='column' columnGap={1}>
        <h1>Cadastre-se na nossa plataforma</h1>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form className='flex gap-2 flex-col my-8' onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <>
              <Controller
                name='personal.firstName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='outlined-basic'
                    error
                    helperText='Só pode conter letras'
                    label='Nome'
                    variant='outlined'
                    required
                  />
                )}
              />
              <Controller
                name='personal.lastName'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='Sobrenome' variant='outlined' required />
                )}
              />

              <Controller
                name='personal.phone'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    /* value={phoneNumberMask(phone)}
                    onChange={(e) => {
                      setPhone(e.target.value)
                    }} */
                    id='outlined-require'
                    label='Telefone'
                    required
                  />
                )}
              />

              <Controller
                name='personal.cpf'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='outlined-basic'
                    label='CPF'
                    variant='outlined'
                    required
                    /* value={cpfMask(cpf)}
                    onChange={(e) => {
                      setCPF(e.target.value)
                    }} */
                  />
                )}
              />

              <Controller
                name='personal.bornDate'
                control={control}
                render={({ field }) => <BasicDatePicker fields={field} />}
              />

              <FormControl>
                <FormLabel id='demo-radio-buttons-group-label'>Gênero</FormLabel>
                <Controller
                  name='personal.gender'
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='male'
                      name='radio-buttons-group'
                    >
                      <FormControlLabel value='female' control={<Radio />} label='Feminino' />
                      <FormControlLabel value='male' control={<Radio />} label='Masculino' />
                      <FormControlLabel value='other' control={<Radio />} label='Outro' />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Controller
                name='address.cep'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='CEP' variant='outlined' required />
                )}
              />
              <Controller
                name='address.city'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='Cidade' variant='outlined' required />
                )}
              />
              <Controller
                name='address.uf'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='UF' variant='outlined' required />
                )}
              />
              <Controller
                name='address.district'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='Bairro' variant='outlined' required />
                )}
              />
              <Controller
                name='address.street'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='Rua' variant='outlined' required />
                )}
              />
              <Controller
                name='address.streetNumber'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='Número' variant='outlined' required />
                )}
              />
              <Controller
                name='address.complement'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='Complemento' variant='outlined' />
                )}
              />
            </>
          )}

          {activeStep === 2 && (
            <>
              <Controller
                name='account.email'
                control={control}
                render={({ field }) => (
                  <TextField {...field} id='outlined-basic' label='E-mail' variant='outlined' required />
                )}
              />

              <FormControl variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>Senha *</InputLabel>
                <Controller
                  name='account.password'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      required
                      {...field}
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => {
                              setShowPassword((state) => !state)
                            }}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                    />
                  )}
                />
              </FormControl>

              <FormControl variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password-confirm'>Confirmar senha *</InputLabel>

                <Controller
                  name='account.passwordConfirm'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      required
                      {...field}
                      id='outlined-adornment-password-confirm'
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => {
                              setShowPassword((state) => !state)
                            }}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                    />
                  )}
                />
              </FormControl>
            </>
          )}

          <div className='flex gap-8 justify-end'>
            {activeStep !== 0 && <Button onClick={handlePrevActiveStep}>Voltar</Button>}
            <Button type={activeStep === 2 ? 'submit': 'button'} onClick={handleNextActiveStep}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Proximo'}
            </Button>
          </div>
        </form>
      </Stack>
    </Grid>
  )
}
