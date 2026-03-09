import { Link, Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/common/Logo";

const AuthLayout = () => {
  const navigate = useNavigate();
  const footerImage = `${import.meta.env.BASE_URL}assets/img/bg/footer.svg`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* ===== HEADER ===== */}
      <header className="w-full px-6 py-4 bg-white border-b flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">

          {/* Back Button (Mobile Only) */}
          <button
            onClick={() => navigate(-1)}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-orange-500 hover:text-white transition"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Logo */}
          <Link to="/">
            <Logo showText={true} variant="dark" className="scale-90" />
          </Link>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex flex-1 items-center justify-center ">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="mt-auto">

        {/* Visible Footer Image */}
        <div className="w-full">
          <img
            src={footerImage}
            alt="footer decoration"
            className="w-full h-28 object-cover"
          />
        </div>

        <div className="bg-white text-center text-sm text-gray-600 py-4 border-t">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#cf3425]">
            Yatralo
          </span>. All Rights Reserved.
        </div>

      </footer>
    </div>
  );
};

export default AuthLayout;
