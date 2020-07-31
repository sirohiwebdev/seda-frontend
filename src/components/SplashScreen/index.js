import React from 'react';
import { Row, Column, Heading } from '@datapunt/asc-ui';
import styled from 'styled-components';
import Button from 'components/Button';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 3rem 0;
`;

const SplashScreen = () => {
  return (
    <Row>
      <Column span={12}>
        <StyledContainer>
          <Heading forwardedAs="h1" color="primary">
            Municipality of Hague
          </Heading>
          <h3>Manage the actions of your city.</h3>

          <Button variant="secondary" style={{ marginTop: '1rem' }}>
            Explore Now
          </Button>
        </StyledContainer>
      </Column>
    </Row>
  );
};

export default SplashScreen;
