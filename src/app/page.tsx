"use client";

import BasicDatePicker from "@/components/BasicDatePicker";
import { cpfMask, phoneNumberMask } from "@/utils/mask";

import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { useState } from "react";

const steps = [
  'Dados Pessoas',
  'Endereço',
  'Informações de acesso',
];
console.log(phoneNumberMask("041999714703"))

export default function Home(): JSX.Element {
  const [phone, setPhone] = useState("");
  const [cpf, setCPF] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  
  const handleNextActiveStep = (): void => {
    setActiveStep(state => state+1);
    if(activeStep === 3) {
      // executar função de finalização
    }
  }

  return  (
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

      <form className='flex gap-2 flex-col my-8'>  
        <TextField id='outlined-basic' error helperText='Só pode conter letras' label='Nome' variant='outlined' required />

        <TextField id='outlined-basic' label='Sobrenome' variant='outlined' required/>

        <TextField  variant='outlined' value={phoneNumberMask(phone)} onChange={(e) => { setPhone(e.target.value); }} id='outlined-require' label='Telefone' required  />

        <TextField id='outlined-basic' label='CPF' variant='outlined' required value={cpfMask(cpf)} onChange={(e) => { setCPF(e.target.value); }}/>

        <BasicDatePicker/>


        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>Gênero</FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='male'
            name='radio-buttons-group'
          >
            <FormControlLabel value='female' control={<Radio />} label='Feminino' />
            <FormControlLabel value='male' control={<Radio />} label='Masculino' />
            <FormControlLabel value='other' control={<Radio />} label='Outro' />
          </RadioGroup>
      </FormControl>

      <Button type='submit' onClick={handleNextActiveStep}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
      </form>
      </Stack>
    </Grid>
  );
}