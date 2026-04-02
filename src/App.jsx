import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";

// Layouts
const AppLayout = lazy(() => import("./layouts/AppLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// Pages
const Homepage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const LoginSuccessPage = lazy(() => import("./pages/auth/Social/LoginSuccess"));
const ProfilePage = lazy(() => import("./pages/User/ProfilePage"));
const WalletPage = lazy(() => import("./pages/User/WalletPage"));
const BookingsPage = lazy(() => import("./pages/User/BookingsPage"));
const SettingsPage = lazy(() => import("./pages/User/SettingsPage"));
const ActivityPage = lazy(() => import("./pages/User/ActivityPage"));
const AccountPage = lazy(() => import("./pages/User/AccountPage"));
const DestinationsPage = lazy(() => import("./components/Destination/DestinationsPage"));
const BenefitsPage = lazy(() => import("./components/Benefits/BenefitsPage"));
const DealsPage = lazy(() => import("./components/Deals/DealsPage"));
const OffersPage = lazy(() => import("./components/Deals/OffersPage"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const VerifyPage = lazy(() => import("./pages/auth/Verify"));
const Otpverifypage = lazy(() => import("./pages/auth/Otpverifypage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TravelGuidelines = lazy(() => import("./pages/info/TravelGuidelines"));
const WebCheckin = lazy(() => import("./pages/info/WebCheckin"));
const Safety = lazy(() => import("./pages/info/Safety"));
const HelpCenter = lazy(() => import("./pages/support/HelpCenter"));

// Flight Pages
const FlightLandingPage = lazy(() => import("./pages/flight/FlightLandingPage"));
const FlightSearchResultsPage = lazy(() => import("./pages/flight/FlightSearchResultsPage"));
const CheckoutPage = lazy(() => import("./pages/flight/checkout/CheckoutPage"));
const BookingSelectionPage = lazy(() => import("./pages/flight/BookingSelectionPage"));

// Hotel Pages
const HotelLandingPage = lazy(() => import("./pages/hotel/HotelLandingPage"));
const HotelSearchResultsPage = lazy(() => import("./pages/hotel/HotelSearchResultsPage"));
const HotelBookingSelectionPage = lazy(() => import("./pages/hotel/HotelBookingSelectionPage"));
const HotelCheckoutPage = lazy(() => import("./pages/hotel/checkout/HotelCheckoutPage"));

// Train Pages
const TrainLandingPage = lazy(() => import("./pages/train/TrainLandingPage"));
const TrainSearchResultsPage = lazy(() => import("./pages/train/TrainSearchResultsPage"));
const TrainBookingSelectionPage = lazy(() => import("./pages/train/TrainBookingSelectionPage"));
const TrainCheckoutPage = lazy(() => import("./pages/train/TrainCheckoutPage"));

// Bus Pages
const BusLandingPage = lazy(() => import("./pages/bus/BusLandingPage"));
const BusSearchResultsPage = lazy(() => import("./pages/bus/BusSearchResultsPage"));
const BusBookingSelectionPage = lazy(() => import("./pages/bus/BusBookingSelectionPage"));
const BusCheckoutPage = lazy(() => import("./pages/bus/BusCheckoutPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
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
              <Route path="offers" element={<OffersPage />} />
              <Route path="benefits" element={<BenefitsPage />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="travel-guidelines" element={<TravelGuidelines />} />
              <Route path="web-checkin" element={<WebCheckin />} />
              <Route path="safety" element={<Safety />} />
              <Route path="support" element={<HelpCenter />} />

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
              <Route path="/auth/login-success" element={<LoginSuccessPage />} />
              <Route path="/auth/verify" element={<VerifyPage />} />
              <Route path="/auth/otp-verify" element={<Otpverifypage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
