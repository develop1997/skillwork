import { Fonts } from '@/assets/fonts/fonts';
import { APP_VALUES } from '@/assets/styles/GeneralStyles';
import { sizeNormalizer } from '@/assets/styles/normalizator';
import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  style?: any
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: sizeNormalizer * 16,
    lineHeight:  sizeNormalizer * 24,
    fontFamily: Fonts.RobotoRegular,
  },
  defaultSemiBold: {
    fontSize: sizeNormalizer * 16,
    lineHeight:  sizeNormalizer * 24,
    fontWeight: '600',
    fontFamily: Fonts.RobotoBold,
  },
  title: {
    fontSize: sizeNormalizer * 32,
    lineHeight: sizeNormalizer * 32,
    fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
  },
  subtitle: {
    fontSize: sizeNormalizer * 20,
    lineHeight: sizeNormalizer * 24,
    fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
  },
  link: {
    fontSize: sizeNormalizer * 16,
    lineHeight: sizeNormalizer * 24,
		color: APP_VALUES.colors.secondary,
    fontFamily: Fonts.RobotoMedium,
  },
});
