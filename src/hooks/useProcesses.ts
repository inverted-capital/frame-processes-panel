import { useArtifact, useExists, useJson } from '@artifact/client/hooks'
import { useEffect, useState } from 'react'
import type { JsonValue } from '@artifact/client/api'
import type { ProcessesData } from '../types/process'
import { defaultProcesses } from '../processes/defaultProcesses'

const defaultData: ProcessesData = { processes: defaultProcesses }

export default function useProcesses() {
  const artifact = useArtifact()
  const exists = useExists('processes.json')
  const raw = useJson('processes.json')
  const [data, setData] = useState<ProcessesData>(defaultData)

  useEffect(() => {
    if (raw !== undefined) {
      setData(raw as ProcessesData)
    } else if (exists === false) {
      artifact.files.write.json(
        'processes.json',
        defaultData as unknown as JsonValue
      )
      artifact.branch.write.commit('Initialize processes')
    }
  }, [raw, exists, artifact])

  const save = async (newData: ProcessesData) => {
    setData(newData)
    artifact.files.write.json('processes.json', newData as unknown as JsonValue)
    await artifact.branch.write.commit('Update processes')
  }

  const loading = exists === null || (exists && raw === undefined)

  return { data, loading, save }
}
