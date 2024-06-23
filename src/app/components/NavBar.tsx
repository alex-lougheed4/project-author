"use client";

import NextLink from "next/link";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Link,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { PenIcon } from "../assets/PenIcon";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useForm } from "react-hook-form";
import { Prompt } from "../utils/types";
import { useRouter } from "next/navigation";
import { useUser } from "reactfire";
import { getAuth, signOut } from "firebase/auth";
import { usePrompts } from "../firebase/usePrompts";

type Inputs = {
  email: string;
  password: string;
};

export default function Navbar() {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: user } = useUser();
  const { CreatePrompt } = usePrompts();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onCreateSubmit = async (values: any) => {
    const prompt: Prompt = {
      title: values.title,
      summary: values.summary,
      userCreatorId: user?.uid,
      createdAt: new Date(),
      deadline: values.deadline,
      length: values.length,
      kudos: 0,
    };
    console.log(`createPrompt: ${JSON.stringify(prompt)}`);
    CreatePrompt(prompt);
  };

  const onLogout = async () => {
    console.log("logout");
    await signOut(getAuth());
    //toast({
    //  title: "Logged out",
    //  description: "You have been logged out.",
    //});
    router.replace("/");
  };
  console.log(`userId: ${user?.uid}`);
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <PenIcon />
          <Link
            as={NextLink}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            href={"/"}
            style={{ textDecoration: "none" }}
          >
            PromptR
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"darkBlue"}
            _hover={{
              bg: "lightBlue",
            }}
            onClick={onCreateOpen}
          >
            Create A Prompt
          </Button>
        </Flex>
        {/* Replace with Account stuff when logged in */}

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {user?.uid ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.displayName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => router.push("/profile/prompts")}>
                    Your Prompts
                  </MenuItem>
                  <MenuItem>Your Stories</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={() => onLogout()}>Logout</MenuItem>
                </MenuList>
              </Menu>

              <Collapse in={isOpen} animateOpacity>
                <MobileNav />
              </Collapse>
            </>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                onClick={onLoginOpen}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"darkBlue"}
                onClick={onRegisterOpen}
                _hover={{
                  bg: "lightBlue",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Modal onClose={onLoginClose} isOpen={isLoginOpen && !user} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Login
            <LoginForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onLoginClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal onClose={onRegisterClose} isOpen={isRegisterOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onRegisterClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal onClose={onCreateClose} isOpen={isCreateOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onCreateSubmit)}>
            <ModalHeader>Create Prompt</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormHelperText>Name your Prompt!</FormHelperText>
                <FormLabel>Title</FormLabel>
                <Input id="title" {...register("title")} />
                <FormHelperText>Write Your Prompt!</FormHelperText>
                <FormLabel>Summary</FormLabel>
                <Input id="summary" {...register("summary")} />
                <FormLabel>Story Length</FormLabel>
                <Select
                  placeholder="Select length"
                  id="length"
                  {...register("length")}
                >
                  <option value="SHORT">Short</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LONG">Long</option>
                </Select>
                <FormLabel>Deadline</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  id="deadline"
                  {...register("deadline")}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Submit</Button>
              <Button onClick={onCreateClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Explore",
    children: [
      {
        label: "Trending",
        subLabel: "Trending Prompts",
        href: "/explore/trending",
      },
      {
        label: "Most Storied",
        subLabel: "Most used prompts",
        href: "/explore/most-storied",
      },
      {
        label: "Latest",
        subLabel: "Latest Prompts",
        href: "/explore/latest",
      },
    ],
  },
  {
    label: "How to Play",
    href: "/about",
  },
];
