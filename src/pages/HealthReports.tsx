
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Home as HomeIcon, Package, Phone as ContactIcon, User, Menu, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

// Sample weekly data for the list
const weeklyData = [
  {
    id: "week1",
    week: "Week 1 (June 3-9, 2024)",
    status: "Normal",
    summary: "All vitals within normal range"
  },
  {
    id: "week2",
    week: "Week 2 (June 10-16, 2024)",
    status: "Slightly Elevated",
    summary: "Temperature and blood pressure slightly elevated"
  },
  {
    id: "week3",
    week: "Week 3 (June 17-23, 2024)",
    status: "Normal",
    summary: "Improved readings, all parameters normal"
  },
  {
    id: "week4",
    week: "Week 4 (June 24-30, 2024)",
    status: "Normal",
    summary: "Consistent healthy readings throughout the week"
  },
  {
    id: "week5",
    week: "Week 5 (July 1-7, 2024)",
    status: "Optimal",
    summary: "Excellent health metrics across all parameters"
  }
];

const HealthReports = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavigationLinks = () => (
    <>
      <Link to="/home" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium">
        <HomeIcon className="w-4 h-4" />
        <span>Home</span>
      </Link>
      <Link to="/products" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium">
        <Package className="w-4 h-4" />
        <span>Products</span>
      </Link>
      <Link to="/contact" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium">
        <ContactIcon className="w-4 h-4" />
        <span>Contact Us</span>
      </Link>
      <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium">
        <User className="w-4 h-4" />
        <span>Profile</span>
      </Link>
    </>
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Normal":
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
      case "Slightly Elevated":
        return <Badge className="bg-yellow-100 text-yellow-800">Slightly Elevated</Badge>;
      case "Optimal":
        return <Badge className="bg-blue-100 text-blue-800">Optimal</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Navigation Bar with Mobile Menu */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md border">
                <img 
                  src="/lovable-uploads/44f92ce3-b732-4c77-a4ed-ccfe96943c61.png" 
                  alt="MedConnect Logo" 
                  className="w-10 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">MedConnect</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavigationLinks />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-6 mt-8">
                    <NavigationLinks />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
            <FileText className="w-10 h-10 text-orange-600" />
            <span>Weekly Health Reports</span>
          </h1>
          <p className="text-xl text-gray-600">
            Select a week to view detailed health data
          </p>
        </div>

        {/* Weekly Data Cards */}
        <div className="space-y-4">
          {weeklyData.map((week, index) => (
            <Link key={index} to={`/week-data/${week.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <span>{week.week}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(week.status)}
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{week.summary}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthReports;
