import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'
import { UserType } from '../../utils/types/userType'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: '#F9FAFB',
    padding: '8px 16px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#6B7280'
  },
}))

interface Props {
  userType: UserType | null
  setUserType: (userType: UserType) => void
}

function MuiSelectUserType({ userType, setUserType }: Props) {

  return (
    <FormControl className='grow rounded'>
      <Select
        value={userType}
        onChange={(e) => setUserType(e.target.value as UserType)}
        input={<BootstrapInput />}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        required
      >
        <MenuItem value='연수생'>연수생 (수료생 포함)</MenuItem>
        <MenuItem value='멘토'>멘토</MenuItem>
        <MenuItem value='준비생'>준비생</MenuItem>
        <MenuItem value='사무국'>사무국</MenuItem>
      </Select>
    </FormControl>
  )
}

export default MuiSelectUserType