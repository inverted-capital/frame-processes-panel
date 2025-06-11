export const defaultProcesses = [
  {
    id: 'p1',
    pid: 1,
    name: 'systemd',
    command: '/sbin/init',
    status: 'running',
    cpu: 0.1,
    memory: 0.5,
    user: 'root',
    startTime: '2023-06-15T00:00:00Z',
    children: [
      {
        id: 'p2',
        pid: 78,
        name: 'sshd',
        command: '/usr/sbin/sshd -D',
        status: 'running',
        cpu: 0.2,
        memory: 0.8,
        user: 'root',
        startTime: '2023-06-15T00:01:05Z',
        parentId: 'p1'
      },
      {
        id: 'p3',
        pid: 125,
        name: 'docker',
        command: 'dockerd',
        status: 'running',
        cpu: 2.1,
        memory: 4.2,
        user: 'root',
        startTime: '2023-06-15T00:01:15Z',
        parentId: 'p1',
        children: [
          {
            id: 'p4',
            pid: 842,
            name: 'node',
            command: 'node server.js',
            status: 'running',
            cpu: 15.3,
            memory: 8.7,
            user: 'node',
            startTime: '2023-06-15T10:15:23Z',
            parentId: 'p3'
          },
          {
            id: 'p5',
            pid: 901,
            name: 'postgres',
            command: 'postgres -D /var/lib/postgresql/data',
            status: 'running',
            cpu: 5.6,
            memory: 12.3,
            user: 'postgres',
            startTime: '2023-06-15T10:16:00Z',
            parentId: 'p3'
          }
        ]
      },
      {
        id: 'p6',
        pid: 212,
        name: 'nginx',
        command: 'nginx: master process',
        status: 'running',
        cpu: 0.3,
        memory: 1.2,
        user: 'www-data',
        startTime: '2023-06-15T00:02:10Z',
        parentId: 'p1',
        children: [
          {
            id: 'p7',
            pid: 214,
            name: 'nginx',
            command: 'nginx: worker process',
            status: 'running',
            cpu: 0.5,
            memory: 0.9,
            user: 'www-data',
            startTime: '2023-06-15T00:02:12Z',
            parentId: 'p6'
          }
        ]
      }
    ]
  },
  {
    id: 'p8',
    pid: 2,
    name: 'kthreadd',
    command: '',
    status: 'running',
    cpu: 0.0,
    memory: 0.0,
    user: 'root',
    startTime: '2023-06-15T00:00:01Z',
    children: [
      {
        id: 'p9',
        pid: 3,
        name: 'kworker/0:0',
        command: '',
        status: 'running',
        cpu: 0.1,
        memory: 0.0,
        user: 'root',
        startTime: '2023-06-15T00:00:01Z',
        parentId: 'p8'
      },
      {
        id: 'p10',
        pid: 4,
        name: 'kworker/0:1H',
        command: '',
        status: 'running',
        cpu: 0.0,
        memory: 0.0,
        user: 'root',
        startTime: '2023-06-15T00:00:01Z',
        parentId: 'p8'
      }
    ]
  }
]
