export interface Process {
  id: string
  pid: number
  name: string
  command: string
  status: string
  cpu: number
  memory: number
  user: string
  startTime: string
  parentId?: string
  children?: Process[]
}

export interface ProcessesData {
  processes: Process[]
}
