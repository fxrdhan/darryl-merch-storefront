import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white dark:bg-gray-800 flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge dark:text-white">
          Already have an account?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle dark:text-gray-400 mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
