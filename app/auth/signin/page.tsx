import { Metadata } from 'next';
import { SignIn } from '../components/signinForm';


export const metadata: Metadata = {
  title: "Sign In - ChessMaster",
  description: "Sign in to your ChessMaster account to access professional chess training tools and opening databases.",
};


const SignInPage = () => {
  return (
    <SignIn/>
  )
}

export default SignInPage