import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  CompletionItem,
  CompletionItemKind,
  Hover,
  TextDocumentSyncKind,
  TextDocumentPositionParams
} from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'

const connection = createConnection(ProposedFeatures.all)
const documents = new TextDocuments(TextDocument)

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {},
      hoverProvider: true
    }
  }
})

// completion
connection.onCompletion((_params: TextDocumentPositionParams): CompletionItem[] => {
  return [
    {
      label: 'HelloWor',
      kind: CompletionItemKind.Text,
      data: 1
    }
  ]
})

connection.onHover((params: TextDocumentPositionParams): Hover | undefined => {
  const doc = documents.get(params.textDocument.uri)
  if (!doc) return undefined
  const text = doc.getText()
  const offset = doc.offsetAt(params.position)
  const tagRegex = /<\/?([a-zA-Z0-9\-]+)\b/g
  let m: RegExpExecArray | null
  while ((m = tagRegex.exec(text))) {
    const start = m.index
    const end = start + m[0].length
    if (offset >= start && offset <= end) return { contents: [`你悬浮在：${m[1]}`] }
  }
  return undefined
})

documents.listen(connection)
connection.listen()
