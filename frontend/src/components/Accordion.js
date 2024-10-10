// components/Accordion.js
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import faqItems from './FAQ';

const CustomAccordion = ({ items }) => {
  return (
    <Accordion allowToggle>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// Menggunakan data FAQ dari FAQ.js
const FAQAccordion = () => {
  return <CustomAccordion items={faqItems} />;
};

export default FAQAccordion;
