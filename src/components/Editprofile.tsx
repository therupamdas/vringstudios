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
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/model/User";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export function EditProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);
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
    image: "",
    college: "",
    accountStatus: "active",
    role: "Client",
    dateOfBirth: "",
    gender: "Male",
    city: "",
    state: "",
    bio: "",
  });

  // Update formData when `user` is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: user.password || "",
        phonenumber: user.phonenumber || "",
        language: user.language?.join(", ") || "",
        whatsappNumber: user.whatsappNumber || "",
        instagramId: user.instagramId || "",
        linkedInId: user.linkedInId || "",
        image: user.image || "",
        college: user.college || "",
        accountStatus: user.accountStatus || "active",
        role: user.role || "Client",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toLocaleString()
          : "",
        gender: user.gender || "Male",
        city: user.city || "",
        state: user.state || "",
        bio: user.bio || "",
      });
    }
  }, [user]);
  const { toast } = useToast();
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let updatedFormData = { ...formData };
      // Only hash password if it's changed from the original (optional optimization)
      if (formData.password && formData.password !== user?.password) {
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        updatedFormData.password = hashedPassword;
      }
      const res = await axios.put("/api/update", updatedFormData);
      toast({
        title: "Changes Saved",
        description: "Your info has been updated",
      });
      router.back();
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
              <Input
                id="name"
                className="flex-1 h-8 text-sm px-2"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Username */}
            <div className="flex items-center gap-2">
              <Label htmlFor="username" className="w-32 text-right text-sm">
                Username
              </Label>
              <Input
                id="username"
                className="flex-1 h-8 text-sm px-2"
                value={formData.username}
                onChange={handleChange}
              />
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <Label htmlFor="phonenumber" className="w-32 text-right text-sm">
                Phone
              </Label>
              <Input
                id="phonenumber"
                type="tel"
                className="flex-1 h-8 text-sm px-2"
                value={formData.phonenumber}
                onChange={handleChange}
              />
            </div>

            {/* Language */}
            <div className="flex items-center gap-2">
              <Label htmlFor="language" className="w-32 text-right text-sm">
                Languages
              </Label>
              <Input
                id="language"
                className="flex-1 h-8 text-sm px-2"
                value={formData.language}
                onChange={handleChange}
              />
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-2">
              <Label
                htmlFor="whatsappNumber"
                className="w-32 text-right text-sm"
              >
                WhatsApp
              </Label>
              <Input
                id="whatsappNumber"
                type="tel"
                className="flex-1 h-8 text-sm px-2"
                value={formData.whatsappNumber}
                onChange={handleChange}
              />
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-2">
              <Label htmlFor="instagramId" className="w-32 text-right text-sm">
                Instagram
              </Label>
              <Input
                id="instagramId"
                className="flex-1 h-8 text-sm px-2"
                value={formData.instagramId}
                onChange={handleChange}
              />
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-2">
              <Label htmlFor="linkedInId" className="w-32 text-right text-sm">
                LinkedIn
              </Label>
              <Input
                id="linkedInId"
                className="flex-1 h-8 text-sm px-2"
                value={formData.linkedInId}
                onChange={handleChange}
              />
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
                onChange={handleChange}
              />
            </div>

            {/* College */}
            <div className="flex items-center gap-2">
              <Label htmlFor="college" className="w-32 text-right text-sm">
                College
              </Label>
              <Input
                id="college"
                className="flex-1 h-8 text-sm px-2"
                value={formData.college}
                onChange={handleChange}
              />
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
                className="flex-1 h-8 text-sm px-2 border border-gray-300 rounded-md"
                value={formData.accountStatus}
                onChange={handleChange}
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
                className="flex-1 h-8 text-sm px-2 border border-gray-300 rounded-md"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Client">Client</option>
                <option value="Editor">Editor</option>
              </select>
            </div>

            {/* DOB */}
            <div className="flex items-center gap-2">
              <Label htmlFor="dateOfBirth" className="w-32 text-right text-sm">
                DOB
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                className="flex-1 h-8 text-sm px-2"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="flex items-center gap-2">
              <Label htmlFor="gender" className="w-32 text-right text-sm">
                Gender
              </Label>
              <select
                id="gender"
                className="flex-1 h-8 text-sm px-2 border border-gray-300 rounded-md"
                value={formData.gender}
                onChange={handleChange}
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
              <Input
                id="city"
                className="flex-1 h-8 text-sm px-2"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div className="flex items-center gap-2">
              <Label htmlFor="state" className="w-32 text-right text-sm">
                State
              </Label>
              <Input
                id="state"
                className="flex-1 h-8 text-sm px-2"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            {/* Bio */}
            <div className="flex items-start gap-2">
              <Label htmlFor="bio" className="w-32 text-right text-sm pt-1">
                Bio
              </Label>
              <textarea
                id="bio"
                className="py-1 resize-none h-12 flex-1 text-sm px-2 border border-gray-300 rounded-md"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
