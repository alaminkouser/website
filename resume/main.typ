#import "backend/index.typ": backend
#import "sections/001-header.typ": header
#import "sections/002-professional-summary.typ": professional-summary
#import "sections/003-technical-skills.typ": technical-skills
#import "sections/004-work-experiences.typ": work-experiences
#import "sections/005-projects-and-open-source-contributions.typ": projects-and-open-source-contributions
#import "sections/006-education.typ": education
#import "sections/007-certificates-and-trainings.typ": certificates-and-trainings

#show: backend

#let data = yaml("./data.yaml")

#show: header.with(data)
#show: professional-summary.with(data)
#show: technical-skills.with(data)
#show: work-experiences.with(data)
#show: projects-and-open-source-contributions.with(data)
#show: education.with(data)
#show: certificates-and-trainings.with(data)
