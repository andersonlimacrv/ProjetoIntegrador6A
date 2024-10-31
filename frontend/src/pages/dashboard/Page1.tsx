import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tabItems = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "services", label: "Services" },
  { value: "portfolio", label: "Portfolio" },
  { value: "contact", label: "Contact" },
];

const AnimatedTabs = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        setActiveTab(value);
        setActiveIndex(tabItems.findIndex((item) => item.value === value));
      }}
      className="w-full max-w-3xl relative"
    >
      <TabsList className="grid w-full grid-cols-5 relative border-2 dark:border-muted border-muted-foreground/20">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-primary-foreground rounded-md z-10 w-[90%]"
          initial={false}
          animate={{
            width: `${100 / tabItems.length}%`,
            x: `${activeIndex * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
        {tabItems.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="relative z-20 text-primary data-[state=active]:text-accent mx-2"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};
const Page1: React.FC = () => {
  return (
    <div>
      <AnimatedTabs>
        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>Home</CardTitle>
              <CardDescription>Welcome to our website!</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the home page content. You can add any information or
                components here.
              </p>
            </CardContent>
            <CardFooter>
              <p>Home page footer content</p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
              <CardDescription>Learn more about our company</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the about page content. You can add your company's
                history, mission, and values here.
              </p>
            </CardContent>
            <CardFooter>
              <p>About page footer content</p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
              <CardDescription>Explore what we offer</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the services page content. You can list and describe
                your services or products here.
              </p>
            </CardContent>
            <CardFooter>
              <p>Services page footer content</p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>View our work</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the portfolio page content. You can showcase your
                projects or work samples here.
              </p>
            </CardContent>
            <CardFooter>
              <p>Portfolio page footer content</p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with us</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the contact page content. You can add a contact form or
                contact information here.
              </p>
            </CardContent>
            <CardFooter>
              <p>Contact page footer content</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </AnimatedTabs>
    </div>
  );
};

export default Page1;
