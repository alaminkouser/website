#let work-experiences(data, BODY) = {
  [
    == Work Experiences
    #for experience in data.work_experiences [
      === #experience.title #text(weight: "regular")[
        ---
        #experience.company | #text(experience.location, style: "italic")
        #h(1fr)
        #text(style: "italic")[
          #datetime(
            year: int(experience.start_date.split("-").at(0)),
            month: int(experience.start_date.split("-").at(1)),
            day: int(experience.start_date.split("-").at(2)),
          ).display("[month repr:long] [year]")
          ---
          #if (experience.end_date == "Present") [
            Present
          ] else [
            #datetime(
              year: int(experience.end_date.split("-").at(0)),
              month: int(experience.end_date.split("-").at(1)),
              day: int(experience.end_date.split("-").at(2)),
            ).display("[month repr:long] [year]")
          ]
        ]
      ]
      #for description in experience.description [
        - #eval(description, mode: "markup")
      ]
    ]
  ]
  BODY
}
