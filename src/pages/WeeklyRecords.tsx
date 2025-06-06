
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, AlertTriangle, Pill, Phone, FileText, Home as HomeIcon, Package, Phone as ContactIcon, User, Download, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for the last week
const weeklyData = {
  recordedDate: "2025-06-05",
  recordedTime: "14:30",
  temperature: "98.6°F",
  bloodPressure: "120/80 mmHg",
  spo2: "98%",
  heartRate: "72 bpm"
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

const WeeklyRecords = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const generateChartSVG = (data: any[], color: string, title: string) => {
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue;
    
    const points = data.map((d, i) => {
      const x = margin.left + (i / (data.length - 1)) * innerWidth;
      const y = margin.top + ((maxValue - d.value) / valueRange) * innerHeight;
      return `${x},${y}`;
    }).join(' ');
    
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="white"/>
      <text x="${width/2}" y="15" text-anchor="middle" font-size="14" font-weight="bold">${title}</text>
      <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2"/>
      <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="#666" stroke-width="1"/>
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="#666" stroke-width="1"/>
    </svg>`;
  };

  const handleDownloadReport = () => {
    const ecgSvg = generateChartSVG(ecgData, "#3b82f6", "ECG Data");
    const emgSvg = generateChartSVG(emgData, "#10b981", "EMG Data");
    
    const reportHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>MedConnect Weekly Health Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .data-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
        .data-item { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
        .chart-container { margin: 20px 0; text-align: center; }
        .chart { border: 1px solid #ddd; margin: 10px 0; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">
        <h1>MedConnect Weekly Health Report</h1>
        <p>Generated: ${new Date().toLocaleDateString()}</p>
    </div>
    
    <h2>Last Recorded Data</h2>
    <p><strong>Date:</strong> ${weeklyData.recordedDate}</p>
    <p><strong>Time:</strong> ${weeklyData.recordedTime}</p>
    
    <div class="data-grid">
        <div class="data-item">
            <h3>Temperature</h3>
            <p>${weeklyData.temperature}</p>
        </div>
        <div class="data-item">
            <h3>Blood Pressure</h3>
            <p>${weeklyData.bloodPressure}</p>
        </div>
        <div class="data-item">
            <h3>SpO2</h3>
            <p>${weeklyData.spo2}</p>
        </div>
        <div class="data-item">
            <h3>Heart Rate</h3>
            <p>${weeklyData.heartRate}</p>
        </div>
    </div>
    
    <h2>Chart Data</h2>
    <div class="chart-container">
        <div class="chart">${ecgSvg}</div>
        <div class="chart">${emgSvg}</div>
    </div>
</body>
</html>`;
    
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekly-health-report.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  const handleMobileChartScroll = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/a580b35e-da8c-4352-9b3d-c4f01a65ef09.png" 
                  alt="MedConnect Logo" 
                  className="w-8 h-6 object-contain"
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
            Last Week's Health Data
          </h1>
          <p className="text-xl text-gray-600">
            Your recorded health metrics from the past week
          </p>
        </div>

        {/* Last Recorded Data Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Last Recorded Data</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Recording Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Recorded Date</p>
                  <p className="text-lg font-semibold">{weeklyData.recordedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recorded Time</p>
                  <p className="text-lg font-semibold">{weeklyData.recordedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">{weeklyData.temperature}</div>
                <div className="text-gray-600">Temperature</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">{weeklyData.bloodPressure}</div>
                <div className="text-gray-600">Blood Pressure</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{weeklyData.spo2}</div>
                <div className="text-gray-600">SpO2</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{weeklyData.heartRate}</div>
                <div className="text-gray-600">Heart Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section - Individual Horizontal Scrolling */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ECG and EMG Data</h2>
          
          <div className="space-y-8">
            {/* ECG Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>ECG Data</span>
                </CardTitle>
                <CardDescription>Electrocardiogram readings from the past week</CardDescription>
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
                  <span>EMG Data</span>
                </CardTitle>
                <CardDescription>Electromyography readings from the past week</CardDescription>
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

        {/* Download Report Button */}
        <div className="text-center">
          <Button 
            onClick={handleDownloadReport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 px-8"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Weekly Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyRecords;
