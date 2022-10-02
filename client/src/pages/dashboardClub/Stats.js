import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainerClub, Loading, ChartsContainer } from '../../components'

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainerClub />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats
