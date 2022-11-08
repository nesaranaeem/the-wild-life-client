import React from "react";
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";

const Blog = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="mx-auto max-w-screen-xl my-2 py-2 px-4 lg:px-8 lg:py-4">
      <Fragment>
        <Alert className="my-4">Here is the list of blog</Alert>
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Difference between SQL and NoSQL
          </AccordionHeader>
          <AccordionBody>
            NoSQL: Not Only SQL, or Non-relational. NoSQL database was designed
            for the needs of faster, more scalable and more responsive than
            traditional relational database due to the simpler data structure.
            SQL: Structured Query Language, a language used in programming and
            designed for managing data held in a relational database management
            system (RDBMS), or for stream processing in a relational data stream
            management system (RDSMS).
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            What is JWT, and how does it work?
          </AccordionHeader>
          <AccordionBody>
            JSON Web Token(JWT) is a standard used to create access tokens for
            an application.the server generates a token that certifies the user
            identity, and sends it to the client. The client will send the token
            back to the server for every subsequent request, so the server knows
            the request comes from a particular identity.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            What is the difference between javascript and NodeJS?
          </AccordionHeader>
          <AccordionBody>
            JavaScript is a renowned programming language that is used for
            developing dynamic and interactive web pages. It enables the
            implementation of multifaceted functionalities on web pages. Node.js
            is a precise open-source and cross-platform JavaScript that aids
            real time network app development. It is event-driven and
            non-blocking (asynchronous) I/O for building scalable server side
            JavaScript apps.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            How does NodeJS handle multiple requests at the same time?
          </AccordionHeader>
          <AccordionBody>
            NodeJS receives multiple client requests and places them into
            EventQueue. NodeJS is built with the concept of event-driven
            architecture. NodeJS has its own EventLoop which is an infinite loop
            that receives requests and processes them.
          </AccordionBody>
        </Accordion>
      </Fragment>
    </div>
  );
};

export default Blog;
