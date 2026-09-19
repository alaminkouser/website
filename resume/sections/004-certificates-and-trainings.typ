#let certificates-and-trainings(data, BODY) = {
  [
    == Certificates and Trainings
  ]
  for item in data.certificates_and_trainings [
    - #link(item.link)[#item.name] --- #item.provider #h(1fr) #text(style: "italic")[#item.date]
  ]
  BODY
}
