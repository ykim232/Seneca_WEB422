// outputs: <p>About</p>
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

function About() {
    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                    My name is Yuli Kim, but I prefer to called Edes which is my English name.
                    <br />I am a CPA student at Seneca College in Computer Programming and Analysis.
                    <br />I would like to be full-stack development but I would eventually like to work security side.
                    Being a person who has extensive, professional knowledge in programming so that is called a troubleshooter among people is my dream.
                    <br />
                    <br />There is the project I am woking on called 'Alba Place' which is the managemnet system can used by small business.
                    <br />It various functions for example,
                    <br />management empolyees and thier schedul including work history, announcement, management important documents, etc.
                    <br />I have perience of working at the company as intern for 4 mounts in Korea.

                </Card.Text>
                <LinkContainer to='https://github.com/ykim232'>
                    <Button variant="primary" >GitHub</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
}

export default About;