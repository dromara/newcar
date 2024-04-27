#!/usr/bin/env node
import { Command } from 'commander'
import pkg from './package.json' assert { type: 'json' }

import build from './src/build'
import create from './src/create-app'

const program = new Command()

program
  .name('Newcar Cli')
  .version(pkg.version)
  .description('The offical cli to build local app')

program
  .command('export <input> <duration> <target>')
  .option('-f, --fps <fps>', 'Frames per second', '60')
  .action(build)

program
  .command('create')
  .argument('[name]', 'Name of the project')
  .action(async (name, options) => {
    await create(name, options)
  })

program.parse(process.argv)
