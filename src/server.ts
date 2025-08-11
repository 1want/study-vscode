import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  CompletionItem,
  CompletionItemKind,
  Hover,
  Diagnostic,
  DiagnosticSeverity,
  TextDocumentSyncKind,
  TextDocumentPositionParams
} from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'

const connection = createConnection(ProposedFeatures.all)
const documents = new TextDocuments(TextDocument)

connection.onInitialize((params: InitializeParams) => {
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

// 诊断
documents.onDidChangeContent(change => {
  const text = change.document.getText()
  const diagnostics: Diagnostic[] = []
  if (text.includes('foo')) {
    diagnostics.push({
      severity: DiagnosticSeverity.Warning,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 3 }
      },
      message: '不要写 foo',
      source: 'ex'
    })
  }
  connection.sendDiagnostics({ uri: change.document.uri, diagnostics })
})

documents.listen(connection)
connection.listen()
