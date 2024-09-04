import { Href, Link } from 'expo-router';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function InternalLink({ href, ...rest }: Props) {
  return (
    <Link
      {...rest}
      style={{
        marginTop: 15,
        paddingVertical: 15,
        ...(rest.style && rest.style as any),
      }}
      href={href as Href<string | object>}
    />
  );
}
