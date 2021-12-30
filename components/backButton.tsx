import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Button } from '@chakra-ui/react';

const BackBtnComponent: FC = () => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div style={{ margin: '15px' }}>
      <Link href="/services" passHref>
        {hover ? <Button colorScheme="facebook" style={{ color: 'white', backgroundColor: '#6bc06a' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>BACK TO ALL SERVICES</Button>
          : <Button colorScheme="facebook" style={{ color: 'white', backgroundColor: '#00478E' }} onMouseEnter={() => setHover(true)}>BACK TO ALL SERVICES</Button>}
      </Link>
    </div>
  );
};

export default BackBtnComponent;
