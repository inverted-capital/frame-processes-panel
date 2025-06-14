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

export interface ProcessFile {
  id: string
  name: string
  type: string
  size: number
  path: string
  lastAccessed?: string
}

export interface ProcessLog {
  id: string
  timestamp: string
  level: string
  message: string
}

export interface ProcessEnvironment {
  key: string
  value: string
}

export interface ProcessMessage {
  id: string
  type: string
  payload: unknown
  timestamp: string
  status: string
  source: string
  target: string
  correlationId?: string
}

export interface MessageQueue {
  input: ProcessMessage[]
  output: ProcessMessage[]
}

export interface ProcessesData {
  processes: Process[]
}
