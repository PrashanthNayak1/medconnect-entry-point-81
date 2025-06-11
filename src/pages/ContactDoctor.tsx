
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Home as HomeIcon, Package, Phone as ContactIcon, User, Menu, MessageCircle, Video, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    phone: "+1 (555) 123-4567",
    email: "dr.johnson@medconnect.com",
    location: "Heart Care Center, Floor 3",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    status: "Available",
    image: "/lovable-uploads/a580b35e-da8c-4352-9b3d-c4f01a65ef09.png"
  },
  {
    name: "Dr. Michael Chen",
    specialty: "General Physician",
    phone: "+1 (555) 234-5678",
    email: "dr.chen@medconnect.com",
    location: "General Medicine, Floor 2",
    availability: "Mon-Sat, 8:00 AM - 6:00 PM",
    status: "Busy",
    image: "/lovable-uploads/f774ab4f-49c1-46a3-9cb0-935098ea75cb.png"
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Endocrinologist",
    phone: "+1 (555) 345-6789",
    email: "dr.rodriguez@medconnect.com",
    location: "Diabetes Care Unit, Floor 4",
    availability: "Tue-Thu, 10:00 AM - 4:00 PM",
    status: "Available",
    image: "/lovable-uploads/44f92ce3-b732-4c77-a4ed-ccfe96943c61.png"
  }
];

const ContactDoctor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    return status === "Available" 
      ? <Badge className="bg-green-100 text-green-800">Available</Badge>
      : <Badge className="bg-red-100 text-red-800">Busy</Badge>;
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Phone className="w-10 h-10 text-orange-600" />
            <span>Contact Doctor</span>
          </h1>
          <p className="text-xl text-gray-600">
            Connect with your healthcare providers
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          {filteredDoctors.map((doctor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{doctor.name}</CardTitle>
                      <CardDescription className="text-lg font-medium text-orange-600">
                        {doctor.specialty}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(doctor.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="font-medium">{doctor.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="font-medium">{doctor.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="font-medium">{doctor.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Available:</span>
                      <span className="font-medium">{doctor.availability}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <Button className="bg-orange-600 hover:bg-orange-700 w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Video Call
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Appointment
                    </Button>
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

export default ContactDoctor;
