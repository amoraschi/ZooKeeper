interface ZooCommand {
  name: string
  description: string
  options: Array<{
    name: string
    description: string
    type: string
    required: boolean
  }>
  execute: (interaction: any) => Promise<void> | void
}

interface MonkifyData {
  id: string
  reason: string
  timestamp: number
}

export {
  ZooCommand,
  MonkifyData
}
