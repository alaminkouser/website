#let technical-skills(data, BODY) = {
  [
    = Technical Skills
    #for skill in data.technical_skills [
      #strong(skill.domain):
      #skill.items.join(", ")\
    ]
  ]
  BODY
}
