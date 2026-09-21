#let professional-summary(data, BODY) = {
  [
    = Professional Summary
    #eval(data.professional_summary, mode: "markup")
  ]
  BODY
}
