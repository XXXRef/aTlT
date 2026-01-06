import settings from '../../settings.json'
import '../../styles.css'


const { rewardsInfo } = settings


const Reward = ({ rankID }) => {
  if (rankID == null) return null
  const r = rewardsInfo[rankID]
  return (
    <div id="div_reward">
      <div id="div_reward_rank">Rank: <b>{r.rank}</b></div>
      <hr />
      <div id="div_reward_icon"><img src={r.icon} alt={r.rank} /></div>
      <hr />
      <div id="div_reward_description">{r.description}</div>
    </div>
  )
}


export default Reward;
