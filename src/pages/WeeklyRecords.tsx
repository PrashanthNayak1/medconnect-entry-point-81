
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, AlertTriangle, Pill, Phone, FileText, Home as HomeIcon, Package, Phone as ContactIcon, User, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

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
  const handleDownloadReport = () => {
    // Simple download functionality - in real app this would generate a proper report
    const reportData = `
MedConnect Weekly Health Report
Generated: ${new Date().toLocaleDateString()}

Last Recorded Data:
Date: ${weeklyData.recordedDate}
Time: ${weeklyData.recordedTime}
Temperature: ${weeklyData.temperature}
Blood Pressure: ${weeklyData.bloodPressure}
SpO2: ${weeklyData.spo2}
Heart Rate: ${weeklyData.heartRate}

ECG and EMG data charts included in visual report.
    `;
    
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekly-health-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navigation Bar - Same as Home page */}
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

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
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

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ECG and EMG Data</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ecgData}>
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
                  </ResponsiveContainer>
                </ChartContainer>
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
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emgData}>
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
                  </ResponsiveContainer>
                </ChartContainer>
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
