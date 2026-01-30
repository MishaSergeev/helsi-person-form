import Switch from "@mui/material/Switch"
import { styled } from "@mui/material/styles"
import type { SwitchProps } from "@mui/material/Switch"

export const CustomSwitch = styled((props: SwitchProps) => (
    <Switch {...props} />
))({
    "& .MuiSwitch-switchBase": {
        "&.Mui-checked": {
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#fff",
                border: "1px solid #ababab",
            },
        },
        "&:not(.Mui-checked)": {
            color: "#999",
            "& + .MuiSwitch-track": {
                backgroundColor: "#eee",
                border: "1px solid #ababab",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        border: "1px solid #ababab",
    },
})