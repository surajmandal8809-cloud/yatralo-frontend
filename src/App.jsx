import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import LoginSuccessPage from "./pages/auth/Social/LoginSuccess";
import ProfilePage from "./pages/Profile/Profile";
import DestinationsPage from "./pages/DestinationsPage";
import BenefitsPage from "./pages/BenefitsPage";
import DealsPage from "./components/Deals/DealsPage";
import VerifyPage from "./pages/auth/Verify";
import Otpverifypage from "./pages/auth/Otpverifypage";
import NotFound from "./pages/NotFound";
import FlightsPage from "./pages/FlightsPage";
import TrainsPage from "./pages/TrainsPage";
import BookingsPage from "./pages/BookingsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* App routes with Header + Footer */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="deals" element={<DealsPage />} />
            <Route path="benefits" element={<BenefitsPage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="trains" element={<TrainsPage />} />
            <Route path="bookings" element={<BookingsPage />} />
          </Route>

          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="login/success" element={<LoginSuccessPage />} />
            <Route path="verify" element={<VerifyPage />} />
            <Route path="otp-verify" element={<Otpverifypage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
