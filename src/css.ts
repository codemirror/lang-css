import {parser} from "@lezer/css"
import {LRLanguage, continuedIndent, indentNodeProp, foldNodeProp, foldInside, LanguageSupport} from "@codemirror/language"
import {cssCompletionSource} from "./complete"
export {cssCompletionSource} from "./complete"

/// A language provider based on the [Lezer CSS
/// parser](https://github.com/lezer-parser/css), extended with
/// highlighting and indentation information.
export const cssLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Declaration: continuedIndent()
      }),
      foldNodeProp.add({
        Block: foldInside
      })
    ]
  }),
  languageData: {
    commentTokens: {block: {open: "/*", close: "*/"}},
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
})

/// Language support for CSS.
export function css() {
  return new LanguageSupport(cssLanguage, cssLanguage.data.of({autocomplete: cssCompletionSource}))
}
