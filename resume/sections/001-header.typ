#let header(data, BODY) = {
  let email = sys.inputs.at("AAK_EMAIL", default: "[AAK_EMAIL]")
  let phone = sys.inputs.at("AAK_PHONE", default: "[AAK_PHONE]")
  let profile = [
    #link(data.website.url + "resume.pdf")[#title()]
    #text(data.title, size: 1.25em)\
    \u{f015} #data.address\
    #link("tel:" + phone)[\u{f095} #phone]\
    #link("mailto:" + email)[\u{f0e0} #email]\
    #link(data.website.url)[\u{f0ac} #data.website.view]\
    #link("https://www.linkedin.com/in/" + data.linkedin + "/")[\u{f08c} linkedin.com/in/#data.linkedin]\
    #link("https://github.com/" + data.github)[\u{f09b} github.com/#data.github]
  ]
  grid(
    columns: (1fr, auto),
    gutter: 1em,
    [
      #profile
    ],
    [
      #context {
        align(
          right + horizon,
          image("../avatar.jpeg", height: measure(profile).height),
        )
      }
    ],
  )
  BODY
}
