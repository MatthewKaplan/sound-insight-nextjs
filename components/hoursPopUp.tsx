import { FC } from 'react';
import Image from 'next/image';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';

type Props = {
  hoursPopUp: boolean;
  setHoursPopUp: (arg: boolean) => void;
};

const HoursPopUpComponent: FC<Props> = ({ hoursPopUp, setHoursPopUp }) => {
  const closeIcon = (
    <Image src="https://res.cloudinary.com/dgmtf6brh/image/upload/v1643348168/cancel_d6u1cy.png" alt="Close Icon" width={50} height={50} />
  );
  return (
    <Modal open={hoursPopUp} onClose={() => setHoursPopUp(false)} center closeIcon={closeIcon}>
      <div style={{ height: '450px', width: '300px' }}>
        <Table variant="simple" colorScheme="messenger" style={{ marginTop: '20px' }}>
          <Thead>
            <Tr>
              <Th>Day</Th>
              <Th>Hours</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>MON</Td>
              <Td>10am - 6pm</Td>
            </Tr>
            <Tr>
              <Td>TUE</Td>
              <Td>10am - 6pm</Td>
            </Tr>
            <Tr>
              <Td>WED</Td>
              <Td>10am - 6pm</Td>
            </Tr>
            <Tr>
              <Td>THUR</Td>
              <Td>10am - 6pm</Td>
            </Tr>
            <Tr>
              <Td>FRI</Td>
              <Td>10am - 6pm</Td>
            </Tr>
            <Tr>
              <Td>SAT</Td>
              <Td>10am - 6pm</Td>
            </Tr>
            <Tr>
              <Td>SUN</Td>
              <Td>By Appt. Only</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </Modal>
  );
};

export default HoursPopUpComponent;
