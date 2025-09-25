import React from 'react'
import classNames from 'classnames'
import { DropZone } from './components/DropZone'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ResultBox } from './components/ResultBox';
import Target from './components/Target';


export const App = React.memo(() => {
  // Create "active" state for dropzone:
  const [isDropActive, setIsDropActive] = React.useState(false)
  // Create state for dropped files:
  const [files, setFiles] = React.useState<File[]>([])

  const [json, setJson] = React.useState<any>(null)

  // Create handler for dropzone's onDragStateChange:
  const onDragStateChange = React.useCallback((dragActive: boolean) => {
    setIsDropActive(dragActive)
  }, [])

  // Create handler for dropzone's onFilesDrop:
  const onFilesDrop = React.useCallback((files: File[]) => {
    setFiles(files)

    // Read the content of the first file:
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result
        const json = JSON.parse(text as string)
        setJson(json)
        console.log(json)
      }
      reader.readAsText(file)
    }
  }, [])

  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <div className={classNames('dropZoneWrapper', {'dropZoneActive': isDropActive, })}>
          <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
            <h2>Datei hier ablegen</h2>
              {files.length === 0 ? (
                <h3>Es wurde keine Datei hochgeladen</h3>
              ) : (
                <h3>Datei geladen: {files[0].name}</h3>
              )}
          </DropZone>
        </div>
      </Box>
      <ResultBox 
        firstValue={(json?.ParameterResults[0].Teilers[0] * 100000).toFixed(3) || "N/A"} 
        secondValue={(json?.ParameterResults[0].Teilers[1] * 100000).toFixed(3) || "N/A"} 
        thirdValue={(json?.ParameterResults[0].Teilers[2] * 100000).toFixed(3) || "N/A"} 
        />
    </Container>
  )
})

App.displayName = 'BSC ResultViewer'
export default App
