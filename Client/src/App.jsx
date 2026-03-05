import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage"
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import { Toaster } from "react-hot-toast"
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import LoginSuccessPage from "./pages/auth/Social/LoginSuccess";
import Profile from "./pages/Profile/Profile";
import DestinationsPage from "./pages/DestinationsPage";
import BenefitsPage from "./pages/BenefitsPage";
import DealsPage from "./components/Deals/DealsPage";
import VerifyPage from "./pages/auth/Verify";
import Otpverifypage from "./pages/auth/Otpverifypage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="login/success" element={<LoginSuccessPage />} />
            <Route path="verify" element={<VerifyPage />} />
            <Route path="otp-verify" element={<Otpverifypage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
