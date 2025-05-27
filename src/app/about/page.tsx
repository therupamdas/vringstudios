import { Card,  CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">

      {/* About Intro */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About VringStudios</h1>
        <p className="text-lg text-gray-700">
          At VringStudios, we create immersive digital experiences for creators and communities worldwide. 
          Our mission is to empower artists, developers, and storytellers with cutting-edge tools and platforms.
        </p>
      </section>

      {/* Our Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Innovation</CardTitle>
            <CardDescription>We push boundaries to deliver state-of-the-art creative tools.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Community</CardTitle>
            <CardDescription>We believe in collaboration and the power of shared creativity.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Integrity</CardTitle>
            <CardDescription>Honesty, transparency, and respect guide every step we take.</CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-12">

          <div className="flex flex-col items-center max-w-xs text-center">
            <Avatar className="mb-4">
              <AvatarImage src="/team/jane.jpg" alt="Jane Doe" />
              <AvatarFallback>RD</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-medium">Rupam Das</h3>
            <p className="text-sm text-gray-500 mb-2">Founder & CEO</p>
            <p className="text-gray-600 text-sm">
              Visionary leader with 10+ years of experience driving innovation in tech and design.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs text-center">
            <Avatar className="mb-4">
              <AvatarImage src="/team/john.jpg" alt="John Smith" />
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-medium">Hrishikesh Sonowal</h3>
            <p className="text-sm text-gray-500 mb-2">Lead Developer</p>
            <p className="text-gray-600 text-sm">
              Expert in scalable architecture and passionate about building user-friendly experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
        <p className="mb-6 text-gray-700 max-w-md mx-auto">
          Whether you're a creator, collaborator, or enthusiast, VringStudios welcomes you. Lets build something amazing together.
        </p>
        <Button size="lg">Get In Touch</Button>
      </section>

    </main>
  )
}
