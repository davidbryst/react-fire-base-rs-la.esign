import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Welcome() {
    return <Redirect to='/auth/signin' />
}

export default Welcome;