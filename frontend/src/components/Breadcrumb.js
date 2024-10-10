// components/Breadcrumb.js
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const CustomBreadcrumb = ({ items }) => {
  return (
    <Breadcrumb separator={<BreadcrumbSeparator color="gray.500">/</BreadcrumbSeparator>} spacing="8px" fontSize="sm">
      {items.map((item, index) => (
        <BreadcrumbItem key={index} isCurrentPage={item.isCurrentPage}>
          <BreadcrumbLink as={RouterLink} to={item.href} color={item.isCurrentPage ? 'blue.600' : 'gray.500'}>
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
