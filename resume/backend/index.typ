#let backend(DOC) = {
  set page(
    paper: "a4",
    margin: 0.75in,
  )

  show outline: outline_setup => {
    show heading: set align(center)
    outline_setup
  }

  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    align(center, it)
  }

  show heading.where(level: 1): set block(above: 0pt, below: 0.25em)

  show heading.where(level: 2): set block(above: 0.25em, below: 0.25em)

  set par(
    first-line-indent: 1em,
    justify: true,
    leading: 0.5em,
    spacing: 0.5em,
  )

  set text(
    size: 1em,
    font: "JetBrains Mono",
    hyphenate: false,
  )

  show bibliography: bibliography_setup => {
    show heading: set align(center)
    bibliography_setup
  }

  DOC
}
