/* eslint-disable no-console */
import fs from 'node:fs'
import { resolve } from 'node:path'
import ora from 'ora'
import pc from 'picocolors'
import { projectName, projectPath } from './config'

import { checkPath, fetchTemplate, setupProject } from './project'

export default async function create(name: string, _options: any[]) {
  if (!name)
    name = await projectName()
  const newDir = await projectPath()
  const path = resolveProjectPath(newDir ? name : '.')

  await checkPath(path)

  const startTime = Date.now()

  console.log()
  const spinner = ora('Downloading template').start()
  await fetchTemplate(path)

  spinner.text = 'Setting up project'
  await setupProject(path, name)

  spinner.succeed('Project created')

  const duration = Date.now() - startTime
  console.log()
  console.log(pc.green(`Project created in ${pc.cyan(`${duration}ms`)}`))
  console.log()
  console.log(`Now run the following commands:`)
  if (newDir)
    console.log(pc.bold(`cd ${name}`))
  console.log(pc.bold(`npm install`))
  console.log(pc.bold(`npm run dev`))
}

export function resolveProjectPath(path: string): string {
  path = resolve(path)
  if (!fs.existsSync(path))
    fs.mkdirSync(path)
  return path
}
