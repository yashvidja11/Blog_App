import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userAuth/signinSlice";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {login} = useSelector((state)=>state.signInData);
  return (
    <header className=" py-4" style={{backgroundColor:"#9d9d7c"}}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <h1 className="hover:text-black  text-white text-2xl font-semibold">
          <Link to="/" className=" text-3xl font-semibold">
            BlogVista
          </Link>
        </h1>
        <nav className="flex items-center gap-5">
          <Link to="/blog" className="hover:text-black text-white font-semibold">
            My Blog
          </Link>
          <Link to="/about" className="hover:text-black text-white font-semibold">
            About
          </Link>
          <Link to="/contact" className="hover:text-black text-white font-semibold">
            Contact
          </Link>
         {!login ? <Link
            to="/login"
            className="hover:text-black text-white border border-white rounded py-1 px-4 font-semibold"
          >
            Login
          </Link> :
          <p
           onClick={()=>{
            localStorage.removeItem("loginuser")
            dispatch(logout())
            navigate("/")
           }}
            className="hover:text-black text-white cursor-pointer font-semibold"
          >
            Logout
          </p>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
