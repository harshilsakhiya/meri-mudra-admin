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

import cityData from '../../json/cities-name-list.json'

const FormLayoutsSeparator = () => {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState({})
  const [employeType, setemployeType] = useState('')
  const [city, setCity] = useState('')
  const [req, setReq] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    if (id) {
      getData()
    }
    return
  }, [id])

  const getData = async () => {
    const res = await axios.get(`http://localhost:5000/form/${id}`)

    if (res.data.status === true) {
      setData({
        monthlyIncome: res.data?.user[0]?.monthlyIncome,
        loanAmount: res.data?.user[0]?.loanAmount,
        bankForSalary: res.data?.user[0]?.bankForSalary,
        contectNo: res.data?.user[0]?.contectNo
      })
      setemployeType(res.data?.user[0]?.typeOfEmployment)
      setCity(res.data?.user[0]?.currentCity)
      setReq(res.data?.user[0]?.customerRequirement)
    }
  }

  const inputChange = event => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
    if (event.target.name.trim()) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    let formIsValid = true
    let errors = {}

    if (data && !data.loanAmount) {
      formIsValid = false
      errors['loanAmount'] = '*Please enter loanAmount!'
    }
    if (data && !data.monthlyIncome) {
      formIsValid = false
      errors['monthlyIncome'] = '*Please enter monthlyIncome!'
    }
    if (!city) {
      formIsValid = false
      errors['city'] = '*Please enter city!'
    }
    if (!employeType) {
      formIsValid = false
      errors['employeType'] = '*Please enter employeType!'
    }
    if (data && !data.bankForSalary) {
      formIsValid = false
      errors['SalaryReceived'] = '*Please enter company name!'
    }

    if (data && !data.contectNo) {
      formIsValid = false
      errors['contectNo'] = '*Please enter Contect No!'
    }

    setErrors(errors)
    return formIsValid
  }

  const update = async () => {
    if (validateForm()) {
      const body = {
        loanAmount: data.loanAmount,
        monthlyIncome: data.monthlyIncome,
        currentCity: city,
        bankForSalary: data.bankForSalary,
        typeOfEmployment: employeType,
        customerRequirement: req,
        contectNo: data.contectNo
      }
      const res = await axios.put(`http://localhost:5000/form/updateform/${id}`, body, {
        headers: {
          Authorization: ` ${localStorage.getItem('token')}`
        }
      })
      if (res.data.status === true) {
        toast.success('Loan Form Data successfully')
        router.push('/lead')
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Loan Form Update' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <div>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                type='number'
                id='outlined-number'
                label='Your desired loan amount'
                placeholder='XXXXXXXXXX'
                name='loanAmount'
                value={data.loanAmount}
                onChange={e => inputChange(e)}
              />
              <span className='text-danger'> {errors['loanAmount']}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                type='number'
                id='standard-basic'
                label='Your net monthly income '
                placeholder='XXXXXXXXXX'
                name='monthlyIncome'
                value={data.monthlyIncome}
                onChange={e => inputChange(e)}
              />
              <span className='text-danger'> {errors['monthlyIncome']}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField disabled label='Customer-Requirement' id='outlined-disabled' fullWidth value={req} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label-employe'> Your Employment Type</InputLabel>
                <Select
                  label='Your Employment Type'
                  id='form-layouts-separator-select-emolye'
                  labelId='form-layouts-separator-select-label-employe'
                  value={employeType}
                  onChange={e => setemployeType(e.target.value)}
                >
                  <MenuItem value='Salaried'>Salaried</MenuItem>
                  <MenuItem value='Self Employed - Business Owner'>Self Employed - Business Owner</MenuItem>
                  <MenuItem value='Self Employed - Professional'>Self Employed - Professional</MenuItem>
                </Select>
              </FormControl>
              <span className='text-danger'> {errors['employeType']}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label-city'>Your current city of residence</InputLabel>
                <Select
                  label='Your current city of residence'
                  defaultValue=''
                  id='form-layouts-separator-select-city'
                  labelId='form-layouts-separator-select-label-city'
                  value={city}
                  onChange={e => setCity(e.target.value)}
                >
                  {cityData.map((item, i) => (
                    <MenuItem value={item} key={i}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <span className='text-danger'> {errors['city']}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                fullWidth
                id='outlined-number'
                label=' Company Name'
                placeholder=' Company Name'
                name='bankForSalary'
                value={data.bankForSalary}
                onChange={e => inputChange(e)}
                variant='outlined'
              /> */}

              <TextField
                fullWidth
                id='outlined-basic'
                label=' Company Name'
                name='bankForSalary'
                value={data.bankForSalary}
                onChange={e => inputChange(e)}
                InputLabelProps={{ shrink: true }}
              />
              {/* <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Salary Received In</InputLabel>
                <Select
                  label='Salary Received In'
                  value={salaeryRes}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='HDFC'>HDFC</MenuItem>
                  <MenuItem value='SBI'>SBI</MenuItem>
                  <MenuItem value='ICICI'>ICICI</MenuItem>
                  <MenuItem value='AXIS'>AXIS</MenuItem>                

                  <MenuItem value='KOTAK'>KOTAK</MenuItem>
                  <MenuItem value='Standard Chartered Bank'>Standard Chartered Bank</MenuItem>
                </Select>
              </FormControl> */}

              <span className='text-danger'> {errors['bankForSalary']}</span>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                id='standard-basic'
                label='Content No '
                placeholder='1234567890'
                name='contectNo'
                value={data.contectNo}
                onChange={e => inputChange(e)}
                InputLabelProps={{ shrink: true }}
              />
              <span className='text-danger'> {errors['contectNo']}</span>
            </Grid>
          </Grid>
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
