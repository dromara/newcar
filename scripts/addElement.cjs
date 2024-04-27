// add-elements-interactive.js

const fs = require('node:fs')
const readline = require('node:readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve))
}

async function main() {
  let filePath = process.argv[2]
  const itemsString = process.argv[3]

  if (!filePath) filePath = await ask('Enter the file path: ')

  let items = []

  if (itemsString) {
    items = itemsString.split(';').map((item) => {
      const [target, key, type, defaultValue] = item.split(',')
      return { target, key, type, defaultValue }
    })
  } else {
    let addMore = 'Y'
    while (addMore.toUpperCase() === 'Y') {
      const target = await ask('Enter target (style | options | class): ')
      const key = await ask('Enter key: ')
      const type = await ask('Enter type: ')
      const defaultValue =
        target === 'class' ? await ask('Enter default value: ') : ''
      items.push({ target, key, type, defaultValue })

      addMore = await ask('Add another item? (Y/n): ')
    }
  }

  rl.close()

  // Ensure the file exists
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    let updatedData = data

    items.forEach(({ target, key, type, defaultValue }) => {
      const contentToAdd =
        target === 'class'
          ? `  ${key}: ${type} = ${defaultValue};\n`
          : `  ${key}?: ${type};\n`

      let insertPosition
      if (target === 'class') {
        insertPosition = updatedData.lastIndexOf('}')
      } else {
        const regex = new RegExp(
          `export interface .*${
            target.charAt(0).toUpperCase() + target.slice(1)
          }`,
          'g',
        )
        const matches = [...updatedData.matchAll(regex)]
        if (matches.length > 0) {
          const lastMatch = matches[matches.length - 1]
          insertPosition = updatedData.indexOf('}', lastMatch.index)
        }
      }

      if (insertPosition !== -1) {
        updatedData = [
          updatedData.slice(0, insertPosition),
          contentToAdd,
          updatedData.slice(insertPosition),
        ].join('')
      } else {
        console.error(`Could not find insertion point for target ${target}.`)
      }
    })

    // Write back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) console.error('Error writing file:', err)
      else console.log(`Batch update completed in ${filePath}.`)
    })
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
