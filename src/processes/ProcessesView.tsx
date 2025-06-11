import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import useProcesses from '../hooks/useProcesses'
import type { Process } from '../types/process'

const ProcessNode = ({
  process,
  expandedIds,
  toggle,
  select
}: {
  process: Process
  expandedIds: Set<string>
  toggle: (id: string) => void
  select: (id: string) => void
}) => {
  const isExpanded = expandedIds.has(process.id)
  const hasChildren = process.children && process.children.length > 0
  return (
    <div className="ml-4">
      <div className="flex items-center space-x-1">
        {hasChildren && (
          <button onClick={() => toggle(process.id)} className="text-gray-500">
            {isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        )}
        <button onClick={() => select(process.id)} className="text-left">
          {process.name} (PID: {process.pid})
        </button>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-2">
          {process.children!.map((child) => (
            <ProcessNode
              key={child.id}
              process={child}
              expandedIds={expandedIds}
              toggle={toggle}
              select={select}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProcessesView() {
  const { data, loading, save } = useProcesses()
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (loading) return <p>Loading...</p>

  const toggle = (id: string) => {
    setExpandedIds((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const select = (id: string) => setSelectedId(id)

  const findById = (list: Process[], id: string): Process | undefined => {
    for (const p of list) {
      if (p.id === id) return p
      if (p.children) {
        const f = findById(p.children, id)
        if (f) return f
      }
    }
    return undefined
  }

  const selected = selectedId ? findById(data.processes, selectedId) : undefined

  const toggleStatus = () => {
    if (!selected) return
    const newData = { ...data }
    const proc = findById(newData.processes, selected.id)
    if (proc) {
      proc.status = proc.status === 'running' ? 'stopped' : 'running'
      save(newData)
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-1/2 overflow-auto p-2 border-r">
        {data.processes.map((p) => (
          <ProcessNode
            key={p.id}
            process={p}
            expandedIds={expandedIds}
            toggle={toggle}
            select={select}
          />
        ))}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {selected ? (
          <div className="space-y-2">
            <h2 className="text-lg font-bold">
              {selected.name} (PID: {selected.pid})
            </h2>
            <p>Command: {selected.command || 'none'}</p>
            <p>User: {selected.user}</p>
            <p>Status: {selected.status}</p>
            <p>CPU: {selected.cpu}%</p>
            <p>Memory: {selected.memory} MB</p>
            <button
              onClick={toggleStatus}
              className="mt-2 px-2 py-1 bg-blue-600 text-white rounded"
            >
              Toggle Status
            </button>
          </div>
        ) : (
          <p>Select a process to view details</p>
        )}
      </div>
    </div>
  )
}
