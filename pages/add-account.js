const { default: AddAccountForm } = require("../src/components/AddAccountForm")
import Navigation from '../src/components/Navigation';
import withAuth from '../src/utils/withAuth';

const AddAccount = () => {
    return(
        <div>
            <Navigation />
            <AddAccountForm />
        </div>
    )
}


export default withAuth(AddAccount);