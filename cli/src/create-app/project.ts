import * as iq from '@inquirer/prompts'
import { existsSync, rmSync } from 'node:fs'
import { execSync } from 'node:child_process'

export async function checkPath(path: string) {
  if (existsSync(path)) {
    const overwrite = await iq.select({
      message: 'Directory already exists. Overwrite?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
      default: false,
    })
    if (overwrite) {
      rmSync(path, { recursive: true })
    } else {
      process.exit(1)
    }
  }
}

export function fetchTemplate(path: string) {
  execSync(
    `git clone https://github.com/dromara/newcar-local-template.git ${path} --depth 1`,
    { stdio: 'ignore' },
  )
  rmSync(`${path}/.git`, { recursive: true })
}

export function setupProject(path: string, name: string) {}
