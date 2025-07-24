import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SuccessNotify(message: string) {
    toast.success(message);
}

export function ErrorNotify(message: string) {
    toast.error(message);
}

export default function Toaster() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
        />
    );
}
