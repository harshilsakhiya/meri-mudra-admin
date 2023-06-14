// ** MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports

import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Loan Data' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
