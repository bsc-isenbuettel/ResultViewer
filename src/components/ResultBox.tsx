import { Box, Typography, Card, CardContent} from '@mui/material'
import React from 'react'


export interface ResultBoxProps {
  value?: string | number
}

export const ResultBox = React.memo(
  (props: React.PropsWithChildren<ResultBoxProps>) => {
    const { value } = props

    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Bestes Ergebnis
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: 'text.primary', mb: 1.5 }}>
          Teiler: {value}
        </Typography>
      </CardContent>
    </Card>
    )
  }
)

ResultBox.displayName = 'ResultBox'
export default ResultBox