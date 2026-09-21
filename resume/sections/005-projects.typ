#let projects(data, BODY) = {
  [
    = Projects
    #for item in data.projects_and_open_source_contributions [
      #if item.hidden == false {
        grid(
          columns: (1fr, auto),
          align: (left, right),
          [
            #link(item.link)[*#item.title* \u{f0337}]
            --- #text(style: "italic", size: 0.9em)[#item.tech_stack.join(", ")]
          ],
          [
            #text(style: "italic")[#eval(item.date, mode: "markup")]
          ],
        )
        pad(left: 0.5em)[
          #for description in item.highlights [
            - #eval(description, mode: "markup")
          ]
        ]
      }
    ]
  ]
  BODY
}
