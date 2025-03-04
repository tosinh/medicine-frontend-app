import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-blue">
            Tình trạng đặt hàng
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-blue hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Đăng nhập
        </Button>
      )}
    </span>
  );
};

export default MainNav;
