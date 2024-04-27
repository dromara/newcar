import * as iq from '@inquirer/prompts'

export async function projectName(): Promise<string> {
  return (await iq.input({
    message: 'Enter the name of the app:',
    default: 'newcar-app',
  })) as any
}

export async function projectPath(): Promise<boolean> {
  return iq.select({
    message: 'Choose the init path for the app:',
    choices: [
      { name: 'Create a new directory with the app name', value: true },
      { name: 'Current directory', value: false },
    ],
    default: true,
  }) as any
}
