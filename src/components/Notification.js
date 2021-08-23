import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";


export default function Notification(props) {
    const {notify, setNotify} = props;
    return <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        onClose={() => setNotify({isOpen:false, message:"", type:""})}
        anchorOrigin={{vertical: "top", horizontal: "left"}}>
        <Alert severity={notify.type !== "" ? notify.type : "info"}>{notify.message}</Alert>
    </Snackbar>
}
