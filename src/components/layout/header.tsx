import ThemeButton from '@/components/theme-button';
import { logOut, retrieveUserSession } from '@/data/Auth.api';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ReactNode } from 'react';
const Links = [
  {
    text: 'Carpool',
    href: '/rides',
  },
  {
    text: 'Offer A Ride',
    href: '/create-ride',
  },
];

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setAuthentication] = React.useState<boolean>(false);
  const router = useRouter();
  const { pathname } = router;
  const toast = useToast();
  React.useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        setAuthentication(true);
      } else {
        setAuthentication(false);
      }
    })();
  }, []);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Text as='a' href='/' fontWeight={'bold'} color={'app.green'}>
                Ride&Share
              </Text>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link.text} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Box ml={2} mr={2}>
              <ThemeButton />
            </Box>
            {isAuthenticated ? (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      src={
                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    {pathname === '/profile' ? (
                      <></>
                    ) : (
                      <>
                        <MenuItem as={'a'} href='/profile'>
                          Profile
                        </MenuItem>
                        <MenuItem as={'a'} href='/profile'>
                          Notifications
                        </MenuItem>
                        <MenuItem as={'a'} href='/profile'>
                          MyRides
                        </MenuItem>
                        <MenuItem as={'a'} href='/profile'>
                          Chats
                        </MenuItem>
                        <MenuDivider />
                      </>
                    )}

                    <MenuItem
                      as={'button'}
                      onClick={() => {
                        logOut((res) => {
                          console.log(res);
                          toast({
                            title: 'Logut',
                            description: 'You Have Successfully LoggedOut',
                            status: 'success',
                            duration: 6000,
                            isClosable: true,
                          });
                          setAuthentication(false);
                        });
                      }}
                    >
                      SignOut
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}
              >
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  href={'/Auth/signin'}
                >
                  Sign In
                </Button>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'app.green'}
                  as='a'
                  href={'/Auth/register'}
                  _hover={{
                    bg: 'teal.400',
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.text} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
