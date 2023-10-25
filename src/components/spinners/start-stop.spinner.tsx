import ReactDOM from "react-dom";
import LoadingSpinner from "./loading.spinner";

export const startLoading = () => {
    const spinner = document.createElement('div');
    spinner.id = 'my__spinner';
    document.body.appendChild(spinner);
    ReactDOM.render(<LoadingSpinner />, spinner);
};


export const stopLoading = () => {
    const spinner = document.querySelector('#my__spinner');
    ReactDOM.unmountComponentAtNode(spinner);
    document.body.removeChild(spinner);
};
