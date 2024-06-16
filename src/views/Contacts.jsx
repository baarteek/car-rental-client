import React from 'react';
import { Card, Col, Row, Typography, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined, GlobalOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Contacts = () => {
  return (
    <div className='mainContainer' style={styles.contactsContainer}>
      <Card className='content-card' style={styles.contactsCard}>
        <Title level={2} style={styles.contactsTitle}>Contact Us</Title>
        <Divider style={styles.contactsDivider} />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card bordered={false} style={styles.infoCard}>
              <MailOutlined style={{ ...styles.contactsIcon, color: '#1890ff' }} />
              <Title level={4}>Email</Title>
              <Paragraph>
                <Text copyable>contact@carrental.com</Text>
              </Paragraph>
              <Paragraph>
                For general inquiries, please email us. We aim to respond within 24 hours.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} style={styles.infoCard}>
              <PhoneOutlined style={{ ...styles.contactsIcon, color: '#52c41a' }} />
              <Title level={4}>Phone</Title>
              <Paragraph>
                <Text copyable>(123) 456-7890</Text>
              </Paragraph>
              <Paragraph>
                Our phone lines are open from 9 AM to 6 PM, Monday to Friday.
              </Paragraph>
            </Card>
          </Col>
        </Row>
        <Divider style={styles.contactsSectionDivider} />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card bordered={false} style={styles.infoCard}>
              <HomeOutlined style={{ ...styles.contactsIcon, color: '#fa8c16' }} />
              <Title level={4}>Address</Title>
              <Paragraph>
                Main Street 12<br />
                Kielce, Poland
              </Paragraph>
              <Paragraph>
                Visit our office for any in-person inquiries.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} style={styles.infoCard}>
              <GlobalOutlined style={{ ...styles.contactsIcon, color: '#eb2f96' }} />
              <Title level={4}>Website</Title>
              <Paragraph>
                <Text copyable>www.company.com</Text>
              </Paragraph>
              <Paragraph>
                Visit our website for more information and online services.
              </Paragraph>
            </Card>
          </Col>
        </Row>
        <Divider style={styles.contactsSectionDivider} />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card bordered={false} style={styles.infoCard}>
              <ClockCircleOutlined style={{ ...styles.contactsIcon, color: '#722ed1' }} />
              <Title level={4}>Office Hours</Title>
              <Paragraph>
                Monday - Friday: 9 AM - 6 PM <br />
                Saturday: 10 AM - 4 PM <br />
                Sunday: Closed
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} style={styles.infoCard}>
              <TeamOutlined style={{ ...styles.contactsIcon, color: '#13c2c2' }} />
              <Title level={4}>Support Team</Title>
              <Paragraph>
                Our support team is here to help you with any issues you may have. We are dedicated to providing the best service possible.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const styles = {
  contactsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%'
  },
  contactsCard: {
    maxWidth: 1000,
    width: '100%',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  contactsTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  contactsDivider: {
    marginBottom: '20px',
  },
  contactsSectionDivider: {
    margin: '40px 0',
  },
  infoCard: {
    textAlign: 'center',
    borderRadius: '8px',
    padding: '20px',
  },
  contactsIcon: {
    fontSize: '36px',
    marginBottom: '10px',
  },
};

export default Contacts;
