const { default: AddAccountForm } = require("../src/components/AddAccountForm")
import Navigation from '../src/components/Navigation';

const AddAccount = () => {
    return(
        <div>
            <Navigation />
            <AddAccountForm />
        </div>
    )
}


export default AddAccount;