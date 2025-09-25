import { Box, Typography, Card, CardContent} from '@mui/material'
import React from 'react'


export interface ResultBoxProps {
  firstValue?: string | number,
  secondValue?: string | number,
  thirdValue?: string | number,
}

export const ResultBox = React.memo(
  (props: React.PropsWithChildren<ResultBoxProps>) => {
    const { firstValue, secondValue, thirdValue } = props

    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Ergebnisse
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: 'text.success', mb: 1.5 }}>
          Bester Teiler: {firstValue}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: 'text.primary', mb: 1.5 }}>
          Teiler: {secondValue}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: 'text.primary', mb: 1.5 }}>
          Teiler: {thirdValue}
        </Typography>
      </CardContent>
    </Card>
    )
  }
)

ResultBox.displayName = 'ResultBox'
export default ResultBox