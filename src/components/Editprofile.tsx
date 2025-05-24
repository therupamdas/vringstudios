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

export function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-right text-sm">
              Name
            </Label>
            <Input id="name" className="col-span-3 h-8 text-sm px-2" />
          </div>

          {/* Username */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="username" className="text-right text-sm">
              Username
            </Label>
            <Input id="username" className="col-span-3 h-8 text-sm px-2" />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="email" className="text-right text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3 h-8 text-sm px-2"
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="password" className="text-right text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3 h-8 text-sm px-2"
            />
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="phone" className="text-right text-sm">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              className="col-span-3 h-8 text-sm px-2"
            />
          </div>

          {/* Image */}
          <div className="grid grid-cols-4 items-center gap-3">
            <Label
              htmlFor="image"
              className="text-right text-sm font-medium"
            >
              Image
            </Label>
            <input
              id="image"
              type="file"
              className="col-span-3 text-sm file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          {/* Instagram ID */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="insta" className="text-right text-sm">
              Instagram ID
            </Label>
            <Input id="insta" className="col-span-3 h-8 text-sm px-2" />
          </div>

          {/* LinkedIn ID */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="linkedin" className="text-right text-sm">
              LinkedIn ID
            </Label>
            <Input id="linkedin" className="col-span-3 h-8 text-sm px-2" />
          </div>

          {/* Location */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="location" className="text-right text-sm">
              Location
            </Label>
            <Input id="location" className="col-span-3 h-8 text-sm px-2" />
          </div>

          {/* College */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="college" className="text-right text-sm">
              College
            </Label>
            <Input id="college" className="col-span-3 h-8 text-sm px-2" />
          </div>

          {/* Language */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="language" className="text-right text-sm">
              Language
            </Label>
            <Input id="language" className="col-span-3 h-8 text-sm px-2" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
