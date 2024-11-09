import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import AdsClickRoundedIcon from '@mui/icons-material/AdsClickRounded'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Step } from '@/interfaces'

export const stepsData: Step[] = [
  {
    title: 'Company',
    description: 'General Company Information',
    path: '/survey/step1',
    icon: <BusinessRoundedIcon fontSize="small" />,
    success: false
  },
  {
    title: 'Digital Presence',
    description: 'Current Digital Presence',
    path: '/survey/step2',
    icon: <LanguageRoundedIcon fontSize="small" />,
    success: false
  },
  {
    title: 'Digital Needs',
    description: 'Digital Needs and Preferences',
    path: '/survey/step3',
    icon: <AdsClickRoundedIcon fontSize="small" />,
    success: false
  },
  {
    title: 'Perceptions',
    description: 'Perceptions of the Market and Competition',
    path: '/survey/step4',
    icon: <BusinessCenterOutlinedIcon fontSize="small" />,
    success: false
  },
  {
    title: 'Budget',
    description: 'Budget and Purchase Decision',
    path: '/survey/step5',
    icon: <AttachMoneyOutlinedIcon fontSize="small" />,
    success: false
  },
  {
    title: 'Final',
    description: 'Information Channels and Additional Comments',
    path: '/survey/step6',
    icon: <InfoOutlinedIcon fontSize="small" />,
    success: false
  }
]



export const states: string[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
]