import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface OtpEmailProps {
    firstName: string;
    otp: number;
}

export const OtpEmail = ({ firstName, otp }: OtpEmailProps) => (
    <Html>
        <Head />
        <Preview>
            The crypto payments platform that's truly user-friendly.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                {/* <Img
                    src="https://d2nomia9fefkvc.cloudfront.net/assets/vaultx-ve.png"
                    width="200"
                    alt="VaultX"
                    style={logo}
                /> */}
                <br />
                <br />
                <Text style={paragraph}>Hi {firstName},</Text>
                <Text style={paragraph}>
                    Welcome to VaultX, The crypto payments platform that's truly
                    user-friendly.
                    <br />
                    <br />
                    Here is your one time password to verify your email:{" "}
                    <strong>{otp}</strong>
                    <br />
                    <br />
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href="https://vaultx.shivtiwari.com">
                        Go back to VaultX
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The VaultX team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    155 B Block Rajajipuram Lucknow India 226017
                </Text>
            </Container>
        </Body>
    </Html>
);

OtpEmail.PreviewProps = {
    firstName: "Shiv",
    otp: 678987,
} as OtpEmailProps;

export default OtpEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
