import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaPlaneDeparture,
} from "react-icons/fa";
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: "completed projects",
      count: stats.completed || 0,
      icon: <FaCalendarCheck />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "projects planned",
      count: stats.planned || 0,
      icon: <FaSuitcaseRolling />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "projects ongoing",
      count: stats.ongoing || 0,
      icon: <FaPlaneDeparture />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
