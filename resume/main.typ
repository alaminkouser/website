#import "backend/index.typ": backend
#import "sections/001-header.typ": header
#import "sections/002-professional-summary.typ": professional-summary
#import "sections/003-work-experiences.typ": work-experiences

#show: backend

#let data = yaml("./data.yaml")

#show: header.with(data)
#show: professional-summary.with(data)
#show: work-experiences.with(data)
