import {parser} from "@lezer/css"
import {LRLanguage, continuedIndent, indentNodeProp, foldNodeProp, foldInside, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"
import {Extension} from "@codemirror/state"
import {completeCSS} from "./complete"

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
      }),
      styleTags({
        "import charset namespace keyframes": t.definitionKeyword,
        "media supports": t.controlKeyword,
        "from to": t.keyword,
        NamespaceName: t.namespace,
        KeyframeName: t.labelName,
        TagName: t.typeName,
        ClassName: t.className,
        PseudoClassName: t.constant(t.className),
        IdName: t.labelName,
        "FeatureName PropertyName AttributeName": t.propertyName,
        NumberLiteral: t.number,
        KeywordQuery: t.keyword,
        UnaryQueryOp: t.operatorKeyword,
        callee: t.keyword,
        "CallTag ValueName": t.atom,
        Callee: t.variableName,
        Unit: t.unit,
        "UniversalSelector NestingSelector": t.definitionOperator,
        AtKeyword: t.keyword,
        MatchOp: t.compareOperator,
        "ChildOp SiblingOp, LogicOp": t.logicOperator,
        BinOp: t.arithmeticOperator,
        Important: t.modifier,
        Comment: t.blockComment,
        ParenthesizedContent: t.special(t.name),
        ColorLiteral: t.color,
        StringLiteral: t.string,
        ":": t.punctuation,
        "PseudoOp #": t.derefOperator,
        "; ,": t.separator,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace
      })
    ]
  }),
  languageData: {
    commentTokens: {block: {open: "/*", close: "*/"}},
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
})

/// CSS property and value keyword completion.
export const cssCompletion: Extension = cssLanguage.data.of({autocomplete: completeCSS})

/// Language support for CSS.
export function css() {
  return new LanguageSupport(cssLanguage, cssCompletion)
}
