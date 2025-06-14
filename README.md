# Process viewer widget

This widget demonstrates an interactive interface for exploring process data.
It renders a process tree, resource usage charts and message queues using mock
data stored in `processes.json`.

## Development

```bash
npm run dev
```

## Building

```bash
npm run build
```

Load `dist/index.html` in an `ArtifactFrameHolder` to embed the widget inside
another application.

### Data shape

The process types are defined in `src/types/process.ts`.
