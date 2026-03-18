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

// Flight Pages
import FlightLandingPage from "./pages/flight/FlightLandingPage";
import FlightSearchResultsPage from "./pages/flight/FlightSearchResultsPage";
import CheckoutPage from "./pages/flight/checkout/CheckoutPage";
import BookingSelectionPage from "./pages/flight/BookingSelectionPage";

// Hotel Pages
import HotelLandingPage from "./pages/hotel/HotelLandingPage";
import HotelSearchResultsPage from "./pages/hotel/HotelSearchResultsPage";

// Train Pages
import TrainLandingPage from "./pages/train/TrainLandingPage";
import TrainSearchResultsPage from "./pages/train/TrainSearchResultsPage";

// Bus Pages
import BusLandingPage from "./pages/bus/BusLandingPage";
import BusSearchResultsPage from "./pages/bus/BusSearchResultsPage";

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
            
            {/* Flights */}
            <Route path="flights" element={<FlightLandingPage />} />
            <Route path="flights/results" element={<FlightSearchResultsPage />} />
            
            {/* Hotels */}
            <Route path="hotels" element={<HotelLandingPage />} />
            <Route path="hotels/results" element={<HotelSearchResultsPage />} />
            
            {/* Trains */}
            <Route path="trains" element={<TrainLandingPage />} />
            <Route path="trains/results" element={<TrainSearchResultsPage />} />
            
            {/* Buses */}
            <Route path="buses" element={<BusLandingPage />} />
            <Route path="buses/results" element={<BusSearchResultsPage />} />
            
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="booking-selection" element={<BookingSelectionPage />} />
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
