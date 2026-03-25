'use client';
import { useTranslation } from 'react-i18next';
import { XStack, YStack, Text, Image, Anchor } from 'tamagui';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <YStack
      tag="footer"
      backgroundColor="#040914" // Màu nền tối thui chuẩn design
      paddingTop={80}
      paddingBottom={40}
      paddingHorizontal={20}
      $gtSm={{ paddingHorizontal: 40 }}
      $gtLg={{ paddingHorizontal: 80 }}
    >
      <XStack maxWidth={1200} width="100%" marginHorizontal="auto" flexWrap="wrap" gap={40} justifyContent="space-between">
        
        {/* Cột 1: Brand */}
        <YStack flexBasis="100%" $gtMd={{ flexBasis: '30%' as any }} gap={20}>
          <XStack alignItems="center" gap={10}>
            <Image source={{ uri: '/icons/Background.svg', width: 28, height: 28 }} alt="logo" />
            <Text color="white" fontSize={18} fontWeight="700">TutorMatch</Text>
          </XStack>
          
          {/* Thêm maxWidth để ép chữ rớt dòng đúng chuẩn design */}
          <Text color="#94a3b8" lineHeight={24} fontSize={14} maxWidth={280}>
            {t('footer.brand_desc', 'The leading language tutor matching platform for working professionals in Vietnam.')}
          </Text>
          
          <XStack gap={16} marginTop={4}>
            {/* Nếu tên file icon của bạn khác thì nhớ đổi lại chỗ uri nhé */}
            <Image source={{ uri: '/icons/foot1.svg', width: 22, height: 22 }} cursor="pointer" hoverStyle={{ opacity: 0.7 }} />
            <Image source={{ uri: '/icons/foot2.svg', width: 22, height: 22 }} cursor="pointer" hoverStyle={{ opacity: 0.7 }} />
          </XStack>
        </YStack>

        {/* Cột 2, 3, 4: Links */}
        <XStack flex={1} flexWrap="wrap" gap={40} justifyContent="space-between" minWidth={300}>
          <FooterColumn 
            title={t('footer.product', 'Product')} 
            links={[
              { label: t('footer.find_tutor', 'Find a tutor'), href: '#' }, 
              { label: t('footer.pricing', 'Pricing'), href: '#' }, 
              { label: t('footer.enterprise', 'Enterprise'), href: '#' }
            ]} 
          />
          <FooterColumn 
            title={t('footer.community', 'Community')} 
            links={[
              { label: t('footer.become_tutor', 'Become a tutor'), href: '#' }, 
              { label: t('footer.blog', 'Education blog'), href: '#' }, 
              { label: t('footer.events', 'Events'), href: '#' }
            ]} 
          />
          <FooterColumn 
            title={t('footer.support', 'Support')} 
            links={[
              { label: t('footer.help', 'Help center'), href: '#' }, 
              { label: t('footer.privacy_policy', 'Privacy policy'), href: '#' }, 
              { label: t('footer.contact', 'Contact'), href: '#' }
            ]} 
          />
        </XStack>
      </XStack>

      {/* Dòng line phân cách (Tự vẽ bằng XStack cho chắc cốp hiện lên) */}
      <YStack maxWidth={1200} width="100%" marginHorizontal="auto" marginTop={60} marginBottom={24}>
        <XStack height={1} width="100%" backgroundColor="rgba(255, 255, 255, 0.08)" />
      </YStack>

      {/* Bottom Row */}
      <XStack maxWidth={1200} width="100%" marginHorizontal="auto" justifyContent="space-between" flexWrap="wrap" gap={20}>
        <Text color="#64748b" fontSize={13}>© 2024 TutorMatch. All rights reserved.</Text>
        <XStack gap={24}>
          <Anchor href="#" textDecorationLine="none">
            <Text color="#64748b" fontSize={13} hoverStyle={{ color: 'white' }}>{t('footer.terms', 'Terms')}</Text>
          </Anchor>
          <Anchor href="#" textDecorationLine="none">
            <Text color="#64748b" fontSize={13} hoverStyle={{ color: 'white' }}>{t('footer.privacy', 'Privacy')}</Text>
          </Anchor>
        </XStack>
      </XStack>
    </YStack>
  );
}

function FooterColumn({ title, links }: { title: string, links: { label: string, href: string }[] }) {
  return (
    <YStack gap={20} minWidth={120}>
      <Text color="white" fontWeight="700" fontSize={15}>{title}</Text>
      <YStack gap={16}>
        {links.map((link, index) => (
          <Anchor key={index} href={link.href} textDecorationLine="none">
            <Text color="#94a3b8" fontSize={14} hoverStyle={{ color: 'white' }}>{link.label}</Text>
          </Anchor>
        ))}
      </YStack>
    </YStack>
  );
}