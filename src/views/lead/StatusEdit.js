// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'

import Select from '@mui/material/Select'

import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const FormLayoutsSeparator = () => {
  const router = useRouter()
  const { id } = router.query

  const [status, setStatus] = useState('')
  const [remark, setRemark] = useState('')

  useEffect(() => {
    if (id) {
      getData()
    }
    return
  }, [id])

  const getData = async () => {
    const res = await axios.get(`http://localhost:5000/form/${id}`)

    if (res.data.status === true) {
      setStatus(res.data?.user[0]?.status)
      setRemark(res.data?.user[0]?.remark)
    }
  }

  const update = async () => {
    if (status === 'rejected') {
      if (remark) {
        const body = {
          status: status,
          remark: status === 'rejected' ? remark : ''
        }
        const res = await axios.put(`http://localhost:5000/form/${id}`, body, {
          headers: {
            Authorization: ` ${localStorage.getItem('token')}`
          }
        })

        if (res.data.status === true) {
          toast.success('status update successfully')
          router.push('/lead')
        }
      } else {
        toast.info('Please Enter Remark')
      }
    } else {
      const body = {
        status: status,
        remark: status === 'rejected' ? remark : ''
      }
      const res = await axios.put(`http://localhost:5000/form/${id}`, body, {
        headers: {
          Authorization: ` ${localStorage.getItem('token')}`
        }
      })

      if (res.data.status === true) {
        toast.success('status update successfully')
        router.push('/lead')
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Status Update' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <div>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Status</InputLabel>
                <Select
                  label='Status'
                  value={status}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={e => setStatus(e.target.value)}
                >
                  <MenuItem value='inProgress'>inProgress</MenuItem>
                  <MenuItem value='appove'>appove</MenuItem>
                  <MenuItem value='rejected'>rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {status === 'rejected' && (
            <Grid container className='mt-3'>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id='outlined-number'
                  label='Remark'
                  placeholder='Please Enter Remark'
                  name='remark'
                  value={remark}
                  onChange={e => setRemark(e.target.value)}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' sx={{ mr: 2 }} variant='contained' onClick={() => update()}>
            Update
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={() => router.push('/lead')}>
            Cancel
          </Button>
        </CardActions>
      </div>
    </Card>
  )
}

export default FormLayoutsSeparator
