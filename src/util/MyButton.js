import React from 'react'
import { Tooltip } from '@mui/material'
import { IconButton } from '@mui/material'


const MyButton = ({children, onClick, tip, btnClassName, tipClassName}) => (
    <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>

    </Tooltip>
)

export default MyButton
