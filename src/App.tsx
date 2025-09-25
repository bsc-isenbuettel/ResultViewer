import React from 'react'
import classNames from 'classnames'
import { DropZone } from './components/DropZone'
import Box from '@mui/material/Box';


export const App = React.memo(() => {
  // Create "active" state for dropzone:
  const [isDropActive, setIsDropActive] = React.useState(false)
  // Create state for dropped files:
  const [files, setFiles] = React.useState<File[]>([])

  // Create handler for dropzone's onDragStateChange:
  const onDragStateChange = React.useCallback((dragActive: boolean) => {
    setIsDropActive(dragActive)
  }, [])

  // Create handler for dropzone's onFilesDrop:
  const onFilesDrop = React.useCallback((files: File[]) => {
    setFiles(files)
  }, [])

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <div className={classNames('dropZoneWrapper', {'dropZoneActive': isDropActive, })}>
        <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
          <h2>Drop your files here</h2>
            {files.length === 0 ? (
              <h3>No files to upload</h3>
            ) : (
              <h3>Files to upload: {files.length}</h3>
            )}
        </DropZone>
      </div>
    </Box>
  )
})

App.displayName = 'App'
export default App
