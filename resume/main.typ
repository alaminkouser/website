#import "backend/index.typ": backend

#show: backend

#let data = yaml("data.yaml")

= #data.name

#align(center, text(size: 10pt)[#data.affiliation])
#align(center, text(size: 10pt)[
  \u{f015} #data.address
  | #link("tel:" + data.phone)[\u{f095} #data.phone]
  | #link("mailto:" + data.email)[\u{f0e0} #data.email]
  #linebreak()
  #link(data.website.url)[\u{f0ac} #data.website.view]
  | #link("https://linkedin.com/in/" + data.linkedin + "/")[\u{f08c} #data.linkedin]
  | #link("https://orcid.org/" + data.orcid)[\u{efbb} #data.orcid]
  | #link("https://github.com/" + data.github)[\u{f09b} #data.github]
])

#line(length: 100%, stroke: (paint: black, thickness: 0.25pt))

== Work Experiences

#for experience in data.experiences [
  #datetime(
    year: int(experience.start_date.split("-").at(0)),
    month: int(experience.start_date.split("-").at(1)),
    day: int(experience.start_date.split("-").at(2)),
  ).display("[month repr:long], [year]")
]
