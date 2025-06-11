
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, Home as HomeIcon, Package, Phone as ContactIcon, User, Menu, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

// Sample emergency data
const emergencyData = {
  recordedDate: "2025-06-11",
  recordedTime: "12:45",
  temperature: "103.2°F",
  bloodPressure: "150/95 mmHg",
  spo2: "85%",
  heartRate: "120 bpm"
};

// Sample ECG data showing irregular pattern
const ecgData = [
  { time: "00:00", value: 0 },
  { time: "00:01", value: 1.5 },
  { time: "00:02", value: 2.2 },
  { time: "00:03", value: 0.8 },
  { time: "00:04", value: -0.5 },
  { time: "00:05", value: -1.2 },
  { time: "00:06", value: 0.3 },
  { time: "00:07", value: 1.8 },
  { time: "00:08", value: 2.5 },
  { time: "00:09", value: 1.2 },
  { time: "00:10", value: 0 }
];

// Sample EMG data showing high activity
const emgData = [
  { time: "00:00", value: 0.5 },
  { time: "00:01", value: 1.3 },
  { time: "00:02", value: 2.1 },
  { time: "00:03", value: 1.8 },
  { time: "00:04", value: 2.2 },
  { time: "00:05", value: 1.4 },
  { time: "00:06", value: 1.8 },
  { time: "00:07", value: 2.4 },
  { time: "00:08", value: 2.0 },
  { time: "00:09", value: 1.7 },
  { time: "00:10", value: 1.1 }
];

const chartConfig = {
  ecg: {
    label: "ECG",
    color: "#ef4444"
  },
  emg: {
    label: "EMG", 
    color: "#f59e0b"
  }
};

const Emergency = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallAmbulance = () => {
    if (!isCallActive) {
      setIsCallActive(true);
      setTimer(0);
      toast({
        title: "Emergency Call Initiated",
        description: "Calling ambulance services...",
        variant: "destructive",
      });
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
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
        {/* Emergency Timer */}
        {isCallActive && (
          <div className="text-center mb-8">
            <div className="bg-red-600 text-white px-6 py-4 rounded-lg inline-block">
              <div className="text-sm font-medium mb-1">Emergency Call Active</div>
              <div className="text-3xl font-bold">{formatTime(timer)}</div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Emergency Health Data
          </h1>
          <p className="text-xl text-gray-600">
            Critical health monitoring and emergency response
          </p>
        </div>

        {/* Emergency Actions */}
        <div className="mb-8 text-center">
          <Button 
            onClick={handleCallAmbulance}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
            disabled={isCallActive}
          >
            <Phone className="w-6 h-6 mr-2" />
            {isCallActive ? "Ambulance Called" : "Call Ambulance"}
          </Button>
        </div>

        {/* Emergency Data Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Critical Health Data</h2>
          
          <Card className="mb-6 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Calendar className="w-5 h-5" />
                <span>Emergency Recording Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-lg font-semibold">{emergencyData.recordedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-lg font-semibold">{emergencyData.recordedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-red-300">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">{emergencyData.temperature}</div>
                <div className="text-gray-600">Temperature</div>
                <div className="text-xs text-red-500 mt-1">HIGH</div>
              </CardContent>
            </Card>
            
            <Card className="border-red-300">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">{emergencyData.bloodPressure}</div>
                <div className="text-gray-600">Blood Pressure</div>
                <div className="text-xs text-red-500 mt-1">HIGH</div>
              </CardContent>
            </Card>
            
            <Card className="border-red-300">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">{emergencyData.spo2}</div>
                <div className="text-gray-600">SpO2</div>
                <div className="text-xs text-red-500 mt-1">LOW</div>
              </CardContent>
            </Card>
            
            <Card className="border-red-300">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">{emergencyData.heartRate}</div>
                <div className="text-gray-600">Heart Rate</div>
                <div className="text-xs text-red-500 mt-1">HIGH</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency ECG and EMG Data</h2>
          
          <div className="space-y-8">
            {/* ECG Chart */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  <span>Critical ECG Data</span>
                </CardTitle>
                <CardDescription>Irregular Electrocardiogram readings detected</CardDescription>
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
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </ChartWrapper>
              </CardContent>
            </Card>

            {/* EMG Chart */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  <span>Critical EMG Data</span>
                </CardTitle>
                <CardDescription>High muscle activity detected</CardDescription>
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
                        strokeWidth={3}
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

export default Emergency;
