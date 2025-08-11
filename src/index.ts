import path from 'node:path'
import { defineExtension } from 'reactive-vscode'
import { window } from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node'

let client: LanguageClient | undefined

const { activate, deactivate } = defineExtension(ctx => {
  window.showInformationMessage('Hello')

  const serverModule = ctx.asAbsolutePath(path.join('dist', 'server.js'))
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=0'] }
    }
  }

  const clientOptions: LanguageClientOptions = {
    // 最小端到端：绑定到 html / vue 文档
    documentSelector: [{ language: 'html' }, { language: 'vue' }]
  }

  client = new LanguageClient('studyLsp', 'Study LSP', serverOptions, clientOptions)
  // 确保停用时自动清理
  ctx.subscriptions.push(client)
  client.start()
})

export { activate, deactivate }
