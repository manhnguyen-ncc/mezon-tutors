'use client';
import { useTranslation } from 'react-i18next';
import { XStack, YStack, ZStack, Text, Button, Image, Paragraph } from 'tamagui';
import { Play } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <XStack
      tag="section"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      gap={60}
      paddingVertical={120}
      paddingHorizontal={80}
      style={{ background: 'linear-gradient(120deg, #0b1628, #081124)' }}
    >
      <XStack maxWidth={1200} width="100%" justifyContent="space-between" alignItems="center">
        
        {/* LEFT CONTENT */}
        <YStack width="50%" maxWidth={540} gap={20}>
          {/* Badge */}
          <XStack
            backgroundColor="rgba(37, 99, 235, 0.2)"
            paddingVertical={6}
            paddingHorizontal={14}
            borderRadius={20}
            alignSelf="flex-start"
            alignItems="center"
            gap={8}
          >
            <Image source={{ uri: '/icons/flash.svg', width: 14, height: 14 }} alt="flash" />
            <Text color="#3b82f6" fontSize={12} fontWeight="800" letterSpacing={1}>
              {t('hero.badge', 'MATCHING STYLE TINDER')}
            </Text>
          </XStack>

          {/* Title - Chỉnh lại line-height và letter-spacing cho giống design */}
          <YStack>
            <Text fontSize={64} fontWeight="900" lineHeight={76} letterSpacing={-1} color="white">
              {t('hero.title_part1', 'Find your ideal tutor -')}
            </Text>
            <Text fontSize={64} fontWeight="900" lineHeight={76} letterSpacing={-1} color="#2563eb">
              {t('hero.title_part2', 'Just a swipe away')}
            </Text>
          </YStack>

          {/* Description */}
          <Paragraph color="#94a3b8" lineHeight={28} fontSize={16} maxWidth={500}>
            {t('hero.description', 'Connect busy professionals with talented tutors. Learn any language, anytime, anywhere via the integrated Mezon platform.')}
          </Paragraph>

          {/* Buttons Group */}
          <XStack gap={20} marginTop={10}>
            <Button
              backgroundColor="#2563eb"
              borderRadius={30}
              paddingHorizontal={32}
              height={50}
              color="white"
              fontWeight="700"
              borderWidth={0}
              boxShadow="0 10px 25px rgba(37, 99, 235, 0.4)" // Thêm hiệu ứng Glow xanh
              hoverStyle={{ backgroundColor: '#1d4ed8' }}
            >
              {t('hero.start_now', 'Start now')}
            </Button>

            <Button
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="#334155"
              borderRadius={30}
              paddingHorizontal={28}
              height={50}
              hoverStyle={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <XStack alignItems="center" gap={10}>
                <Play size={18} fill="white" color="white" />
                <Text color="white" fontWeight="600">{t('hero.watch_demo', 'Watch demo')}</Text>
              </XStack>
            </Button>
          </XStack>
        </YStack>

        {/* RIGHT CONTENT - CARDS */}
        <YStack width="50%" alignItems="center" position="relative">
          <ZStack width={384} height={512}>
            
            {/* MAIN CARD */}
            <YStack
              width={384}
              height={512}
              borderRadius={24}
              overflow="hidden"
              rotate="1deg"
              boxShadow="0 40px 100px rgba(0, 0, 0, 0.7)"
              position="relative"
            >
              <Image source={{ uri: '/tutor.png', width: 384, height: 512 }} objectFit="cover" />
              
              <YStack
                position="absolute" bottom={0} left={0} right={0} height="60%"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0))' }}
                zIndex={1}
              />

              <YStack position="absolute" bottom={0} left={0} padding={20} width="100%" zIndex={2} gap={6}>
                
                {/* FIX CHÍNH: Đổi space-between thành flex-start, thêm gap={12} */}
                <XStack justifyContent="flex-start" alignItems="center" gap={12} marginBottom={4}>
                  <XStack backgroundColor="#2563eb" paddingHorizontal={10} paddingVertical={4} borderRadius={999}>
                    <Text color="white" fontSize={11} fontWeight="800">95% MATCH</Text>
                  </XStack>
                  <XStack alignItems="center" gap={4}>
                    <Image source={{ uri: '/icons/star.svg', width: 14, height: 14 }} />
                    <Text color="#facc15" fontSize={14} fontWeight="700">4.9</Text>
                  </XStack>
                </XStack>

                <Text color="white" fontSize={22} fontWeight="700">
                  {t('hero.tutor_name', 'Nguyhn Minh Anh, 24')}
                </Text>
                <Text color="#cbd5f5" fontSize={13}>
                  {/* Thêm ngoặc kép chuẩn design */}
                  "{t('hero.tutor_desc', 'IELTS 8.0 • Dedicated to busy learners')}"
                </Text>

                <XStack gap={10} marginTop={16}>
                  <Button flex={1} backgroundColor="rgba(255, 255, 255, 0.15)" borderRadius={20} height={40} borderWidth={0}>
                    <Text color="white" fontWeight="600">{t('hero.profile', 'Profile')}</Text>
                  </Button>
                  <Button flex={1} backgroundColor="#2563eb" borderRadius={20} height={40} borderWidth={0}>
                    <Text color="white" fontWeight="600">{t('hero.connect', 'Connect')}</Text>
                  </Button>
                </XStack>
              </YStack>
            </YStack>

            {/* SMALL OVERLAY CARD - Điều chỉnh lại tọa độ */}
            <YStack
              position="absolute"
              bottom={-15} // Nhích lên 1 chút cho đỡ bị tụt
              right={-115} // Kéo vào trong 1 chút
              width={192}
              height={108}
              borderRadius={16}
              overflow="hidden"
              rotate="-2deg" // Card nhỏ trong design hơi nghiêng ngược lại
              boxShadow="0 15px 35px rgba(0, 0, 0, 0.6)"
              zIndex={3}
              backgroundColor="black"
            >
              <Image source={{ uri: '/cardbe.svg', width: 192, height: 108 }} objectFit="cover" />
              <YStack
                position="absolute" top="50%" left="50%" x="-50%" y="-50%"
                backgroundColor="rgba(255,255,255,0.25)" width={40} height={40}
                borderRadius={20} alignItems="center" justifyContent="center"
                style={{ backdropFilter: 'blur(4px)' }}
              >
                <Image source={{ uri: '/icons/play.svg', width: 22, height: 22 }} />
              </YStack>
            </YStack>

          </ZStack>
        </YStack>
      </XStack>
    </XStack>
  );
}