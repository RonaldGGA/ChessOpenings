import { NewUser } from '../components/newuserForm';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Create Account - ChessMaster",
  description: "Create a new ChessMaster account to start mastering chess openings with professional training tools.",
};



const NewUserPage = () => {
  return (
    <NewUser/>
  )
}

export default NewUserPage