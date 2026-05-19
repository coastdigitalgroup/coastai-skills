#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const ALLOWED_SUPPORT_DIRS = new Set([
  'examples',
  'templates',
  'references',
  'assets',
  'scripts'
])

const EXCLUDED_ROOT_DIRS = new Set([
  '.git',
  '.github',
  '.codex',
  '.cursor',
  '.claude',
  'node_modules',
  'dist',
  'src',
  'scripts'
])

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    return { name: '', description: '' }
  }

  const yaml = match[1]
  const nameMatch = yaml.match(/^name:\s*(.+)$/m)
  const blockDescMatch = yaml.match(/^description:\s*\n((?:[ \t]+.+\n?)+)/m)
  const inlineDescMatch = yaml.match(/^description:\s*(.+)$/m)

  const name = nameMatch ? nameMatch[1].trim() : ''

  let description = ''
  if (blockDescMatch) {
    description = blockDescMatch[1]
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join(' ')
  } else if (inlineDescMatch) {
    description = inlineDescMatch[1].trim()
  }

  return { name, description }
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function main() {
  const repoRoot = process.cwd()
  const rootEntries = await readdir(repoRoot, { withFileTypes: true })

  const categories = rootEntries
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !entry.name.startsWith('.'))
    .filter((entry) => !EXCLUDED_ROOT_DIRS.has(entry.name))

  const errors = []
  let checkedSkills = 0

  for (const category of categories) {
    const categoryPath = join(repoRoot, category.name)
    const skillEntries = await readdir(categoryPath, { withFileTypes: true })

    for (const skillEntry of skillEntries) {
      if (!skillEntry.isDirectory()) {
        continue
      }

      const skillDir = skillEntry.name
      const skillPath = join(categoryPath, skillDir)
      const skillMdPath = join(skillPath, 'SKILL.md')

      if (!(await exists(skillMdPath))) {
        continue
      }

      checkedSkills += 1

      const content = await readFile(skillMdPath, 'utf8')
      const { name, description } = parseFrontmatter(content)

      if (!name) {
        errors.push(`${category.name}/${skillDir}: missing frontmatter name`)
      } else if (name !== skillDir) {
        errors.push(
          `${category.name}/${skillDir}: frontmatter name "${name}" must match folder name`
        )
      }

      if (!description) {
        errors.push(`${category.name}/${skillDir}: missing frontmatter description`)
      }

      const supportEntries = await readdir(skillPath, { withFileTypes: true })
      for (const supportEntry of supportEntries) {
        if (!supportEntry.isDirectory()) {
          continue
        }

        if (!ALLOWED_SUPPORT_DIRS.has(supportEntry.name)) {
          errors.push(
            `${category.name}/${skillDir}: unsupported support directory "${supportEntry.name}"`
          )
        }
      }
    }
  }

  if (checkedSkills === 0) {
    console.error('No skills found to validate. Expected SKILL.md files in category/skill folders.')
    process.exit(1)
  }

  if (errors.length > 0) {
    console.error(`Skill validation failed with ${errors.length} issue(s):`)
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log(`Skill validation passed for ${checkedSkills} skill(s).`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
