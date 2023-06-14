import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { DotsVertical } from 'mdi-material-ui'

const EditMer = () => {
  // ** States
  const router = useRouter()

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [id, setId] = useState('')
  const [actionModel, setActionModel] = useState(null)
  const [role, setRole] = useState('')

  const handleClick = event => {
    setActionModel(event.currentTarget)
  }

  const handleCloseAction = () => {
    setActionModel(null)
  }

  useEffect(() => {
    const toekn = localStorage.getItem('token')
    console.log({ toekn })

    if (!toekn) {
      router.push('/pages/login')
    } else {
      getData()
    }
  }, [])

  const openAction = Boolean(actionModel)
  const modelId = openAction ? 'simple-popover' : undefined

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getData = async () => {
    const res = await axios.get(`http://localhost:5000/form`, {
      headers: {
        Authorization: ` ${localStorage.getItem('token')}`
      }
    })
    console.log({ res })

    if (res.data.status === true) {
      setData(res.data.user)
    }
  }

  const delate = async () => {
    setId('')
    const res = await axios.delete(`http://localhost:5000/form/${id}`, {
      headers: {
        Authorization: ` ${localStorage.getItem('token')}`
      }
    })

    if (res.status === 200) {
      toast.success('data dealate successfully')
      setOpen(false)
      getData()
    }
  }
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setId('')
    setOpen(false)
  }

  const columns = [
    { id: 'trackingId', label: 'Reference\u00a0No', minWidth: 100 },
    { id: 'loanAmount', label: 'Loan\u00a0Amount', minWidth: 100 },
    { id: 'monthlyIncome', label: 'Monthly\u00a0Income', minWidth: 100 },
    { id: 'bankForSalary', label: 'Company\u00a0Name', minWidth: 100 },
    { id: 'currentCity', label: 'City', minWidth: 100 },
    { id: 'customerRequirement', label: 'Customer\u00a0Requirement', minWidth: 50 },
    { id: 'contectNo', label: 'Content\u00a0No', minWidth: 100 },

    { id: 'status', label: 'status', status: 100 }
  ]

  useEffect(() => {
    const role = localStorage.getItem('role')

    setRole(role)
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <>
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                </>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(row => {
              return (
                <>
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column,i) => {
                      const value = row[column.id]

                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : i === 0 ?value.toString().toUpperCase() : value }
                          </TableCell>
                        </>
                      )
                    })}
                    <TableCell
                      onClick={e => {
                        handleClick(e)
                        setId(row._id)
                      }}
                    >
                      <DotsVertical />
                    </TableCell>
                  </TableRow>
                </>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => delate()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Popover
        id={modelId}
        open={actionModel}
        anchorEl={actionModel}
        onClose={handleCloseAction}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {role === 'Admin' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '5px' }}>
            <div
              style={{ cursor: 'pointer', textAlign: 'center', fontSize: '14px' }}
              onClick={() => router.push(`/lead/status/${id}`)}
            >
              Status Update
            </div>
            <div
              style={{ cursor: 'pointer', textAlign: 'center', fontSize: '14px' }}
              onClick={() => router.push(`/lead/${id}`)}
            >
              Edit
            </div>
            <div
              style={{ cursor: 'pointer', textAlign: 'center', fontSize: '14px' }}
              onClick={() => {
                setOpen(true)
              }}
            >
              Delete
            </div>{' '}
          </div>
        ) : (
          <div
            style={{ cursor: 'pointer', textAlign: 'center', fontSize: '14px' }}
            onClick={() => router.push(`/lead/status/${id}`)}
          >
            Status Update
          </div>
        )}
      </Popover>
    </Paper>
  )
}

export default EditMer
