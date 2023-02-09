import { readdirSync } from 'fs'
import { ZooCommand } from './constants'

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  purple: '\x1b[35m',
  gray: '\x1b[90m',
  reset: '\x1b[0m'
}

function log (message: string, prefix: string = 'LOG'): void {
  console.log(`[${new Date().toLocaleString()}] ${getColor(prefix)}[${prefix}]${getColor()} ${message}`)
}

function getColor (prefix: string = ''): string {
  switch (prefix) {
    case 'LOG':
      return colors.blue
    case 'ERROR':
      return colors.red
    case 'SERVER':
      return colors.yellow
    case 'CHAT':
      return colors.green
    case 'PING':
      return colors.cyan
    case 'FLIP':
      return colors.purple
    case 'SOLD':
      return colors.gray
    default:
      return colors.reset
  }
}

async function getCommands (): Promise<ZooCommand[]> {
  const commands: ZooCommand[] = []
  const commandFiles = readdirSync('./build/commands')
  for (const file of commandFiles) {
    const command = (await import(`../commands/${file}`)).default
    commands.push(command)
  }

  return commands
}

export {
  log,
  getCommands
}
