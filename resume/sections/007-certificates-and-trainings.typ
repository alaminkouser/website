#let certificates-and-trainings(data, BODY) = {
  [
    == Certificates & Trainings
  ]
  for item in data.certificates_and_trainings [
    - #link(item.link)[*#item.name* \u{eb15}]
      ---
      #item.provider
      #h(1fr)
      #text(style: "italic")[
        #datetime(
          year: int(item.date.split("-").at(0)),
          month: int(item.date.split("-").at(1)),
          day: int(item.date.split("-").at(2)),
        ).display("[month repr:long] [year]")
      ]
  ]
  BODY
}
