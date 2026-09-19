#import "backend/index.typ": backend

#show: backend

#let data = yaml("./data.yaml")
#let AAK_EMAIL = sys.inputs.at("AAK_EMAIL", default: "[AAK_EMAIL]")
#let AAK_PHONE = sys.inputs.at("AAK_PHONE", default: "[AAK_PHONE]")

#let profile = [
  = #data.name
  #text(data.title, size: 1.25em)\
  \u{f015} #data.address\
  #link("tel:" + AAK_PHONE)[\u{f095} #AAK_PHONE]\
  #link("mailto:" + AAK_EMAIL)[\u{f0e0} #AAK_EMAIL]\
  #link(data.website.url)[\u{f0ac} #data.website.view]\
  #link("https://www.linkedin.com/in/" + data.linkedin + "/")[\u{f08c} linkedin.com/in/#data.linkedin]\
  #link("https://github.com/" + data.github)[\u{f09b} github.com/#data.github]
]

#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  [
    #profile
  ],
  [
    #context {
      align(
        right + horizon,
        image("avatar.jpeg", height: measure(profile).height),
      )
    }
  ],
)

#line(length: 100%, stroke: (paint: black, thickness: 0.25pt))

== Professional Summary

#data.professional_summary

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
    - #description
  ]
]
