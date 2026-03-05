'use client'

import { YStack, XStack, Text, Button } from '@mezon-tutors/app/ui'

export default function HomeScreen() {
  return (
    <YStack backgroundColor="#0b1120" minHeight="100vh">

      {/* HEADER */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        padding="$6"
      >
        <Text color="white" fontSize={20} fontWeight="700">
          MEZON
        </Text>

        <XStack gap="$6">
          <Text color="white">Home</Text>
          <Text color="white">Courses</Text>
          <Text color="white">Tutors</Text>
          <Text color="white">About</Text>
        </XStack>

        <Button backgroundColor="white">
          Login
        </Button>
      </XStack>

      {/* HERO */}
      <XStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        gap="$12"
        padding="$10"
      >

        {/* TEXT */}
        <YStack gap="$5" maxWidth={520}>
          <Text
            color="white"
            fontSize={52}
            fontWeight="700"
            lineHeight={60}
          >
            Learn with the Best Tutors
          </Text>

          <Text
            color="#9ca3af"
            fontSize={18}
            lineHeight={26}
          >
            Find professional tutors to help you improve your skills,
            achieve your goals, and learn faster than ever.
          </Text>

          <XStack gap="$4" marginTop="$4">

            <Button backgroundColor="#2563eb" color="white">
              Get Started
            </Button>

            <Button>
              Browse Tutors
            </Button>

          </XStack>
        </YStack>

        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=600"
          style={{
            width: 380,
            borderRadius: 20,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        />

      </XStack>

    </YStack>
  )
}