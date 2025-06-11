
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import WeeklyRecords from "./pages/WeeklyRecords";
import LiveRecords from "./pages/LiveRecords";
import Emergency from "./pages/Emergency";
import MedicineTracker from "./pages/MedicineTracker";
import HealthReports from "./pages/HealthReports";
import WeekData from "./pages/WeekData";
import ContactDoctor from "./pages/ContactDoctor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weekly-records" element={<WeeklyRecords />} />
          <Route path="/live-records" element={<LiveRecords />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/medicine-tracker" element={<MedicineTracker />} />
          <Route path="/health-reports" element={<HealthReports />} />
          <Route path="/week-data/:weekId" element={<WeekData />} />
          <Route path="/contact-doctor" element={<ContactDoctor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
