import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const Hero = () => {
  return (
    <div className="h-[85vh] w-full border-b border-ui-border-base relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 animate-gradient-xy bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300"></div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

      <div
        className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center small:p-32 gap-8 text-white"
      >
        <span className="shadow-lg p-6 rounded-lg bg-black bg-opacity-30 backdrop-blur-sm">
          <Heading
            level="h2"
            // Increased font size for the main heading
            className="text-6xl md:text-7xl leading-tight font-bold mb-6"
          >
            Welcome to Darryl Store
          </Heading>
          <Heading
            level="h3"
            // Increased font size for the subheading
            className="text-2xl md:text-3xl leading-8 font-medium"
          >
            Discover the Best Products Here
          </Heading>
        </span>
        <LocalizedClientLink href="/store">
          <Button variant="primary">Explore Products</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
