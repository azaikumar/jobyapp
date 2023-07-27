import './index.css'

const Skills = props => {
  const {skillsListDetails} = props
  const {imageUrl, name} = skillsListDetails

  return (
    <li className="skills">
      <img src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
