#let technical-skills(data, BODY) = {
  [
    == Technical Skills
    #for skill in data.technical_skills [
      #strong(skill.domain):
      #for item in skill.items [
        #item#if item != skill.items.last() [, ]
      ]\
    ]
  ]
  BODY
}
