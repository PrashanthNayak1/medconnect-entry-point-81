
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, Home as HomeIcon, Package, Phone as ContactIcon, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for live readings
const liveData = {
  recordedDate: "2025-06-11",
  recordedTime: "12:45",
  temperature: "98.4°F",
  bloodPressure: "118/78 mmHg",
  spo2: "99%",
  heartRate: "74 bpm"
};

// Sample ECG data
const ecgData = [
  { time: "00:00", value: 0 },
  { time: "00:01", value: 0.5 },
  { time: "00:02", value: 1.2 },
  { time: "00:03", value: 0.8 },
  { time: "00:04", value: -0.2 },
  { time: "00:05", value: -0.8 },
  { time: "00:06", value: 0.1 },
  { time: "00:07", value: 0.7 },
  { time: "00:08", value: 1.1 },
  { time: "00:09", value: 0.6 },
  { time: "00:10", value: 0 }
];

// Sample EMG data
const emgData = [
  { time: "00:00", value: 0.1 },
  { time: "00:01", value: 0.3 },
  { time: "00:02", value: 0.8 },
  { time: "00:03", value: 1.2 },
  { time: "00:04", value: 0.9 },
  { time: "00:05", value: 0.4 },
  { time: "00:06", value: 0.2 },
  { time: "00:07", value: 0.6 },
  { time: "00:08", value: 1.0 },
  { time: "00:09", value: 0.7 },
  { time: "00:10", value: 0.3 }
];

const chartConfig = {
  ecg: {
    label: "ECG",
    color: "#3b82f6"
  },
  emg: {
    label: "EMG", 
    color: "#10b981"
  }
};

const LiveRecords = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const ChartWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
    if (isMobile) {
      return (
        <ScrollArea className="w-full h-96">
          <div 
            className="w-[1200px] h-80"
            style={{ overflowX: 'auto', overflowY: 'hidden' }}
          >
            {children}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      );
    }

    return (
      <ScrollArea className="w-full">
        <div 
          className="w-[1200px] h-80 cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => {
            const target = e.currentTarget as HTMLElement;
            const startX = e.pageX - target.offsetLeft;
            const scrollLeft = target.scrollLeft;
            
            const handleMouseMove = (e: MouseEvent) => {
              const x = e.pageX - target.offsetLeft;
              const walk = (x - startX) * 2;
              target.scrollLeft = scrollLeft - walk;
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          {children}
        </div>
      </ScrollArea>
    );
  };

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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live Health Data
          </h1>
          <p className="text-xl text-gray-600">
            Real-time health monitoring and live data tracking
          </p>
        </div>

        {/* Live Data Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Live Data</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>Live Recording Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Current Date</p>
                  <p className="text-lg font-semibold">{liveData.recordedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Time</p>
                  <p className="text-lg font-semibold">{liveData.recordedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">{liveData.temperature}</div>
                <div className="text-gray-600">Temperature</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">{liveData.bloodPressure}</div>
                <div className="text-gray-600">Blood Pressure</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{liveData.spo2}</div>
                <div className="text-gray-600">SpO2</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{liveData.heartRate}</div>
                <div className="text-gray-600">Heart Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section - Individual Horizontal Scrolling */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Live ECG and EMG Data</h2>
          
          <div className="space-y-8">
            {/* ECG Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Live ECG Data</span>
                </CardTitle>
                <CardDescription>Real-time Electrocardiogram readings</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartWrapper title="ECG Data">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart data={ecgData} width={1200} height={300}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="var(--color-ecg)" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </ChartWrapper>
              </CardContent>
            </Card>

            {/* EMG Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Live EMG Data</span>
                </CardTitle>
                <CardDescription>Real-time Electromyography readings</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartWrapper title="EMG Data">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart data={emgData} width={1200} height={300}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="var(--color-emg)" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </ChartWrapper>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRecords;
