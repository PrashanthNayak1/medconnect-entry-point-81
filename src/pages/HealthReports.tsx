
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Home as HomeIcon, Package, Phone as ContactIcon, User, Menu, Calendar, Heart, Thermometer, Droplet } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

// Sample weekly data
const weeklyData = [
  {
    week: "Week 1 (June 3-9, 2024)",
    temperature: "98.6°F",
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    weight: "75 kg",
    bloodSugar: "95 mg/dL",
    status: "Normal"
  },
  {
    week: "Week 2 (June 10-16, 2024)",
    temperature: "99.1°F",
    bloodPressure: "125/82",
    heartRate: "75 bpm",
    weight: "74.8 kg",
    bloodSugar: "102 mg/dL",
    status: "Slightly Elevated"
  },
  {
    week: "Week 3 (June 17-23, 2024)",
    temperature: "98.4°F",
    bloodPressure: "118/78",
    heartRate: "70 bpm",
    weight: "74.5 kg",
    bloodSugar: "88 mg/dL",
    status: "Normal"
  },
  {
    week: "Week 4 (June 24-30, 2024)",
    temperature: "98.8°F",
    bloodPressure: "122/79",
    heartRate: "73 bpm",
    weight: "74.2 kg",
    bloodSugar: "94 mg/dL",
    status: "Normal"
  },
  {
    week: "Week 5 (July 1-7, 2024)",
    temperature: "98.7°F",
    bloodPressure: "119/77",
    heartRate: "71 bpm",
    weight: "74.0 kg",
    bloodSugar: "91 mg/dL",
    status: "Optimal"
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
            Your complete weekly health data overview
          </p>
        </div>

        {/* Weekly Data Cards */}
        <div className="space-y-6">
          {weeklyData.map((week, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span>{week.week}</span>
                  </CardTitle>
                  {getStatusBadge(week.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <div>
                      <div className="text-sm text-gray-600">Temperature</div>
                      <div className="font-semibold">{week.temperature}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-600">Blood Pressure</div>
                      <div className="font-semibold">{week.bloodPressure}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-sm text-gray-600">Heart Rate</div>
                      <div className="font-semibold">{week.heartRate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div>
                      <div className="text-sm text-gray-600">Weight</div>
                      <div className="font-semibold">{week.weight}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Droplet className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="text-sm text-gray-600">Blood Sugar</div>
                      <div className="font-semibold">{week.bloodSugar}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthReports;
