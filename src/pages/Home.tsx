
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, AlertTriangle, Pill, Phone, FileText, Home as HomeIcon, Package, Phone as ContactIcon, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavigationLinks = () => (
    <>
      <Link to="/home" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to MedConnect
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your comprehensive health monitoring and management platform
          </p>
          <Badge variant="secondary" className="text-lg px-8 py-3 bg-blue-100 text-blue-800">
            Track • Monitor • Manage Your Health
          </Badge>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Live Records Data */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Live Records Data</CardTitle>
              <CardDescription className="text-gray-600">
                Real-time health monitoring and live data tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-12"
              >
                <Link to="/live-records">View Live Data</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Last Recorded Data */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Last Week's Data</CardTitle>
              <CardDescription className="text-gray-600">
                Review your health records from the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12"
              >
                <Link to="/weekly-records">View Weekly Data</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Emergency */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Emergency</CardTitle>
              <CardDescription className="text-gray-600">
                Quick access to emergency contacts and services
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-12"
              >
                <Link to="/emergency">Emergency Access</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Track Medicine */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Pill className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Track Medicine</CardTitle>
              <CardDescription className="text-gray-600">
                Monitor medication schedules and dosages
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium h-12"
              >
                <Link to="/medicine-tracker">Track Medicine</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Contact Doctor */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Contact Doctor</CardTitle>
              <CardDescription className="text-gray-600">
                Connect with your healthcare providers instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium h-12"
              >
                <Link to="/contact-doctor">Contact Doctor</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Health Reports */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Health Reports</CardTitle>
              <CardDescription className="text-gray-600">
                Generate and view comprehensive health reports
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium h-12"
              >
                <Link to="/health-reports">View Reports</Link>
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* Quick Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Your Health at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-gray-600">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">Real-time</div>
              <div className="text-gray-600">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">AI-Powered</div>
              <div className="text-gray-600">Insights</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
