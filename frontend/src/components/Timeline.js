// components/Timeline.js
import React from 'react';
import { Box, VStack, HStack, Text, Icon, Divider } from '@chakra-ui/react';
import { MdAccessTime } from 'react-icons/md';

const TimelineItem = ({ date, title, description, icon, isLast }) => {
  return (
    <HStack alignItems="flex-start" spacing={4} mb={isLast ? 0 : 8}>
      {/* Ikon Timeline */}
      <Box>
        <Icon as={icon || MdAccessTime} boxSize={8} color="blue.500" />
        {!isLast && (
          <Divider orientation="vertical" height="50px" borderWidth="1px" borderColor="gray.300" />
        )}
      </Box>

      {/* Konten Timeline */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="blue.600">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {date}
        </Text>
        <Text mt={2} color="gray.700">
          {description}
        </Text>
      </Box>
    </HStack>
  );
};

const Timeline = ({ events }) => {
  return (
    <VStack spacing={0} align="stretch">
      {events.map((event, index) => (
        <TimelineItem
          key={index}
          date={event.date}
          title={event.title}
          description={event.description}
          icon={event.icon}
          isLast={index === events.length - 1}
        />
      ))}
    </VStack>
  );
};

export default Timeline;
