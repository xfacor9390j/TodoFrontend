
import { AuthProvider } from '../Context/AuthContext'
import { UserProvider } from '../Context/UserContext'
import { TodoProvider } from '../Context/TodoContext'
import { FormProvider } from '../Context/FormContext'
import NavBar from './NavBar'
import CreateButton from './CreateButton'
import GridContainer from './GridContainer'


export default function Home() {
  return (
    <>
     <AuthProvider>
        <UserProvider>
          <TodoProvider>
            <FormProvider>
              <NavBar />
              <CreateButton />
              <GridContainer />
            </FormProvider>
          </TodoProvider>
        </UserProvider>
      </AuthProvider>
    </>
  )
}
