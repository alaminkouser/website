#import "backend/index.typ": backend

#show: backend

#let data = yaml("data.yaml")
#let AAK_EMAIL = sys.inputs.at("AAK_EMAIL", default: "[AAK_EMAIL]")
#let AAK_PHONE = sys.inputs.at("AAK_PHONE", default: "[AAK_PHONE]")

= #data.name

#align(center, text(size: 10pt)[#data.affiliation])
#align(center, text(size: 10pt)[
  \u{f015} #data.address
  | #link("tel:" + AAK_PHONE)[\u{f095} #AAK_PHONE]
  | #link("mailto:" + AAK_EMAIL)[\u{f0e0} #AAK_EMAIL]
  #linebreak()
  #link(data.website.url)[\u{f0ac} #data.website.view]
  | #link("https://linkedin.com/in/" + data.linkedin + "/")[\u{f08c} #data.linkedin]
  | #link("https://orcid.org/" + data.orcid)[\u{efbb} #data.orcid]
  | #link("https://github.com/" + data.github)[\u{f09b} #data.github]
])

#line(length: 100%, stroke: (paint: black, thickness: 0.25pt))

== Work Experiences

#for experience in data.work_experiences [
  === #experience.title
  #experience.company (#experience.location);
  #datetime(
    year: int(experience.start_date.split("-").at(0)),
    month: int(experience.start_date.split("-").at(1)),
    day: int(experience.start_date.split("-").at(2)),
  ).display("[month repr:long], [year]")
  to
  #if (experience.end_date == "Present") [
    Present
  ] else [
    #datetime(
      year: int(experience.end_date.split("-").at(0)),
      month: int(experience.end_date.split("-").at(1)),
      day: int(experience.end_date.split("-").at(2)),
    ).display("[month repr:long], [year]")
  ]

  #experience.description
]
