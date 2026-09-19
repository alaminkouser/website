#let education(data, BODY) = {
  [
    == Education
    #for item in data.education [
      #grid(
        columns: (1fr, auto),
        align: (left, right),
        [
          #text(weight: "bold")[#item.degree] --- #item.institution
        ],
        [
          #text(style: "italic")[#item.start_date --- #item.end_date]
        ],
      )
      #text(size: 0.9em, fill: luma(60))[
        CGPA: #item.cgpa (#item.honor)
      ]
    ]
  ]
  BODY
}
