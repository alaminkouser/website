#let backend(DOC) = {
  set page(
    paper: "a4",
    margin: 1.5cm,
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

  show heading.where(level: 2): set block(above: 0.5em, below: 0.5em)

  show heading.where(level: 3): set block(above: 0.5em, below: 0.5em)

  set par(
    first-line-indent: 0pt,
    justify: true,
    leading: 0.5em,
    spacing: 0.5em,
  )

  set text(
    size: 1em,
    font: "Symbols Nerd Font Mono",
    hyphenate: false,
  )

  show bibliography: bibliography_setup => {
    show heading: set align(center)
    bibliography_setup
  }

  DOC
}
