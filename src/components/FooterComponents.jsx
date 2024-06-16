import React from 'react';
import { Layout, Row, Col, Typography, Divider } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import Paragraph from 'antd/es/skeleton/Paragraph';

const { Footer } = Layout;
const { Text, Title, Link } = Typography;

const FooterComponents = () => {
  return (
    <Footer style={styles.footer}>
      <Row justify="center" style={styles.row}>
        <Col xs={24} sm={12} md={6} style={styles.col}>
          <Title level={5} style={styles.title}>Address</Title>
            <Text style={styles.text}>
              Main Street 12 <br />
              Kielce, Poland <br />
            </Text>
            <Text style={styles.text}>
              Visit our office for any in-person inquiries.
            </Text>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.col}>
          <Title level={5} style={styles.title}>Contact Us</Title>
          <Row justify="center">
            <Text style={styles.text}>
                Email: <Link href="mailto:contact@carrental.com" style={styles.link}>contact@carrental.com</Link>
            </Text>
          </Row>
          <Row justify="center">
            <Text style={styles.text}>
                Phone: <Link href="tel:+1234567890" style={styles.link}>(123) 456-7890</Link>
            </Text>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.col}>
          <Title level={5} style={styles.title}>Useful Links</Title>
          <Text style={styles.text}><Link href="/privacy-policy" style={styles.link}>Privacy Policy</Link></Text>
          <Text style={styles.text}><Link href="/terms-of-service" style={styles.link}>Terms of Service</Link></Text>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.col}>
          <Title level={5} style={styles.title}>Follow Us</Title>
          <Row justify="center" gutter={[8, 8]}>
            <Col>
              <Link href="https://www.facebook.com" target="_blank" style={styles.socialLink}>
                <FacebookOutlined style={{ ...styles.socialIcon, color: '#3b5998' }} />
              </Link>
            </Col>
            <Col>
              <Link href="https://www.twitter.com" target="_blank" style={styles.socialLink}>
                <TwitterOutlined style={{ ...styles.socialIcon, color: '#1DA1F2' }} />
              </Link>
            </Col>
            <Col>
              <Link href="https://www.instagram.com" target="_blank" style={styles.socialLink}>
                <InstagramOutlined style={{ ...styles.socialIcon, color: '#E4405F' }} />
              </Link>
            </Col>
            <Col>
              <Link href="https://www.linkedin.com" target="_blank" style={styles.socialLink}>
                <LinkedinOutlined style={{ ...styles.socialIcon, color: '#0077b5' }} />
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={styles.divider} />
      <Text style={styles.footerText}>©2024 Car Rental. All Rights Reserved.</Text>
    </Footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    backgroundColor: '#001529',
    color: '#ffffff',
    padding: '2% 1%',
  },
  row: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  col: {
    marginBottom: '20px',
  },
  title: {
    color: '#ffffff',
  },
  text: {
    color: '#d9d9d9',
  },
  link: {
    color: '#1890ff',
  },
  socialLink: {
    display: 'inline-block',
    margin: '0 8px',
  },
  socialIcon: {
    fontSize: '24px',
  },
  divider: {
    borderColor: '#ffffff',
    margin: '2% 0',
  },
  footerText: {
    color: '#d9d9d9',
  },
};

export default FooterComponents;
