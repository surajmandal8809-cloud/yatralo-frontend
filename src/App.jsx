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
import ProfilePage from "./pages/User/ProfilePage";
import WalletPage from "./pages/User/WalletPage";
import BookingsPage from "./pages/User/BookingsPage";
import SettingsPage from "./pages/User/SettingsPage";
import ActivityPage from "./pages/User/ActivityPage";
import AccountPage from "./pages/User/AccountPage";
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
import HotelBookingSelectionPage from "./pages/hotel/HotelBookingSelectionPage";
import HotelCheckoutPage from "./pages/hotel/checkout/HotelCheckoutPage";

// Train Pages
import TrainLandingPage from "./pages/train/TrainLandingPage";
import TrainSearchResultsPage from "./pages/train/TrainSearchResultsPage";
import TrainBookingSelectionPage from "./pages/train/TrainBookingSelectionPage";
import TrainCheckoutPage from "./pages/train/TrainCheckoutPage";

// Bus Pages
import BusLandingPage from "./pages/bus/BusLandingPage";
import BusSearchResultsPage from "./pages/bus/BusSearchResultsPage";
import BusBookingSelectionPage from "./pages/bus/BusBookingSelectionPage";
import BusCheckoutPage from "./pages/bus/BusCheckoutPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* App routes with Header + Footer */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="deals" element={<DealsPage />} />
            <Route path="benefits" element={<BenefitsPage />} />

            {/* Flights */}
            <Route path="flights" element={<FlightLandingPage />} />
            <Route path="flights/results" element={<FlightSearchResultsPage />} />

            {/* Hotels */}
            <Route path="hotels" element={<HotelLandingPage />} />
            <Route path="hotels/results" element={<HotelSearchResultsPage />} />
            <Route path="hotels/booking" element={<HotelBookingSelectionPage />} />
            <Route path="hotels/checkout" element={<HotelCheckoutPage />} />

            {/* Trains */}
            <Route path="trains" element={<TrainLandingPage />} />
            <Route path="trains/results" element={<TrainSearchResultsPage />} />
            <Route path="trains/booking" element={<TrainBookingSelectionPage />} />
            <Route path="trains/checkout" element={<TrainCheckoutPage />} />

            {/* Buses */}
            <Route path="buses" element={<BusLandingPage />} />
            <Route path="buses/results" element={<BusSearchResultsPage />} />
            <Route path="buses/booking" element={<BusBookingSelectionPage />} />
            <Route path="buses/checkout" element={<BusCheckoutPage />} />

            <Route path="checkout/:step" element={<CheckoutPage />} />
            <Route path="checkout" element={<CheckoutPage />} />

            <Route path="booking-selection" element={<BookingSelectionPage />} />
          </Route>

          {/* Auth routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
            <Route path="/auth/resetpassword" element={<ResetPassword />} />
            <Route path="/auth/success" element={<LoginSuccessPage />} />
            <Route path="/auth/verify" element={<VerifyPage />} />
            <Route path="/auth/otp-verify" element={<Otpverifypage />} />
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
