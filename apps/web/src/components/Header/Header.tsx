'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'; 
import { XStack, Text, Button, Image } from 'tamagui'; 
import { Globe, Moon } from 'lucide-react'; 

export default function Header() {
  const { t } = useTranslation();

  return (
    <XStack
      tag="header"
      height={80} 
      paddingHorizontal={60}
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="rgba(255, 255, 255, 0.05)"
      backgroundColor="#101726"
    >
      {/* LEFT - LOGO */}
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <XStack alignItems="center" gap={10} cursor="pointer">
          <Image source={{ uri: '/icons/Background.svg', width: 32, height: 32 }} />
          <Text color="white" fontWeight="700" fontSize={18}>
            {t('header.brand_name', 'TutorMatch')}
          </Text>
        </XStack>
      </Link>

      {/* CENTER - NAVIGATION */}
      <XStack tag="nav" gap={40}>
        <Link href="#" passHref style={{ textDecoration: 'none' }}>
          <Text color="#cbd5e1" fontSize={15} fontWeight="500" hoverStyle={{ color: 'white' }} animation="quick">
            {t('header.find_tutor', 'Find Tutor')} 
          </Text>
        </Link>
        <Link href="#" passHref style={{ textDecoration: 'none' }}>
          <Text color="#cbd5e1" fontSize={15} fontWeight="500" hoverStyle={{ color: 'white' }} animation="quick">
            {t('header.become_tutor', 'Become a Tutor')} 
          </Text>
        </Link>
      </XStack>

      {/* RIGHT - ACTIONS */}
      <XStack alignItems="center" gap={28}>
        <Button
          backgroundColor="#2563eb"
          borderWidth={0}
          paddingHorizontal={28}
          paddingVertical={10}
          borderRadius={999} 
          color="white" 
          fontWeight="600"
          cursor="pointer"
          hoverStyle={{ backgroundColor: '#1d4ed8' }}
          pressStyle={{ scale: 0.97 }}
        >
          {t('header.login', 'Login')} 
        </Button>

        <XStack alignItems="center" gap={8} cursor="pointer" hoverStyle={{ opacity: 0.8 }} paddingHorizontal={8}>
          <Globe color="#cbd5e1" size={18} strokeWidth={2} />
          <Text color="#cbd5e1" fontSize={14} fontWeight="600">
            {t('header.lang_en', 'EN')} 
          </Text>
        </XStack>

        <XStack cursor="pointer" hoverStyle={{ opacity: 0.8 }} paddingHorizontal={8}>
          <Moon color="#cbd5e1" size={20} strokeWidth={2} />
        </XStack>
      </XStack>
    </XStack>
  );
}