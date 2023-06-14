// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import MearLead from 'src/views/lead/MearLead'

const EditLead = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <MearLead />
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditLead
