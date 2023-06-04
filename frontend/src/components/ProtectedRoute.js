import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteElement = ({ ...props }) => {
  return (
    props.loggedIn ? <Outlet  /> : <Navigate to="/sign-in" replace={true} />
  )
}

