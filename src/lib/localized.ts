import type { Translation } from './copy'
import { projects, skills, type Project, type SkillIcon, type SkillNumber } from './data'

export type LocalizedProject = Project & {
  subtitle: string
  description: string
  facts: string[]
  status: string
  caseStudy: {
    brief: string
    built: string
    decisions: string[]
    learned: string
    stack: string[]
  }
}

export type LocalizedSkill = {
  number: SkillNumber
  icon: SkillIcon
  tools: readonly string[]
  title: string
  level: string
  subtitle: string
  description: string
  usedIn: string[]
}

export function localizeProjects(copy: Translation): LocalizedProject[] {
  return projects.map((project) => {
    const item = copy.projects.items[project.id]
    return {
      ...project,
      subtitle: item.subtitle,
      description: item.description,
      facts: item.facts,
      status: copy.projects.status[project.statusKey],
      caseStudy: {
        brief: item.brief,
        built: item.built,
        decisions: item.decisions,
        learned: item.learned,
        stack: project.stack,
      },
    }
  })
}

export function localizeSkills(copy: Translation): LocalizedSkill[] {
  return skills.map((skill) => ({
    ...skill,
    ...copy.skills.items[skill.number],
  }))
}

export type TemplateValues = Record<string, string | number>

export function interpolate(template: string, values: TemplateValues): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    values[key] === undefined ? match : String(values[key]),
  )
}
