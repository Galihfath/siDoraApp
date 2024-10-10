// components/Table.js
import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

const CustomTable = ({ columns, data }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.accessor}>{column.Header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column) => (
                <Td key={column.accessor}>{row[column.accessor]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
