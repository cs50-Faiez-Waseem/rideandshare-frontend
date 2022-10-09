import { Container, ContainerProps } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import Layout from '@/components/layout';

const variants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: -40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -0,
    y: 40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
};

type PageProps = {
  title: string;
  description?: string;
  children: ReactNode;
  
};

const MotionContainer = motion<ContainerProps>(Container);

const PageLayout = ({ title, description, children }: PageProps) => {
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@rideshare',
        }}
        openGraph={{
          url: 'https://www.faiezwaseem.live',
          title: title ,
          description: description,
          locale: 'en_US',
          images: [
            {
              url: 'https://www.faiezwaseem.live/static/images/profile.png',
              width: 1200,
              height: 630,
              alt: 'Faiez Waseem',
              type: 'image/png',
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'https://www.faiezwaseem.live/static/images/profile.png',
          },
        ]}
      />
      <MotionContainer
        display='flex'
        maxW='container.lg'
        minH={{ base: 'auto', md: '100%' }}
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        centerContent
      >
        {children}
      </MotionContainer>
    </Layout>
  );
};

export default PageLayout;
