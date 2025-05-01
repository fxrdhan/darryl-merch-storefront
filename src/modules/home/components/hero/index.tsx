import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h2"
            className="text-4xl leading-10 text-ui-fg-base font-normal mb-4"
          >
            Welcome to Darryl Store
          </Heading>
          <Heading
            level="h3"
            className="text-xl leading-8 text-ui-fg-subtle font-normal"
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
