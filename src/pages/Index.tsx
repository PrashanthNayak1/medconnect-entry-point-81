import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, Building, UserPlus, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    dateOfBirth: "",
    emergencyContact: "",
    bloodType: "",
    allergies: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? "Login Successful" : "Registration Successful",
      description: isLogin ? "Welcome back to MedConnect!" : "Welcome to MedConnect! Please verify your email.",
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      fullName: "",
      phone: "",
      dateOfBirth: "",
      emergencyContact: "",
      bloodType: "",
      allergies: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-center space-y-6">
            <div className="w-48 h-48 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-2xl border border-gray-100">
              <img 
                src="/lovable-uploads/a580b35e-da8c-4352-9b3d-c4f01a65ef09.png" 
                alt="MedConnect Logo" 
                className="w-36 h-24 object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">MedConnect</h1>
              <p className="text-xl text-gray-600 mb-4">Your Health Monitoring Partner</p>
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-blue-100 text-blue-800">
                Track Your Health Journey
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex lg:hidden w-24 h-24 mx-auto bg-white rounded-2xl items-center justify-center shadow-lg border border-gray-100">
                <img 
                  src="/lovable-uploads/a580b35e-da8c-4352-9b3d-c4f01a65ef09.png" 
                  alt="MedConnect Logo" 
                  className="w-20 h-14 object-contain"
                />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isLogin ? "Welcome Back" : "Join MedConnect"}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {isLogin 
                    ? "Sign in to track your health records" 
                    : "Start monitoring your health today"
                  }
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Registration Fields */}
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="John Smith"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                          Date of Birth
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergencyContact"
                        name="emergencyContact"
                        type="text"
                        placeholder="Emergency contact number"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodType" className="text-sm font-medium text-gray-700">
                          Blood Type
                        </Label>
                        <Input
                          id="bloodType"
                          name="bloodType"
                          type="text"
                          placeholder="A+, B-, O+, etc."
                          value={formData.bloodType}
                          onChange={handleInputChange}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="allergies" className="text-sm font-medium text-gray-700">
                          Allergies
                        </Label>
                        <Input
                          id="allergies"
                          name="allergies"
                          type="text"
                          placeholder="Known allergies"
                          value={formData.allergies}
                          onChange={handleInputChange}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLogin ? (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <Separator className="my-6" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                  or
                </span>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  {isLogin ? "New to MedConnect?" : "Already have an account?"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleMode}
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 font-medium"
                >
                  {isLogin ? "Create an account" : "Sign in instead"}
                </Button>
              </div>

              {!isLogin && (
                <div className="text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <button className="text-blue-600 hover:underline">Terms of Service</button>
                    {" "}and{" "}
                    <button className="text-blue-600 hover:underline">Privacy Policy</button>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
