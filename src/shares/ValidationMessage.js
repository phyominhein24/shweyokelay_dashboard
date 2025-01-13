import { useSelector } from "react-redux";
import { FormHelperText } from '@mui/material';

export const ValidationMessage = ({field}) => {

    const state = useSelector(state => state.share);
    const { errors } = state;

    return (
        <>
            { errors && errors[field] && (
                <FormHelperText error id="helper-text-table-email">
                    { errors[field][0] }
                </FormHelperText>
            )}
        </>
    )
}