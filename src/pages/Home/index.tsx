import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useContext } from 'react'
import { CountDown } from './components/CountDown'
import { FormProvider, useForm } from 'react-hook-form'
import { NewCycleForm } from './components/NewCycleForm'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm()

  const { handleSubmit, watch, reset }: any = newCycleForm

  function handleCreateNewCycle(data: any) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task || !minutesAmount

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
