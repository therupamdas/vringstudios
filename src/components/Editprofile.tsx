import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

export function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    language: "",
    whatsappNumber: "",
    instagramId: "",
    linkedInId: "",
    image: "", // or handle file separately
    college: "",
    accountStatus: "active",
    role: "Client",
    dateOfBirth: "",
    gender: "Male",
    city: "",
    state: "",
    bio: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put("/api/update", formData);
      alert("Profile updated!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {/* LEFT COLUMN */}
          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center gap-2">
              <Label htmlFor="name" className="w-32 text-right text-sm">
                Name
              </Label>
              <Input id="name" className="flex-1 h-8 text-sm px-2" />
            </div>

            {/* Username */}
            <div className="flex items-center gap-2">
              <Label htmlFor="username" className="w-32 text-right text-sm">
                Username
              </Label>
              <Input id="username" className="flex-1 h-8 text-sm px-2" />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Label htmlFor="email" className="w-32 text-right text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="flex-1 h-8 text-sm px-2"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-2">
              <Label htmlFor="password" className="w-32 text-right text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="flex-1 h-8 text-sm px-2"
              />
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-2">
              <Label htmlFor="phone" className="w-32 text-right text-sm">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                className="flex-1 h-8 text-sm px-2"
              />
            </div>
            {/* Language */}
            <div className="flex items-center gap-2">
              <Label htmlFor="language" className="w-32 text-right text-sm">
                Languages
              </Label>
              <Input id="language" className="flex-1 h-8 text-sm px-2" />
            </div>
            {/* WhatsApp Number */}
            <div className="flex items-center gap-2">
              <Label htmlFor="whatsapp" className="w-32 text-right text-sm">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                className="flex-1 h-8 text-sm px-2"
              />
            </div>
            {/* Instagram ID */}
            <div className="flex items-center gap-2">
              <Label htmlFor="insta" className="w-32 text-right text-sm">
                Instagram
              </Label>
              <Input id="insta" className="flex-1 h-8 text-sm px-2" />
            </div>

            {/* LinkedIn ID */}
            <div className="flex items-center gap-2">
              <Label htmlFor="linkedin" className="w-32 text-right text-sm">
                LinkedIn
              </Label>
              <Input id="linkedin" className="flex-1 h-8 text-sm px-2" />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">
            {/* Image */}
            <div className="flex items-center gap-2">
              <Label htmlFor="image" className="w-32 text-right text-sm">
                Image
              </Label>
              <input
                id="image"
                type="file"
                className="flex-1 text-sm file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
            {/* College */}
            <div className="flex items-center gap-2">
              <Label htmlFor="college" className="w-32 text-right text-sm">
                College
              </Label>
              <Input id="college" className="flex-1 h-8 text-sm px-2" />
            </div>

            {/* Account Status */}
            <div className="flex items-center gap-2">
              <Label
                htmlFor="accountStatus"
                className="w-32 text-right text-sm"
              >
                Status
              </Label>
              <select
                id="accountStatus"
                className="flex-1 h-8 text-sm px-2 border border-gray-300 rounded-md focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2">
              <Label htmlFor="role" className="w-32 text-right text-sm">
                Role
              </Label>
              <select
                id="role"
                className="flex-1 h-8 text-sm px-2 border border-gray-300  focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 rounded-md"
              >
                <option value="Client">Client</option>
                <option value="Editor">Editor</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="flex items-center gap-2">
              <Label htmlFor="dob" className="w-32 text-right text-sm">
                DOB
              </Label>
              <Input
                id="dob"
                type="date"
                className="flex-1 h-8 text-sm px-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
              />
            </div>

            {/* Gender */}
            <div className="flex items-center gap-2">
              <Label htmlFor="gender" className="w-32 text-right text-sm">
                Gender
              </Label>
              <select
                id="gender"
                className="flex-1 h-8 text-sm px-2 border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* City */}
            <div className="flex items-center gap-2">
              <Label htmlFor="city" className="w-32 text-right text-sm">
                City
              </Label>
              <Input id="city" className="flex-1 h-8 text-sm px-2" />
            </div>

            {/* State */}
            <div className="flex items-center gap-2">
              <Label htmlFor="state" className="w-32 text-right text-sm">
                State
              </Label>
              <Input id="state" className="flex-1 h-8 text-sm px-2" />
            </div>
            {/* Bio */}
            <div className="flex items-start gap-2">
              <Label htmlFor="bio" className="w-32 text-right text-sm pt-1">
                Bio
              </Label>
              <textarea
                id="bio"
                className="py-1 resize-none h-12 flex-1 text-sm px-2 border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 rounded-md "
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
