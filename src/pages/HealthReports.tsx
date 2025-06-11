
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, TrendingUp, TrendingDown, Activity, Home as HomeIcon, Package, Phone as ContactIcon, User, Menu, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

// Sample health metrics data
const healthTrends = [
  { month: "Jan", bloodPressure: 120, heartRate: 72, weight: 75 },
  { month: "Feb", bloodPressure: 118, heartRate: 74, weight: 74.5 },
  { month: "Mar", bloodPressure: 122, heartRate: 71, weight: 74.2 },
  { month: "Apr", bloodPressure: 119, heartRate: 73, weight: 73.8 },
  { month: "May", bloodPressure: 121, heartRate: 72, weight: 73.5 },
  { month: "Jun", bloodPressure: 117, heartRate: 70, weight: 73.2 }
];

const recentReports = [
  {
    id: 1,
    title: "Monthly Health Summary",
    date: "June 2024",
    type: "Comprehensive",
    status: "Ready",
    trend: "improving"
  },
  {
    id: 2,
    title: "Blood Work Analysis",
    date: "May 2024",
    type: "Lab Results",
    status: "Ready",
    trend: "stable"
  },
  {
    id: 3,
    title: "Cardiac Assessment",
    date: "April 2024",
    type: "Specialist",
    status: "Ready",
    trend: "improving"
  },
  {
    id: 4,
    title: "Medication Review",
    date: "March 2024",
    type: "Pharmacy",
    status: "Ready",
    trend: "stable"
  }
];

const chartConfig = {
  bloodPressure: {
    label: "Blood Pressure",
    color: "#3b82f6"
  },
  heartRate: {
    label: "Heart Rate",
    color: "#10b981"
  },
  weight: {
    label: "Weight",
    color: "#f59e0b"
  }
};

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
            <span>Health Reports</span>
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive health analytics and reports
          </p>
        </div>

        {/* Health Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">118/78</div>
                  <div className="text-gray-600">Blood Pressure</div>
                </div>
                <TrendingDown className="w-8 h-8 text-green-500" />
              </div>
              <Badge className="mt-2 bg-green-100 text-green-800">Optimal</Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">72 bpm</div>
                  <div className="text-gray-600">Heart Rate</div>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
              <Badge className="mt-2 bg-green-100 text-green-800">Normal</Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">73.2 kg</div>
                  <div className="text-gray-600">Weight</div>
                </div>
                <TrendingDown className="w-8 h-8 text-green-500" />
              </div>
              <Badge className="mt-2 bg-green-100 text-green-800">On Target</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Health Trends Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span>6-Month Health Trends</span>
            </CardTitle>
            <CardDescription>Track your health metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="bloodPressure" 
                    stroke="var(--color-bloodPressure)" 
                    strokeWidth={2}
                    name="Blood Pressure"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="var(--color-heartRate)" 
                    strokeWidth={2}
                    name="Heart Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Available Reports</h2>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <FileText className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-orange-600" />
                      <span>{report.title}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {report.trend === "improving" ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-blue-500" />
                      )}
                      <Badge className="bg-green-100 text-green-800">{report.status}</Badge>
                    </div>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{report.date} • {report.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthReports;
